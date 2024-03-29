export default class StatsPopap {
    constructor(scene, stats) {
        this.scene = scene
        this.stats = stats
        this.create()
    }

    create() {
        const style = {
            title: {
                font: "bold 36px KodeMomo",
                fill: "greenyellow",
            },
            statText: {
                font: "bold 20px KodeMomo",
                fill: "white",
            },
            text: {
                font: "bold 24px KodeMomo",
                fill: "orange",
            },
        }
        const popapWidth = 800
        const popapHeight = 600

        this.scene.add
            .graphics()
            .fillStyle(0x000000, 0.5)
            .fillRect(
                (this.scene.game.config.width - popapWidth) / 2,
                (this.scene.game.config.height - popapHeight) / 2,
                popapWidth,
                popapHeight
            )
            .setScrollFactor(0)

        this.scene.add
            .text(
                this.scene.cameras.main.centerX,
                this.scene.cameras.main.centerY - 100,
                "Level complete!",
                style.title
            )
            .setOrigin(0.5)
            .setScrollFactor(0)

        this.scene.add
            .text(
                this.scene.cameras.main.centerX,
                this.scene.cameras.main.centerY + 20,
                `Total time: ${this.stats.time.toFixed(2)}`,
                style.statText
            )
            .setOrigin(0.5)
            .setScrollFactor(0)
        this.scene.add
            .text(
                this.scene.cameras.main.centerX,
                this.scene.cameras.main.centerY - 20,
                `Best time: ${this.stats.timeBestLap.toFixed(2)}`,
                style.statText
            )
            .setOrigin(0.5)
            .setScrollFactor(0)

        this.scene.add
            .text(
                this.scene.cameras.main.centerX,
                this.scene.cameras.main.centerY + 100,
                "Tap for new game",
                style.text
            )
            .setOrigin(0.5)
            .setScrollFactor(0)

        this.scene.input.once("pointerdown", () => {
            this.scene.scene.start("Game")
        })
    }
}
