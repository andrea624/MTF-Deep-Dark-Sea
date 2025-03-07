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
        //create keys
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
        
        

    }
}