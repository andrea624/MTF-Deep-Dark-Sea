// enemy ship prefab
class Fishenemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)    // add to existing scene
        this.points = pointValue
        this.moveSpeed = game.settings.fishenemySpeed*1.5
    }

    update() {
        // move fish right
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }

    // reset position
    reset() {
        this.x = game.config.width
    }
} 