export default class StatsPanel {
    constructor(scene, stats) {
        this.scene = scene
        this.stats = stats
        this.create()
    }

    create() {
        const style = {
            font: "18px KodeMomo",
            fill: "white",
        }

        this.scene.add
            .graphics()
            .fillStyle(0x000000, 0.5)
            .fillRect(10, 10, 200, 100)
            .setScrollFactor(0)

        this.textLaps = this.scene.add.text(20, 20, "Laps: 0/0", style).setScrollFactor(0)
        this.textTotalTime = this.scene.add.text(20, 40, "Time: 0", style).setScrollFactor(0)
        this.textTimeLap = this.scene.add.text(20, 60, "Time lap: 0", style).setScrollFactor(0)
        this.textTimeBestLap = this.scene.add.text(20, 80, "Best time: 0", style).setScrollFactor(0)
    }

    render() {
        this.textLaps.setText(`Laps: ${this.stats.laps}/${this.stats.lap}`)
        this.textTotalTime.setText(`Time: ${this.stats.time.toFixed(2)}`)
        this.textTimeLap.setText(`Time lap: ${this.stats.timeLap.toFixed(2)}`)
        this.textTimeBestLap.setText(`Best time: ${this.stats.timeBestLap.toFixed(2)}`)
    }
}
