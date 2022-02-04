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
        this.position = this.find(start_key)
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
                console.log('its at', index, found)
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

// console.log(n.position)
console.log(n.find('7'))
let delta = n.delta(n.position, n.find('7'))
console.log(delta)
console.log(n.moves(delta))

console.log(n.moves(n.delta(n.find('5'), n.find('del'))))


