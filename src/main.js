import Phaser from "phaser"
import BootScene from "./js/scenes/BootScene"
import PreloadScene from "./js/scenes/PreloadScene"
import StartScene from "./js/scenes/StartScene"
import GameScene from "./js/scenes/GameScene"

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [BootScene, PreloadScene, StartScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "matter",
        matter: {
            debug: false,
            gravity: { x: 0, y: 0 },
        },
    },
}

new Phaser.Game(config)
