class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }
    create(){
        //animation for walking left
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walking', {
            start: 0,
            end: 3
            }),
            frameRate: 10,
            repeat: -1  // Loop animation
        })
        //animation for shooting
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('shooting', {
            start: 0,
            end: 5
            }),
            frameRate: 10,
            repeat: 0 
        })
        this.player = this.physics.add.sprite(400, 300, 'walking')
        this.player.play('walk')
        // place tile sprite
        this.sea = this.add.tileSprite(0, 0, 1280, 640, 'tempsea').setOrigin(0, 0)

        //create keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        // GAME OVER flag
        this.gameOver = false
        this.keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    }
    update(){
        if (this.keyRIGHT.isDown) {
            this.player.setVelocityX(200)//moves anim right
            this.player.play('walk', true)
            this.player.setFlipX(true)//flips animation in correct walking direction
            if (this.keyFIRE.isDown){
                this.player.setVelocityX(0)//stops anim movement
                this.player.play('shoot', true)
            }
        }
        else if (this.keyLEFT.isDown) {
            this.player.setVelocityX(-200)//moves anim left
            this.player.play('walk', true)
            this.player.setFlipX(false)//flips animation
            if (this.keyFIRE.isDown){
                this.player.setVelocityX(0)//stops anim from moving on x axis
                this.player.play('shoot', true)
            }
        }
        else {
            this.player.setVelocityX(0)
            this.player.stop()
        }
        
        
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