class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }
    create(){
        // place tile sprite
        this.sea = this.add.tileSprite(0, 0, 1280, 640, 'tempsea').setOrigin(0, 0)

        //create keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        // GAME OVER flag
        this.gameOver = false

    }
    update(){
        // if (keyLEFT.isDown) {
        //     this.p1Rocket.x -= 4 //moves left
        // }
        // if (keyRIGHT.isDown) {
        //     this.p1Rocket.x += 4 //moves right
        // }

        // move tilesprite
        //this.sea.tilePositionX -= 2

        // check key input in order to transition into the save scene
        if(Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.scene.start('saveScene')
        }

    }
}