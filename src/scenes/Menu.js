class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load background
        this.preload.image('titlescreen', './assets/images/menuscreen.png')
    }

    create() {
        // add menu background image
        this.add.image(0, 0, 'titlescreen').setOrigin(0, 0).setDisplaySize(game.config.width, game.config.height);

    }

    update() {

    }
}