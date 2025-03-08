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

        // load images/tile sprites
        this.load.image('menuscreen', './images/menuscreen.png')
        this.load.image('saving', './images/saving.png')
        
        this.load.image('tempsea', './images/tempsea.png') // temporary game background

        // sprites
        this.load.image('tempocto', './images/tempocto.png')
        this.load.image('tempfish', './images/tempfish.png')
        this.load.image('tempshark', './images/tempshark.png')

        //loads spritesheets
        this.load.spritesheet('walking', './images/walking.png', {
            frameWidth: 800, 
            frameHeight: 800
        })
        this.load.spritesheet('shooting', './images/shooting.png',{
            frameWidth: 800,
            frameHeight: 800 
        })



        // load bitmap font
        this.load.bitmapFont('comixloud', './fonts/comixloud.png', 'fonts/comixloud.xml')

    }

    create() {
        // define animations
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walking', {
            start: 0,
            end: 3
            }),
            frameRate: 10,
            repeat: -1 // Loop animation
        })
        // go to the title screen
        this.scene.start('menuScene')
        
    }
}