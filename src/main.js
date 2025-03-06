// Names: Andrea Martinez, Andrea Morales Villegas
// Game Title: Deep Dark Sea
// Time Completion: 
// log: 3/5: 4 hours 

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu ]
}

let game = new Phaser.Game(config)