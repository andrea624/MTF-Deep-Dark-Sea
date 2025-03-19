class Win extends Phaser.Scene {
    constructor() {
        super('winScene');
    }

    create() {
        // add background image
        this.add.image(0, 0, 'winscreen').setOrigin(0, 0).setDisplaySize(game.config.width, game.config.height)

        this.add.bitmapText(centerX, centerY - 200, 'comixloud', 'YOU WIN!', 46).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'comixloud', 'PRESS ENTER TO GO TO MENU', 25).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 100, 'comixloud', 'CREDITS:', 20).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 140, 'comixloud', 'FONT: COMIX LOUD BY IMAGEX', 14).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 170, 'comixloud', 'SFX: UNDERWATER SUB FANTASY SOUND BY LIMITSNAP_CREATIONS', 14).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 200, 'comixloud', 'ANIMATIONS: ANDREA MARTINEZ', 14).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 230, 'comixloud', 'ARTWORK:  PLAYER, EXPLOSION, & WEAPON BY ANDREA MARTINEZ', 14).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 260, 'comixloud', '          TILEMAP, ENEMIES, SCENE BGS BY ANDREA MORALES VILLEGAS', 14).setOrigin(0.5)

        //adds key
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
   
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('menuScene')
        }

    }
}
