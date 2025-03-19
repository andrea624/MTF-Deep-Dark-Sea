class Win extends Phaser.Scene {
    constructor() {
        super('winScene');
    }

    create() {
        this.add.text(400, 300, "YOU WIN!", {
            fontSize: '64px',
            fill: '#FFF'
        }).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 120, 'comixloud', 'Press Enter to go to Menu', 30).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 170, 'comixloud', 'Credits:', 20).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 200, 'comixloud', 'Sounds: underwater sound from freesound.org', 16).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 230, 'comixloud', 'Animations: Andrea Martinez', 16).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 260, 'comixloud', 'Artwork: Andrea Andrea Morales Villegas', 16).setOrigin(0.5)

        //adds key
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
   
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('menuScene')
        }

    }
}
