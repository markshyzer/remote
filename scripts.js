let remote = document.getElementById('remote')
let sections = document.getElementsByClassName('section')
let labels = document.querySelectorAll('.label')
let ip_input = document.getElementById('ip-input')
let key_input = document.getElementById('key-input')
let full = true
const compact_sections = {'input-power': true, 'media-controls': false, 'color-buttons': false, 'nav-wheel': true, 'home-discover-options': false, 'info': false, 'numpad': false, 'volume-channel': true}

console.log(labels)
init()

function init() {
    if (!localStorage.getItem('sections')) {
        console.log('New User')
        localStorage.setItem('sections', compact_sections)
        localStorage.setItem('IP','135.23.185.3');
    } else {
        console.log('I see you have been here before')
    }
}

ip_input.addEventListener('change', function(e){
    localStorage.setItem('IP', e.target.value)
    console.log('set IP in local storage to ', localStorage.getItem('IP'))
})

remote.addEventListener('click', function(e) {
    console.log("Clickety!", e.target.id)
    command = e.target.id
    if (command in code_list) {
        sendCommand(command)
    } else if (command == 'full-compact') {
        toggle_full()
    } else if (command == 'settings') {
        toggle_settings()
    }

})

function toggle_settings() {
    if (full == false) {
        toggle_full()
    }
    settings_menu = document.getElementById('settings_menu')
    if (settings_menu.classList.contains('hidden')) {
        settings_menu.classList.remove('hidden')
        console.log(labels)

        labels.forEach(l => l.classList.remove('hidden'));
    } else {
        settings_menu.classList.add('hidden')
        labels.forEach(l => l.classList.add('hidden'))
    }


}

function toggle_full() {
    if (!document.getElementById('settings_menu').classList.contains('hidden')) {
        toggle_settings()
    }
    if (full == true) {
        console.log('switch to compact mode')
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
        console.log('switch to full mode')
        for (const [key, value] of Object.entries(compact_sections)) {
            document.getElementById(key).classList.remove('hidden')
        }
        full = true
        }

}


console.log(localStorage.getItem('IP'))

function sendCommand(command) {
    const req = new XMLHttpRequest()
    tv_ip = localStorage.getItem('IP')
    const tv_url = `http://${tv_ip}/sony/IRCC`
    const preshared_key = '1qqa'
    code = code_list[command]
    req.open('POST', tv_url, true);
    req.setRequestHeader('Content-Type', 'text/xml; charset=UTF-8');
    // Note: The SOAPAction header value must be enclosed in " otherwise get
    // an Invalid Action error from TV!
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


    req.timeout = 3000; // in milliseconds
    req.send(data);
    console.log(`Sent ${command} command to TV at ${tv_ip} using preshared key ${preshared_key}`);


}

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