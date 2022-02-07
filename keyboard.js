// var XMLHttpRequest = require('xhr2'); // just for running XMLHttpRequest in node (as opposed to browser)
// import fetch from 'node-fetch'; // just for node

// let keystroke = document.getElementById('keystroke')
let clear = document.getElementById('clear')
let current_value = document.getElementById('current-value')


clear.addEventListener('click', handleClear)
keystroke.addEventListener('input', keypress)

function handleClear(){
    console.log('clear function activated')
    clearTVInput()
    clearRemoteInput()
}

function clearRemoteInput(){
    n.string = ''
    keystroke.value = ''
}

async function clearTVInput(){
    // console.log('clearing TV input', n.string)
    const t = n.string.length
    await final_method(n.get_moves('del'))
    n.position = n.find('del')
    // console.log(n.string, n.string.length)
    for (let i = 1; i < t; i++){
        // console.log('final_method loop activated')
        await fetchCommand('Confirm', delay=500)
    }

    // console.log('position of delete', n.position)
    // await final_method(n.get_moves('a'))
}

async function keypress(e){
    if (e.data){
        keystroke.removeEventListener('input', keypress)
        console.log('convert keystroke called when', e.data, 'pressed, value is', e.target.value)
        
        convert_keystrokes()
    }

    
}

async function convert_keystrokes(){
    console.log('string in memory', n.string)
    console.log('input string', keystroke.value)
    current_character = keystroke.value[n.string.length]
    console.log('current character', current_character)

    await final_method(n.get_moves(current_character))
    n.position = n.find(current_character)
    n.string = n.string + current_character
    current_value.textContent=n.key_value(n.position)

    // console.log(keystroke.value)
    // console.log('target value now is', e.target.value)
    // console.log(e.target.value.length, n.string.length)
    if (keystroke.value.length > n.string.length){
        console.log('comparison true')
        convert_keystrokes()
    } else {
        keystroke.addEventListener('input', keypress)
    }


    /// compare keystroke.value Keyboard.string (which needs to be created) and find the next different chatacter
    /// call convert_keystroke on that character
    /// turn the event listener back on before exiting the function
    }
    

const code_list = {
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

// var xhr = new XMLHttpRequest();
// redundant above

// current position
// get input
// find the input on the keyboard
// move to new position
// send enter

let [UP, DOWN, LEFT, RIGHT] = ['Up', 'Down', 'Left', 'Right']
console.log('Hello World')

class Keyboard {
    constructor(layout, start_key){
        this.layout = layout
        this.start_key = start_key
        this.position = this.find(start_key)
        this.string = ''
    }

    find(x) {
        // console.log('searching for ', x)
        let position = []
        this.layout.forEach(function (line, index){
            // console.log(line)
            let found = line.findIndex((function (element) {
                return element === x;
            }))
            // console.log(found)
            if (found >= 0){
                // this.position = [index, found]
                position = [index, found]
                // console.log(x, 'is at', index, found)
                return position
            } else {
                return 'character not found in keyboard'
            }
        });
        return position
    }

    delta(start, end){
        return [start[0]-end[0], start[1]-end[1]]
    }

    path(delta){
        let moves = []
        if (delta[0] < 0){
            for (let i = 0; i < Math.abs(delta[0]); i++){
            moves.push(DOWN)
            }
        } else if (delta[0] > 0){
            for (let i = 0; i < delta[0]; i++){
            moves.push(UP)
            }
        }
        if (delta[1] < 0){
            for (let i = 0; i < Math.abs(delta[1]); i++){
            moves.push(RIGHT)
            }
        } else if (delta[1] > 0){
            for (let i = 0; i < delta[1]; i++){
            moves.push(LEFT)
            }
        }
        console.log(moves)
        return moves
    }

    key_value(position){
        return this.layout[position[0]][position[1]]
    }

    get_moves(character){
        const p = this.position
        const f = this.find(character)
        const d = this.delta(p, f)
        const m = this.path(d)
        console.log('the character is ', character, 'the moves are', m)
        if (character === ' ' || character === 'del') {
            console.log('REVERSED THE MOVES')
            m.reverse()
        }
        m.push('Confirm')
        console.log('get_moves returning', m)
        return m
    }

    word(string){
        for (let l of string){
            this.get_moves(l)
        }
    }

}



let n = new Keyboard( [
    [' ', ' ', ' ', 'del', 'del', 'del'],
    ['a', 'b', 'c', 'd', 'e', 'f'],
    ['g', 'h', 'i', 'j', 'k', 'l'],
    ['m', 'n', 'o', 'p', 'q', 'r'],
    ['s', 't', 'u', 'v', 'w', 'x'],
    ['y', 'z', '1', '2', '3', '4'],
    ['5', '6', '7', '8', '9', '0'],
], 'a')

current_value.textContent=n.key_value(n.position)


// console.log(n.get_moves('b'))
// let dest = 'v'
// console.log('dest is', dest)
// let delta = n.delta(n.position, n.find(dest))
// console.log('To get to', dest, 'from', n.layout[1][0], ':', delta)
// moves = n.get_moves(delta)
const moves = ['Down','Down','Down','Down','Down','Right','Right','Right','Right','Right','Up','Up','Up','Up','Up','Left','Left','Left','Left','Left']
const knight_moves = ['Down','Down','Right','Right']
// console.log(moves)

const starterPromise = Promise.resolve(null); // https://jrsinclair.com/articles/2019/how-to-run-async-js-in-parallel-or-sequential/
// const log = result => console.log(result);
let final_method = async (moves) => {
await moves.reduce(
    (p, move, i) => p.then(() => fetchCommand(move)),
    starterPromise
);
}
// for (let i = 0; i < 2; i++) {
//     await final_method(moves)
//     console.log('press enter')
//   } 

function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
}

//// redundant below

function sendCommand(command) {
    return new Promise ((resolve) => {
    const req = new XMLHttpRequest()
    const tv_ip = '192.168.100.100' //localStorage.getItem('IP')
    const tv_url = `http://${tv_ip}/sony/IRCC`
    const preshared_key = '1qqa'
    const code = code_list[command]
    req.open('POST', tv_url, true)
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
    console.log(req.send(data));
    // console.log(req.send(data))
    console.log('sent', command, code)
    resolve('Done')
    })
    
    // display_status(`Sent:<br> ${command}`)}
}

async function fetchCommand(command, delay=350) {
    await wait(delay)
    new Promise ((resolve) => {
        const tv_ip = '192.168.100.100' //localStorage.getItem('IP')
        const tv_url = `http://${tv_ip}/sony/IRCC`
        const preshared_key = '1qqa'
        const code = code_list[command]
        let resp = null
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
    })
}

