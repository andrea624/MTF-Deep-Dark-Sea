// Names: Andrea Martinez, Andrea Morales Villegas
// Game Title: Deep Dark Sea
// Time Completion: 
// log: 3/5: 4 hours 

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    physics: {
        default: 'arcade'
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Menu, Save, Play ]
}

let game = new Phaser.Game(config)

// global variables
const centerX = game.config.width / 2
const titleY = game.config.height / 5

//reserves keywords
let keyEnter, keyFIRE, keyLEFT, keyRIGHT