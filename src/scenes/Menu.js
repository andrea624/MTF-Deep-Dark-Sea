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
        this.add.bitmapText(centerX, titleY, 'comixloud', 'DEEP DARK SEA', 64).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 150, 'comixloud', 'USE LEFT & RIGHT ARROWS TO MOVE, F KEY TO FIRE', 16).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 190, 'comixloud', 'TO SAVE PROGRESS IN GAME PRESS ENTER', 16).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 240, 'comixloud', 'PRESS ENTER TO BEGIN', 16).setOrigin(0.5)
        
        //adds key
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        // adding background music
        this.music = this.sound.add('underwater', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true
        });
        this.music.play();

    }

    update() {
        // check for input
        
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('playScene')
        }

    }
}