


let remote = document.getElementById('remote')
let status = document.getElementById('status')
let sections = document.getElementsByClassName('section')
let labels = document.querySelectorAll('.label')
let ip_input = document.getElementById('ip-input')
let key_input = document.getElementById('key-input')
let keystroke = document.getElementById('keystroke')
let full = true
let default_sections = {'input-power': true, 'media-controls': false, 'color-buttons': false, 'nav-wheel': true, 'home-options': false, 'info': false, 'numpad': false, 'volume-channel': true, 'keyboard-input': true}

init()

function init() {
    if (!localStorage.getItem('sections')) {
        display_status('&#8592 Enter TV info', 30)
        localStorage.setItem('sections', JSON.stringify(default_sections))
        localStorage.setItem('IP','135.23.185.7');
        localStorage.setItem('key', '')
    } else {
        console.log('I see you have been here before')
    }
    keystroke.value = '' // should probably be clear remote
}

ip_input.addEventListener('change', function(e){
    localStorage.setItem('IP', e.target.value)
    display_status('IP updated')
    console.log('set IP in local storage to ', localStorage.getItem('IP'))
})

key_input.addEventListener('change', function(e){
    localStorage.setItem('key', e.target.value)
    display_status('Key updated')
    console.log('set key', localStorage.getItem('key'))
})

remote.addEventListener('click', function(e) {
    command = e.target.id
    if (command in code_list) {
        sendCommand(command)
    } else if (command == 'full-compact') {
        toggle_full()
    } else if (command == 'settings') {
        toggle_settings()
    } else if (e.target.type == 'checkbox') {
        default_sections[e.target.id.slice(0, -6)] = !default_sections[e.target.id.slice(0, -6)]
        localStorage.setItem('sections', JSON.stringify(default_sections))
    }

})

function display_status(message, seconds=1) {
    status.innerHTML = message
    status.classList.remove('hide')
    setTimeout(() => {status.classList.add('hide')}, seconds*1000)
}

function toggle_settings() {
    if (full == false) {
        toggle_full()
    }
    settings_menu = document.getElementById('settings_menu')
    display_status('')
    if (settings_menu.classList.contains('hidden')) {
        settings_menu.classList.remove('hidden')
        labels.forEach(l => l.classList.remove('hidden'));
        ip_input.value = localStorage.getItem('IP')
        key_input.value = localStorage.getItem('key')
        let sections = JSON.parse(localStorage.getItem('sections'))
        for (const [key, value] of Object.entries(sections)) {
            document.getElementById(key + '-check').checked = value
        }
    } else {
        settings_menu.classList.add('hidden')
        labels.forEach(l => l.classList.add('hidden'))
    }
}

function toggle_full() {
    compact_sections = JSON.parse(localStorage.getItem('sections'))
    if (!document.getElementById('settings_menu').classList.contains('hidden')) {
        toggle_settings()
    }
    if (full == true) {
        display_status('Compact View')
        for (const [key, value] of Object.entries(compact_sections)) {
            if (value == false) {
                document.getElementById(key).classList.add('hidden')
                console.log('hid ', key)
            } else {
                document.getElementById(key).classList.remove('hidden')
            }
          }
        full = false
    } else {
        display_status('Full View')
        for (const [key, value] of Object.entries(compact_sections)) {
            document.getElementById(key).classList.remove('hidden')
        }
        full = true
        }
}

function sendCommand(command) {
    const req = new XMLHttpRequest()
    tv_ip = localStorage.getItem('IP')
    const tv_url = `http://${tv_ip}/sony/IRCC`
    const preshared_key = localStorage.getItem('key')
    const code = code_list[command]
    req.open('POST', tv_url, true);
    req.setRequestHeader('Content-Type', 'text/xml; charset=UTF-8');
    req.setRequestHeader('SOAPAction', '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"');
    req.setRequestHeader('X-Auth-PSK', preshared_key);
    const data =
      `<?xml version="1.0"?>
      <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <s:Body>
          <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
            <IRCCCode>${code}</IRCCCode>
          </u:X_SendIRCC>
        </s:Body>
      </s:Envelope>`;
    req.timeout = 3000; 
    req.send(data);
    display_status(`Sent:<br> ${command}`)}

code_list = {
    "PowerOff" : "AAAAAQAAAAEAAAAvAw==",
    "Input" : "AAAAAQAAAAEAAAAlAw==",
    "GGuide" : "AAAAAQAAAAEAAAAOAw==",
    "EPG" : "AAAAAgAAAKQAAABbAw==",
    "Favorites" : "AAAAAgAAAHcAAAB2Aw==",
    "Display" : "AAAAAQAAAAEAAAA6Aw==",
    "Home" : "AAAAAQAAAAEAAABgAw==",
    "Options" : "AAAAAgAAAJcAAAA2Aw==",
    "Return" : "AAAAAgAAAJcAAAAjAw==",
    "Up" : "AAAAAQAAAAEAAAB0Aw==",
    "Down" : "AAAAAQAAAAEAAAB1Aw==",
    "Right" : "AAAAAQAAAAEAAAAzAw==",
    "Left" : "AAAAAQAAAAEAAAA0Aw==",
    "Confirm" : "AAAAAQAAAAEAAABlAw==",
    "Red" : "AAAAAgAAAJcAAAAlAw==",
    "Green" : "AAAAAgAAAJcAAAAmAw==",
    "Yellow" : "AAAAAgAAAJcAAAAnAw==",
    "Blue" : "AAAAAgAAAJcAAAAkAw==",
    "Num1" : "AAAAAQAAAAEAAAAAAw==",
    "Num2" : "AAAAAQAAAAEAAAABAw==",
    "Num3" : "AAAAAQAAAAEAAAACAw==",
    "Num4" : "AAAAAQAAAAEAAAADAw==",
    "Num5" : "AAAAAQAAAAEAAAAEAw==",
    "Num6" : "AAAAAQAAAAEAAAAFAw==",
    "Num7" : "AAAAAQAAAAEAAAAGAw==",
    "Num8" : "AAAAAQAAAAEAAAAHAw==",
    "Num9" : "AAAAAQAAAAEAAAAIAw==",
    "Num0" : "AAAAAQAAAAEAAAAJAw==",
    "Num11" : "AAAAAQAAAAEAAAAKAw==",
    "Num12" : "AAAAAQAAAAEAAAALAw==",
    "VolumeUp" : "AAAAAQAAAAEAAAASAw==",
    "VolumeDown" : "AAAAAQAAAAEAAAATAw==",
    "Mute" : "AAAAAQAAAAEAAAAUAw==",
    "ChannelUp" : "AAAAAQAAAAEAAAAQAw==",
    "ChannelDown" : "AAAAAQAAAAEAAAARAw==",
    "SubTitle" : "AAAAAgAAAJcAAAAoAw==",
    "ClosedCaption" : "AAAAAgAAAKQAAAAQAw==",
    "Enter" : "AAAAAQAAAAEAAAALAw==",
    "DOT" : "AAAAAgAAAJcAAAAdAw==",
    "Analog" : "AAAAAgAAAHcAAAANAw==",
    "Teletext" : "AAAAAQAAAAEAAAA/Aw==",
    "Exit" : "AAAAAQAAAAEAAABjAw==",
    "Analog2" : "AAAAAQAAAAEAAAA4Aw==",
    "*AD" : "AAAAAgAAABoAAAA7Aw==",
    "Digital" : "AAAAAgAAAJcAAAAyAw==",
    "Analog?" : "AAAAAgAAAJcAAAAuAw==",
    "BS" : "AAAAAgAAAJcAAAAsAw==",
    "CS" : "AAAAAgAAAJcAAAArAw==",
    "BSCS" : "AAAAAgAAAJcAAAAQAw==",
    "Ddata" : "AAAAAgAAAJcAAAAVAw==",
    "PicOff" : "AAAAAQAAAAEAAAA+Aw==",
    "Tv_Radio" : "AAAAAgAAABoAAABXAw==",
    "Theater" : "AAAAAgAAAHcAAABgAw==",
    "SEN" : "AAAAAgAAABoAAAB9Aw==",
    "InternetWidgets" : "AAAAAgAAABoAAAB6Aw==",
    "InternetVideo" : "AAAAAgAAABoAAAB5Aw==",
    "Netflix" : "AAAAAgAAABoAAAB8Aw==",
    "SceneSelect" : "AAAAAgAAABoAAAB4Aw==",
    "Mode3D" : "AAAAAgAAAHcAAABNAw==",
    "iManual" : "AAAAAgAAABoAAAB7Aw==",
    "Audio" : "AAAAAQAAAAEAAAAXAw==",
    "Wide" : "AAAAAgAAAKQAAAA9Aw==",
    "Jump" : "AAAAAQAAAAEAAAA7Aw==",
    "PAP" : "AAAAAgAAAKQAAAB3Aw==",
    "MyEPG" : "AAAAAgAAAHcAAABrAw==",
    "ProgramDescription" : "AAAAAgAAAJcAAAAWAw==",
    "WriteChapter" : "AAAAAgAAAHcAAABsAw==",
    "TrackID" : "AAAAAgAAABoAAAB+Aw==",
    "TenKey" : "AAAAAgAAAJcAAAAMAw==",
    "AppliCast" : "AAAAAgAAABoAAABvAw==",
    "acTVila" : "AAAAAgAAABoAAAByAw==",
    "DeleteVideo" : "AAAAAgAAAHcAAAAfAw==",
    "PhotoFrame" : "AAAAAgAAABoAAABVAw==",
    "TvPause" : "AAAAAgAAABoAAABnAw==",
    "KeyPad" : "AAAAAgAAABoAAAB1Aw==",
    "Media" : "AAAAAgAAAJcAAAA4Aw==",
    "SyncMenu" : "AAAAAgAAABoAAABYAw==",
    "Forward" : "AAAAAgAAAJcAAAAcAw==",
    "Play" : "AAAAAgAAAJcAAAAaAw==",
    "Rewind" : "AAAAAgAAAJcAAAAbAw==",
    "Prev" : "AAAAAgAAAJcAAAA8Aw==",
    "Stop" : "AAAAAgAAAJcAAAAYAw==",
    "Next" : "AAAAAgAAAJcAAAA9Aw==",
    "Rec" : "AAAAAgAAAJcAAAAgAw==",
    "Pause" : "AAAAAgAAAJcAAAAZAw==",
    "Eject" : "AAAAAgAAAJcAAABIAw==",
    "FlashPlus" : "AAAAAgAAAJcAAAB4Aw==",
    "FlashMinus" : "AAAAAgAAAJcAAAB5Aw==",
    "TopMenu" : "AAAAAgAAABoAAABgAw==",
    "PopUpMenu" : "AAAAAgAAABoAAABhAw==",
    "RakurakuStart" : "AAAAAgAAAHcAAABqAw==",
    "OneTouchTimeRec" : "AAAAAgAAABoAAABkAw==",
    "OneTouchView" : "AAAAAgAAABoAAABlAw==",
    "OneTouchRec" : "AAAAAgAAABoAAABiAw==",
    "OneTouchStop" : "AAAAAgAAABoAAABjAw==",
    "DUX" : "AAAAAgAAABoAAABzAw==",
    "FootballMode" : "AAAAAgAAABoAAAB2Aw==",
    "Social" : "AAAAAgAAABoAAAB0Aw=="
    }