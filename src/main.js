// Names: Andrea Martinez, Andrea Morales Villegas
// Make the Fake Game Title: Deep Dark Sea from Arthur (cartoon)
// Phaser Components Used: Arcade Physics, camera, animation manager, timer and tilemap
// Game Credits can be found during the win scene
// Time Completion: 53 hours 

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Menu, Save, GameOver, Win, Play ]
}

let game = new Phaser.Game(config)

// global variables
let centerX = game.config.width / 2
let centerY = game.config.height/ 2
const titleY = game.config.height / 5

//reserves keywords for keyboard
let keyEnter, keyFIRE, keyLEFT, keyRIGHT, keyDOWN, keySPACE, keyUP