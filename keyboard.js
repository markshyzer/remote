// var XMLHttpRequest = require('xhr2'); // just for running XMLHttpRequest in node (as opposed to browser)
import fetch from 'node-fetch'; // just for node

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
    }

    find(x) {
        console.log('searching for ', x)
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
                console.log(x, 'is at', index, found)
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

    get_moves(delta){
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
        return moves
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

    
// function delay(t, v) {  // https://stackoverflow.com/questions/39538473/using-settimeout-on-promise-chain
//     return new Promise(function(resolve) { 
//         setTimeout(resolve.bind(null, v), t)
//     });
//  }


let dest = 'v'
console.log('dest is', dest)

// console.log(n.position)
// console.log(n.find('+'))
let delta = n.delta(n.position, n.find(dest))
console.log('To get to', dest, 'from', n.layout[1][0], ':', delta)
// moves = n.get_moves(delta)
const moves = ['Down','Down','Down','Down','Down','Right','Right','Right','Right','Right','Up','Up','Up','Up','Up','Left','Left','Left','Left','Left']
const knight_moves = ['Down','Down','Right','Right']
console.log(moves)


function delay(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }


function execute_moves(moves){
    return new Promise((resolve, reject) => {
        moves.forEach(function(move, i){
            // console.log(move)
            setTimeout(sendCommand, 200 * i, move);
            if (i + 1 === moves.length) {
                setTimeout(sendCommand, 200 * (i+1), 'Confirm'); 

            }            
        });
        setTimeout(resolve, 200 * moves.length) 
 
    })
}

function promise_moves(moves){
    return new Promise((resolve, reject) => {
        moves.forEach(function(move, i){
            // console.log(move)
            sendCommand(move)
            if (i + 1 === moves.length) {
                sendCommand('Enter')
                resolve('Done')
            }            
        });
    })
}

// execute_moves(moves).then(execute_moves(knight_moves))
// promise_moves(moves)

const starterPromise = Promise.resolve(null);
// const log = result => console.log(result);

let final_method = async (moves) => {
await moves.reduce(
    (p, move, i) => p.then(() => fetchCommand(move)),
    starterPromise
);
}
await final_method(moves)
final_method(moves)

let async_promise_moves = async (moves) => {
Promise.allSettled(
    moves.map(async (move) => {
        console.log('sending', move);
        fetchCommand(move).then(xx => console.log(move, xx))
                
    })
  )
}

// async_promise_moves(moves).then(fetchCommand('Enter')).then(xx => console.log('Enter --', xx))
// console.log('X')
// fetchCommand('Input').then(xyx => console.log(xyx))

function sleeper(ms) {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }

// await arr.reduce(async (memo, i) => {  // https://advancedweb.hu/how-to-use-async-functions-with-array-foreach-in-javascript/
// 	await memo;
// 	await sleep(10 - i);
// 	console.log(i);
// }, undefined);

// clearTimeout(t)
// clearTimeout(v)

// moves.forEach(function(move, i){
//     sendCommand(move).then(delay(1000))
// })




 
// execute.then(sendCommand('Enter')); 

// moves.forEach(function(move, i){
//     console.log(move)
//     setTimeout(function () {
//         sendCommand(move)
//      }, 200 * i);
// sendCommand('Enter')
    
    
// })

// console.log(n.moves(delta))

// console.log(n.moves(n.delta(n.find('5'), n.find('del'))))


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

async function fetchCommand(command) {
    await wait(300)
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
            method: 'POST', // Default is 'get'
            // body: JSON.stringify(data),
            body: data,
            // mode: 'cors',
            headers: {
                'Content-Type': 'text/xml; charset=UTF-8',
                'SOAPAction': '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
                'X-Auth-PSK': preshared_key,
                'Connection': 'keep-alive',
            }
          })
          
        // .then(value => wait(3000, value))
        //   .then(x => new Promise(resolve => setTimeout(() => resolve, 10000, x)))
        //   .then(x => sleeper(1000), x)
        //   .then(response => setTimeout(response, 1000))
        .then(response => resolve(response.status))
    })
}

