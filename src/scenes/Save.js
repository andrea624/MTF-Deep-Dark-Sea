class Save extends Phaser.Scene {
    constructor() {
        super('saveScene')
    }

    preload() {}

    create() {
        // add image
        this.add.image(0, 0, 'saving').setOrigin(0,0).setScale(.05)


        
    }

    update() {}
}