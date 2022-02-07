# Remote
![The virtual remote looks just like the real thing](https://github.com/markshyzer/remote/blob/main/screenshot.png)

This virtual remote uses Sony's IRCC-IP protocol to send commands to any post-2016 Sony Bravia TV from any device on the same wifi network.

### Setup

Note: Some browsers take issue with the cross-origin requests required to communicate with your TV, which may mean adjusting your security settings. If you'd rather not, the easiest way around this is to save the page to your machine and open the local copy.

The first time you use the remote you'll need to enter your TV's IP address and pre-shared key. Tap the &#9881; to open the settings menu. 

To find your TV's IP address select [HOME] on your TV and go to Settings -> Network -> Advanced settings -> Network status -> IP address. Find or set your TV's pre-shared key by going to [HOME] -> Settings -> Network -> Home network setup -> IP control -> Authentication / Pre-Shared Key. (This may vary slightly by model. See [Sony's documentation](https://pro-bravia.sony.net/develop/integrate/ip-control/index.html#ip-control-authentication).)

With the Settings menu open you will see a checkbox next to each section of the remote. Check the sections you would like to appear in Compact View. These choices, along with your IP address and Pre-shared Key, will be saved in your browser for the next time you use the remote. (Your browser may discard your saved settings after a while)

Click &#9881; to close the settings menu. Click &#8286;&#8285;&#8286; to toggle between Full View and Compact View.

### On-Screen Keyboard Input

The text box at the bottom of the screen takes text input from your device and can 'type' it into an on-screen keyboard. To use it, navigate to the on-screen keyboard, making sure that the cursor on-screen is placed on the key indicated in the box to the left of the input. Then type as you normally would. The remote will handle the rest.

### Limitations & Known Issues
The IRCC-IP protocol can only send a limited number of commands and receives no feedback. There is no way to send text information directly, or to confirm what has been received, so the keyboard input works by navigating its own map of the on-screen keyboard using the arrow commands the same way a human user would, but faster. 
Currently only the Netflix search keyboard layout has been modeled.
The remote receives a confirmation that a command was received, but has no way of knowing that it has been executed by the TV app. As a partial solution, the remote pauses briefly between successive commands, but without making that wait interminably long it is still possible that a slow-running process on the TV may cause commands to be skipped. If this happens, use the arrow keys to move the on-screen cursor to the key indicated in the box to the left of the input box. Or simply clear the on-screen text manually and Refresh the remote in your browser.
Navigating directly from the 'space' key to the 'delete' key will throw the cursor out of sync.

### To-Do
- Error handling
- Update Keyboard class to handle various key shapes
- Add additional keyboard layouts
- Allow user to set delay duration
- Allow additional button selection & layout customization
- Investigate a non-skeuomorphic design

### See Also
Sony's [IRCC-IP documentation](https://pro-bravia.sony.net/develop/integrate/ircc-ip/overview/index.html)


