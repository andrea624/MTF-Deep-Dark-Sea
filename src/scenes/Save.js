class Save extends Phaser.Scene {
    constructor() {
        super('saveScene')
    }

    preload() {}

    create() {
        // add image
        this.add.image(150, 0, 'saving').setOrigin(0, 0).setScale(0.05)
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.loadPlayerPosition()//players position
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            this.savePlayerPosition()//saves players coordinates
            this.scene.start('menuScene')//takes player to menu scene
        }
    }
    savePlayerPosition() {
        const player = this.scene.get('playScene').player
        if (player) {
            const position = { x: player.x, y: player.y }
            localStorage.setItem('playerPosition', JSON.stringify(position))//players position is saved
        }
    }
    loadPlayerPosition() {
        const savedPosition = localStorage.getItem('playerPosition')
        if (savedPosition) {
            const position = JSON.parse(savedPosition)//changes from string to actual position
            const player = this.scene.get('playScene').player
            if (player) {
                player.setPosition(position.x, position.y)
            }
        }
    }
}