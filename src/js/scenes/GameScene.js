import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {}

    preload() {
        this.add.sprite(0, 0, "bg").setOrigin(0)
    }

    update() {}
}
