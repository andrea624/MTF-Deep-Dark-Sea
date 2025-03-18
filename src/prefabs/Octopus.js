// enemy octopusprefab
class Octopusenemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tempocto')

        // Store scene reference
        this.sceneRef = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)
    
        this.setCollideWorldBounds(true)
        this.body.allowGravity = false
        this.speed = 60;
    }

    update(player) {
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
            let spawn = this.sceneRef.map.findObject('Spawns', obj => obj.name === 'octoSpawn')
            if (spawn) {
                this.setPosition(spawn.x, spawn.y)
                this.setActive(true)
                this.setVisible(true)
                this.body.enable = true // Ensure body is re-enabled when respawning
            }
        });
    }
}