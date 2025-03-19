class Win extends Phaser.Scene {
    constructor() {
        super('winScene');
    }

    create() {
        this.add.text(400, 300, "YOU WIN!", {
            fontSize: '64px',
            fill: '#FFF'
        }).setOrigin(0.5)

        //adds key
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
   
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('menuScene')
        }

    }
}
