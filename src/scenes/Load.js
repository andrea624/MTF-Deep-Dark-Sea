class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //create loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // change path to begin loading different assets
        this.load.path = './assets/'

        // load images/tile sprites
        this.load.image('menuscreen', 'images/menuscreen.png')
        this.load.image('saving', 'images/saving.png')
        this.load.image('goscreen', 'images/tempgo.png') // temporary game over screen
        
        // load tilemap
        this.load.image('tilesetImage', 'seabackground.png')
        this.load.tilemapTiledJSON('mapJSON', 'seamap.json')
        
        // sprites
        this.load.image('tempocto', 'images/tempocto.png')
        this.load.image('tempfish', 'images/tempfish.png')
        this.load.image('tempshark', 'images/tempshark.png')
        this.load.image('Arrow', 'images/arrow.png')

        //loads spritesheets
        this.load.spritesheet('walking', 'images/walking.png', {
            frameWidth: 400, 
            frameHeight: 400
        })
        this.load.spritesheet('shooting', 'images/shooting.png',{
            frameWidth: 400,
            frameHeight: 400 
        })

        // load bitmap font
        this.load.bitmapFont('comixloud', 'fonts/comixloud.png', 'fonts/comixloud.xml')

        // load sound effects/music
        this.load.audio('underwater', 'sfx/underwater.wav')
    }

    create() {
        
        // go to the title screen
        this.scene.start('menuScene')
        
    }
}