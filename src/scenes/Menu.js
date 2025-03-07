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

        // add title text
        //this.add.bitmapText()
        this.add.bitmapText(centerX, titleY, 'comixloud', 'DEEP DARK', 64).setOrigin(0.5)

        //adds key
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    }

    update() {
        // check for input
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('saveScene')
            //console.log('im hungry')
        }

    }
}