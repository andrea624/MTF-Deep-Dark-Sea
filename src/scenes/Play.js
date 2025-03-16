class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }
    create(){
        // tilemap
        const map = this.add.tilemap('mapJSON')
        const tileset = map.addTilesetImage('seabackground', 'tilesetImage')
        const layer1 = map.createLayer('Tile Layer 1', tileset)

        // place tile sprite
        //this.sea = this.add.tileSprite(0, 0, 1280, 640, 'tempsea').setOrigin(0, 0)
        
        // adding background music
        this.music = this.sound.add('underwater', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });
        this.music.play();

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
            repeat: -1 // Loop animation
        })
        this.player = this.physics.add.sprite(400, 450, 'walking').setScale(0.5, 0.5)
        this.player.play('walk')

        this.player.body.setGravityY(600)
        this.player.body.setDragY(10)
        this.player.setCollideWorldBounds(true)
        
        this.saves = null
      
        // manually add fish
        this.fish01 = new Fishenemy(this, game.config.width/6, 180, 'tempfish', 0, 10).setOrigin(0.5, 0)

        // manually add octopus
        this.octopus01 = new Octopusenemy(this, game.config.width/3, 90, 'tempocto', 0, 30).setOrigin(0.5)

        // manually add shark enemy
        this.shark01 = new Sharkenemy(this, game.config.width/2, 130, 'tempshark', 0, 20).setOrigin(0.5)
        //create keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)



        // GAME OVER flag
        this.gameOver = false
        this.keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

        //spawns fish
        this.spawnFish()
    }
    //fish spawner function
    spawnFish() {
        const fishX = Phaser.Math.Between(0, game.config.width - 100)
        const fishY = 450 
        this.fish = this.physics.add.sprite(fishX, fishY, 'tempfish').setOrigin(0, 0).setDisplaySize(50, 40)
        this.fish.setCollideWorldBounds(false)

    }
    //detector 
    handlePlayerFishCollision(player, fish) {
    
        fish.destroy()//removes the fish
        this.spawnFish()// Spawns a new fish
    }
    update(){
        //moves fish
        this.fish.x += 6
        //collision detection 
        this.physics.add.overlap(this.player, this.fish, this.handlePlayerFishCollision, null, this)
        if (this.keyRIGHT.isDown) {
            this.player.setVelocityX(200)//moves anim right
            this.player.play('walk', true)
            this.player.setFlipX(true)//flips animation in correct walking direction
            this.player.body.setGravityY(100)
            this.player.body.setDragY(10)
            if (this.keyFIRE.isDown){
                this.player.setVelocityX(200)//continues to move anim if moving right
                this.player.play('shoot', true)
                
            }
        }
        else if (this.keyLEFT.isDown) {
            this.player.setVelocityX(-200)//moves anim left
            this.player.play('walk', true)
            this.player.setFlipX(false)//flips animation
            this.player.body.setGravityY(100)
            this.player.body.setDragY(10)
            if (this.keyFIRE.isDown){
                this.player.setVelocityX(-200)//continues to move anim left
                this.player.play('shoot', true)
                
            }
        }
        else if (this.keyUP.isDown){
            this.player.setVelocityY(-200)
            this.player.body.setDragY(10)
            this.player.play('walk', true)
            if (this.keyFIRE.isDown){
                this.player.setVelocityY(-200)
                this.player.body.setDragY(10)
                this.player.play('shoot', true)
                
            }
        }
        else {
            this.player.setVelocityX(0)
            this.player.setVelocityY(15)
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

        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            if (!this.saves) {
                this.saves = this.add.image(150, 0, 'saving').setOrigin(0, 0).setScale(0.05)
                this.save_text = this.add.bitmapText(470, 570, 'comixloud', 'GAME SAVED', 32).setOrigin(0.5)
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //deletes image
            if (this.saves) {
                this.saves.destroy()
                this.saves = null //saves becomes null again
            }
            //deletes text
            if (this.save_text) {
                this.save_text.destroy()
                this.save_text = null
            }
        }
        if (this.fish.x > game.config.width) {
            this.fish.destroy() // removes fish
            this.spawnFish()
        }

    }
}