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

        //player spawns
        const playerSpawn = map.findObject('Spawns', (obj) => obj.name === 'playerSpawn')

        
        // adding background music & sfxs
        this.music = this.sound.add('underwater', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });
        this.music.play();

        this.hitsfx = this.sound.add('bubding')

        this.events.once('playerHit', () => {
            this.hitsfx.play();
        });

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
        //explosion animaiton
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
            start: 0,
            end: 4
            }),
            frameRate: 10,
            repeat: 0, //dont repeat
            hideOnComplete: true //hide when anim is done
        })
        //players last saved position
        const savedPosition = localStorage.getItem('playerPosition')
        if (savedPosition) {
            const position = JSON.parse(savedPosition)
            this.player = this.physics.add.sprite(position.x, position.y, 'walking').setScale(0.15, 0.15).setCircle(155)
        }
        else {
            this.player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'walking').setScale(0.15, 0.15).setCircle(155)
        }
        this.player.play('walk')

        this.player.body.setGravityY(900)
        this.player.body.setDragY(10)
        this.player.setCollideWorldBounds(true)

        // add camera & world bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.player, layer1)

        this.saves = null
       
        // Create an enemy group
        this.enemies = this.physics.add.group()

        // find enemy spawns
        const sharkSpawn = map.findObject('Spawns', obj => obj.name === 'sharkSpawn')
        const octoSpawn = map.findObject('Spawns', obj => obj.name === 'octoSpawn')
        const fishSpawn = map.findObject('Spawns', obj => obj.name === 'fishSpawn')
        
        // spawn enemies
        if (sharkSpawn) this.spawnEnemy('shark', sharkSpawn.x, sharkSpawn.y)
        if (octoSpawn) this.spawnEnemy('octopus', octoSpawn.x, octoSpawn.y)
        if (fishSpawn) this.spawnEnemy('fish', fishSpawn.x, fishSpawn.y)
        
        // adding collision detection between enemies & the map
        this.physics.add.collider(this.enemies, layer1)

        //group for arrows
        this.arrows = this.physics.add.group({
            defaultKey: 'Arrow',
            maxSize: 4
        })

        // Find bottle spawn point in the tilemap
        const bottleSpawn = map.findObject('Spawns', obj => obj.name === 'bottleSpawn')

        // Create bottle sprite at the spawn location
        if (bottleSpawn) {
            this.bottle = this.physics.add.sprite(bottleSpawn.x, bottleSpawn.y, 'bottle').setScale(0.5)
            this.bottle.setCollideWorldBounds(true)
            this.bottle.body.allowGravity = false // Keeps the bottle from falling
        }

        // Add collision between player and bottle
        this.physics.add.overlap(this.player, this.bottle, this.collectBottle, null, this)

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

        // Collision detection: Arrows destroy enemies
        this.physics.add.overlap(this.arrows, this.enemies, this.destroyEnemy, null, this)

        // Collision detection: Enemies destroy player :(
        this.physics.add.collider(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this)
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

    // Spawn an enemy and add to the group
    spawnEnemy(type, x, y) {
        let enemy
        if (type === 'shark') enemy = new Sharkenemy(this, x, y)
        if (type === 'octopus') enemy = new Octopusenemy(this, x, y)
        if (type === 'fish') enemy = new Fishenemy(this, x, y)

        if (enemy) this.enemies.add(enemy)
    }

    // Destroy enemy when hit by an arrow functions
    destroyEnemy(arrow, enemy) {
        if (enemy && enemy.destroyAndRespawn) {
            let explosion = this.add.sprite(enemy.x, enemy.y, 'explosion')//where enemy is
            explosion.play('explode')//plays anim
            enemy.destroyAndRespawn() // Call respawn function from enemy class
        }
        
    }

    handlePlayerEnemyCollision(player, enemy) {
        console.log("Game Over! Enemy touched player.")

        // emit the event to play the sound once
        this.events.emit('playerHit')

        // stop all movement
        player.setVelocity(0)
        player.anims.stop()
        
        //resets player position after game over
        localStorage.setItem('playerPosition', JSON.stringify({
            x: 3000,
            y: 0
        }))
    
        // Short delay before transitioning
        this.time.delayedCall(500, () => {
            this.scene.start('gameoverScene') // Switch to Game Over scene
        });
    }

    collectBottle(player, bottle) {
        console.log("Bottle collected! You win!");
    
        // Hide bottle and disable physics body
        bottle.setVisible(false);
        bottle.body.setEnable(false);
    
        // Short delay before transitioning
        this.time.delayedCall(1000, () => {
            this.scene.start('winScene'); // Change to your win scene
        });
    }
    
    

    update(){
        // Make enemies chase the player
        this.enemies.children.iterate(enemy => {
            if (enemy.active) {
                enemy.setBounce(0.2); // Slight bounce on collision
                enemy.setCollideWorldBounds(true); // Prevents enemies from leaving the world
                enemy.update(this.player)
            }        
        });

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
        }
        else if (velocityX !== 0 || velocityY !== 0) {
            animation = 'walk'
        }
        this.player.setVelocityX(velocityX)
        this.player.setVelocityY(velocityY)
        this.player.setFlipX(flipX)

        if (animation) {
            this.player.play(animation, true)
        }
        else {
            this.player.stop()
        }
        
        
        //adjusted save image now considers the camera position and disappears after .7 seconds and also saves playerPosition with its coordinates
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            const playerPosition = {
                x: this.player.x,
                y: this.player.y
            }
        
            //save players position to localStorage
            localStorage.setItem('playerPosition', JSON.stringify(playerPosition))
        
            if (!this.saves) {
                //fit to screen 
                
                this.saves = this.add.image(this.cameras.main.centerX + this.cameras.main.worldView.x, this.cameras.main.centerY + this.cameras.main.worldView.y, 'saving').setOrigin(0.5, 0.5).setScale(0.05) 
                this.save_text = this.add.bitmapText(this.cameras.main.centerX + this.cameras.main.worldView.x, this.cameras.main.centerY + this.cameras.main.worldView.y + 250, 'comixloud', 'GAME SAVED', 32).setOrigin(0.5, 0.5)
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
                    this.scene.start('menuScene')
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
        //shoots arrow 
        if (Phaser.Input.Keyboard.JustDown(this.keyFIRE)) {
            this.fireArrow()
        }
        

    }
}