class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }
    create(){
        // tilemap
        const map = this.add.tilemap('mapJSON')
        const tileset = map.addTilesetImage('seabgts', 'tilesetImage')
        const layer1 = map.createLayer('Tile Layer 1', tileset)

        // adding collision in map
        layer1.setCollisionByProperty({ collides: true })

        // 
        const playerSpawn = map.findObject('Spawns', (obj) => obj.name === 'playerSpawn')

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

        this.player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'walking').setScale(0.15, 0.15).setCircle(155)
        this.player.play('walk')

        this.player.body.setGravityY(600)
        this.player.body.setDragY(10)
        this.player.setCollideWorldBounds(true)

        // add camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        
        this.physics.add.collider(this.player, layer1)

        this.saves = null
      
        // manually add fish
        this.fish01 = new Fishenemy(this, game.config.width/6, 300, 'tempfish', 0, 10).setOrigin(0.5, 0)

        // manually add octopus
        this.octopus01 = new Octopusenemy(this, game.config.width/3, 90, 'tempocto', 0, 30).setOrigin(0.5)

        // manually add shark enemy
        this.shark01 = new Sharkenemy(this, game.config.width/2, 130, 'tempshark', 0, 20).setOrigin(0.5)

        //group for arrows
        this.arrows = this.physics.add.group({
            defaultKey: 'Arrow',
            maxSize: 4
        })
        //create keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)



        

        // GAME OVER flag
        this.gameOver = false
        this.keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

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
    //fire arrow function
    fireArrow() {
        let arrow = this.arrows.get(this.player.x, this.player.y, 'Arrow')

    
        if (arrow) {
            arrow.setActive(true)//makes arrow collide
            arrow.setVisible(true)// makes arrow visible
            arrow.body.enable = true
            arrow.body.allowGravity = false
    
            
            let arrowSpeed = this.player.flipX ? 500 : -500 //depends on player direction to flip arrows
            arrow.setVelocityX(arrowSpeed)
            arrow.setScale(0.5)
    
            arrow.setFlipX(this.player.flipX)//flips for left
            //hides arrows after 2 secs
            this.time.delayedCall(2000, () => {
                this.arrows.killAndHide(arrow)//deactivates arrow and hides them
                arrow.body.enable = false
            })
        }
    }

    update(){
        //moves fish
        this.fish.x += 6
        //collision detection 
        this.physics.add.overlap(this.player, this.fish, this.handlePlayerFishCollision, null, this)
        let velocityX = 0
        let velocityY = 0
        let animation = null
        //curr direction
        let flipX = this.player.flipX
        if (this.keyRIGHT.isDown) {
            velocityX = 200
            flipX = true
        }
        if (this.keyLEFT.isDown) {
            velocityX = -200
            flipX = false
        }
        if (this.keyDOWN.isDown) {
            velocityY = 200
        }
        if (this.keyUP.isDown) {
            velocityY = -200
        }
        //fixes the shooting and walking animations
        if (this.keyFIRE.isDown) {
            animation = 'shoot'
        } else if (velocityX !== 0 || velocityY !== 0) {
            animation = 'walk'
        }
        this.player.setVelocityX(velocityX)
        this.player.setVelocityY(velocityY)
        this.player.setFlipX(flipX)

        if (animation) {
            this.player.play(animation, true)
        } else {
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

        //adjusted save image now considers the camera position and disappears after .7 seconds
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            if (!this.saves) {
                //fit to screen 
                this.saves = this.add.image(this.cameras.main.centerX + this.cameras.main.worldView.x, this.cameras.main.centerY + this.cameras.main.worldView.y, 'saving').setOrigin(0.5, 0.5).setScale(0.05) 
                this.save_text = this.add.bitmapText(this.cameras.main.centerX + this.cameras.main.worldView.x, this.cameras.main.centerY + this.cameras.main.worldView.y + 50, 'comixloud', 'GAME SAVED', 32).setOrigin(0.5, 0.5)
                //removes both text and image
                this.time.delayedCall(700, () => {
                    if (this.saves) {
                        this.saves.destroy()
                        this.saves = null
                    }
                    if (this.save_text) {
                        this.save_text.destroy()
                        this.save_text = null
                    }
                })
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
        //shoots arrow 
        if (Phaser.Input.Keyboard.JustDown(this.keyFIRE)) {
            this.fireArrow()
        }
        

    }
}