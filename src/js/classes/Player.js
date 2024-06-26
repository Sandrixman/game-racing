const DIRECTION = Object.freeze({ BACKWARD: -1, NONE: 0, FORWARD: 1 })
const TURNS = Object.freeze({ LEFT: -1, NONE: 0, RIGHT: 1 })
const MAX_SPEED = 10
const ACCELERATION = 0.5
const SLIDE_ANGLE = 5

export default class Player {
    constructor(scene, map, config) {
        this.scene = scene
        this.map = map
        const position = this.map.getPlayerPosition(config.position)
        this.car = this.scene.matter.add
            .sprite(position.x, position.y, "objects", config.sprite)
            .setFixedRotation(true)
        this._velocity = 0
        this.checkpoint = 0
    }

    get direction() {
        let direction = DIRECTION.NONE
        if (this.scene.cursors.up.isDown) {
            direction = DIRECTION.FORWARD
        } else if (this.scene.cursors.down.isDown) {
            direction = DIRECTION.BACKWARD
        }
        return direction
    }

    get velocity() {
        const speed = Math.abs(this._velocity)
        const frictionSpeed = this.getFrictionSpeed()

        if (this.direction && speed < frictionSpeed) {
            this._velocity += ACCELERATION * Math.sign(this.direction)
        } else if ((this.direction && speed > frictionSpeed) || (!this.direction && speed > 0)) {
            this._velocity -= ACCELERATION * Math.sign(this._velocity)
        }
        return this._velocity
    }

    get turn() {
        let turn = TURNS.NONE
        if (this.scene.cursors.left.isDown) {
            turn = TURNS.LEFT
        } else if (this.scene.cursors.right.isDown) {
            turn = TURNS.RIGHT
        }
        return turn
    }

    get angle() {
        return this.car.angle + (this.turn * MAX_SPEED) / 2
    }

    getVelocityFromAngle() {
        const vec2 = new Phaser.Math.Vector2()
        return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity)
    }

    getFrictionSpeed() {
        return this.map.getTileFriction(this.car) * MAX_SPEED
    }

    checkPosition() {
        const checkpoint = this.map.getCheckpoint(this.car)
        if (checkpoint) {
            this.onCheckpoint(checkpoint)
        }
    }

    onCheckpoint(checkpoint) {
        if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.length) {
            this.checkpoint = 1
            this.car.emit("lap")
        } else if (checkpoint === this.checkpoint + 1) {
            this.checkpoint++
        }
    }

    slide() {
        this.car.angle += SLIDE_ANGLE
    }

    move() {
        this.car.setAngle(this.angle)
        const velocity = this.getVelocityFromAngle()
        this.car.setVelocity(velocity.x, velocity.y)
        this.checkPosition()
    }
}
