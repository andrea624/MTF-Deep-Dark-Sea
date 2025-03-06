class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    // everything was preloaded in Load.js
    preload() {

    }

    create() {
        // add background image
        this.add.image(0, 0, 'menuscreen').setOrigin(0, 0).setDisplaySize(game.config.width, game.config.height)

        
    }

    update() {
        // check for input

    }
}