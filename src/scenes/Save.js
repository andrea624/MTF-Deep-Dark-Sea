class Save extends Phaser.Scene {
    constructor() {
        super('saveScene')
    }

    preload() {}

    create() {
        // add image
        this.add.image(150, 0, 'saving').setOrigin(0,0).setScale(.05)

        // create key (delete later)
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)



        
    }

    update() {

        // temp to skip back to menu
        if(Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.scene.start('menuScene')
        }
    }
}