class GameOver extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    create() {
        // add background image
        this.add.image(0, 0, 'goscreen').setOrigin(0, 0).setDisplaySize(game.config.width, game.config.height)

        // add text
        this.add.bitmapText(centerX, centerY, 'comixloud', 'click enter to play again', 28).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY+100, 'comixloud', 'click space to go to menu', 28).setOrigin(0.5)

        //adds key
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('playScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('menuScene')
        }

    }
}