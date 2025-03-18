// enemy ship prefab
class Fishenemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tempfish')

        // Store scene reference
        this.sceneRef = scene
    
        scene.add.existing(this)    // add to existing scene
        scene.physics.add.existing(this)

        // this.spawnX = x;  // Store spawn location
        // this.spawnY = y;

        this.setCollideWorldBounds(true)
        this.setScale(0.5)

        this.body.allowGravity = false
        this.speed = 30
    }

    update(player) {
        // fish movement to follow player
        if (player) {
            this.scene.physics.moveToObject(this, player, this.speed)
        }   
    }

    destroyAndRespawn() {
        if (!this.scene) return;

        //this.destroy()
        // Disable the enemy instead of destroying it
        this.setActive(false)
        this.setVisible(false)
        this.body.enable = false

        this.sceneRef.time.delayedCall(3000, () => {
            if (!this.sceneRef) return;
            let spawn = this.sceneRef.map.findObject('Spawns', obj => obj.name === 'fishSpawn')
            if (spawn) {
                this.setPosition(spawn.x, spawn.y)
                this.setActive(true)
                this.setVisible(true)
                this.body.enable = true // Ensure body is re-enabled when respawning
            }
        });
    }
}