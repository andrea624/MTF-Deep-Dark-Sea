class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // create loading bar
        // let loadingBar = this.add.graphics();
        // this.load.on('progress', (value) => {
        //     loadingBar.clear();                                 // reset fill/line style
        //     loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
        //     loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        // });
        // this.load.on('complete', () => {
        //     loadingBar.destroy();
        // });

        // change path to begin loading different assets
        this.load.path = './assets/'

        // load images
        this.load.image('menuscreen', './images/menuscreen.png')

        // load bitmap font
        this.load.bitmapFont('comixloud', './fonts/comixloud.png', 'fonts/comixloud.xml')

    }

    create() {
        // go to the title screen
        this.scene.start('menuScene')
    }
}