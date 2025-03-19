class GameOver extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    create() {
        // add background image
        this.add.image(0, 0, 'goscreen').setOrigin(0, 0).setDisplaySize(game.config.width, game.config.height)

        // add text
        this.add.bitmapText(centerX, centerY-200, 'comixloud', 'GAME OVER', 46).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'comixloud', 'PRESS ENTER TO PLAY AGAIN', 24).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY+100, 'comixloud', 'PRESS SPACE TO GO TO MENU', 24).setOrigin(0.5)

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