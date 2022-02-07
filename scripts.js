let remote = document.getElementById('remote')
let statusBox = document.getElementById('status-box')
let sections = document.getElementsByClassName('section')
let labels = document.querySelectorAll('.label')
let ipInput = document.getElementById('ip-input')
let keyInput = document.getElementById('key-input')
let stringInput = document.getElementById('string-input')
let clear = document.getElementById('clear')
let currentValue = document.getElementById('current-value')
let full = true
let defaultSections = {'input-power': true, 'media-controls': false, 'color-buttons': false, 'nav-wheel': true, 'home-options': false, 'info': false, 'numpad': false, 'volume-channel': true, 'keyboard-input': true}
const starterPromise = Promise.resolve(null); // https://jrsinclair.com/articles/2019/how-to-run-async-js-in-parallel-or-sequential/

init()

stringInput.addEventListener('input', handleTextInput)

clear.addEventListener('click', function (){
    console.log('clear function activated')
    clearTVInput()
    clearRemoteInput()
})

ipInput.addEventListener('change', function(e){
    localStorage.setItem('IP', e.target.value)
    displayStatus('IP updated')
    console.log('set IP in local storage to ', localStorage.getItem('IP'))
})

keyInput.addEventListener('change', function(e){
    localStorage.setItem('key', e.target.value)
    displayStatus('Key updated')
    console.log('set key', localStorage.getItem('key'))
})

remote.addEventListener('click', function(e) {
    command = e.target.id
    if (command in code_list) {
        sendCommand(command)
    } else if (command == 'full-compact') {
        toggleFull()
    } else if (command == 'settings') {
        toggleSettings()
    } else if (e.target.type == 'checkbox') {
        defaultSections[e.target.id.slice(0, -6)] = !defaultSections[e.target.id.slice(0, -6)]
        localStorage.setItem('sections', JSON.stringify(defaultSections))
    }

})

function clearRemoteInput(){
    keyboard.string = ''
    stringInput.value = ''
}

async function clearTVInput(){
    const l = keyboard.string.length
    await sendMoves(keyboard.getMoves('del'))
    keyboard.position = keyboard.find('del')
    for (let i = 0; i < l; i++){
        await sendCommand('Confirm', delay=600, display=false)
    }
}

function displayStatus(message, seconds=1) {
    statusBox.innerHTML = message
    statusBox.classList.remove('hide')
    setTimeout(() => {statusBox.classList.add('hide')}, seconds*1000)
}

function handleTextInput(e){ 
    if (e.data){
        stringInput.removeEventListener('input', handleTextInput)
        processText()
    }
}

function init() {
    if (!localStorage.getItem('sections')) {
        displayStatus('&#8592 Enter TV info', 30)
        localStorage.setItem('sections', JSON.stringify(defaultSections))
        localStorage.setItem('IP','135.23.185.7');
        localStorage.setItem('key', '')
    } else {
        console.log('Welcome back')
    }
    stringInput.value = ''
    currentValue.textContent=keyboard.keyValue(keyboard.position)
}

async function processText(){
    current_character = stringInput.value[keyboard.string.length]
    await sendMoves(keyboard.getMoves(current_character))
    keyboard.position = keyboard.find(current_character)
    keyboard.string = keyboard.string + current_character
    currentValue.textContent=keyboard.keyValue(keyboard.position)
    if (stringInput.value.length > keyboard.string.length){
        console.log('comparison true')
        processText()
    } else {
        stringInput.addEventListener('input', handleTextInput)
    }
}
    
let sendMoves = async (moves) => {
await moves.reduce(
    (p, move, i) => p.then(() => sendCommand(move, delay=350, display=false)),
    starterPromise
    );
}

function toggleSettings() {
    if (full == false) {
        toggleFull()
    }
    settings_menu = document.getElementById('settings_menu')
    displayStatus('')
    if (settings_menu.classList.contains('hidden')) {
        settings_menu.classList.remove('hidden')
        labels.forEach(l => l.classList.remove('hidden'));
        ipInput.value = localStorage.getItem('IP')
        keyInput.value = localStorage.getItem('key')
        let sections = JSON.parse(localStorage.getItem('sections'))
        for (const [key, value] of Object.entries(sections)) {
            document.getElementById(key + '-check').checked = value
        }
    } else {
        settings_menu.classList.add('hidden')
        labels.forEach(l => l.classList.add('hidden'))
    }
}

function toggleFull() {
    compact_sections = JSON.parse(localStorage.getItem('sections'))
    if (!document.getElementById('settings_menu').classList.contains('hidden')) {
        toggleSettings()
    }
    if (full == true) {
        displayStatus('Compact View')
        for (const [key, value] of Object.entries(compact_sections)) {
            if (value == false) {
                document.getElementById(key).classList.add('hidden')
            } else {
                document.getElementById(key).classList.remove('hidden')
            }
          }
        full = false
    } else {
        displayStatus('Full View')
        for (const [key, value] of Object.entries(compact_sections)) {
            document.getElementById(key).classList.remove('hidden')
        }
        full = true
        }
}

async function sendCommand(command, delay=0, display=true) {
    await wait(delay)
    new Promise ((resolve) => {
        const tv_ip = localStorage.getItem('IP')
        const tv_url = `http://${tv_ip}/sony/IRCC`
        const preshared_key = localStorage.getItem('key')
        const code = code_list[command]
        const data =
        `<?xml version="1.0"?>
        <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <s:Body>
            <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
              <IRCCCode>${code}</IRCCCode>
            </u:X_SendIRCC>
          </s:Body>
        </s:Envelope>`;
        fetch(tv_url, {
            method: 'POST', 
            body: data,
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/xml; charset=UTF-8',
                'SOAPAction': '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
                'X-Auth-PSK': preshared_key,
            }
        })
        .then(response => resolve(response.status))
        if (display == true){
            displayStatus(`Sent:<br> ${command}`)
        }
    })
}

function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
}
