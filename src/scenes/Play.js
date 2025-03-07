class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }
    create(){
        //create keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    }
    update(){
        if (keyLEFT.isDown) {
            this.p1Rocket.x -= 4 //moves left
        }
        if (keyRIGHT.isDown) {
            this.p1Rocket.x += 4 //moves right
        }

    }
}