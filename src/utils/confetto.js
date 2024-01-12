import { randomNum } from "./index";

const gravityConfetti = 0.3;
const dragConfetti = 0.075;
const terminalVelocity = 3;

const colors = [
  { front: "#7b5cff", back: "#6245e0" }, // Purple
  { front: "#b3c7ff", back: "#8fa5e5" }, // Light Blue
  { front: "#5c86ff", back: "#345dd1" }, // Darker Blue
];

export default class Confetto {
  constructor(cx, cy) {
    this.randomModifier = randomNum(0, 99);
    this.color = colors[randomNum(0, colors.length)];
    this.dimensions = { x: randomNum(5, 9), y: randomNum(8, 15) };
    this.clients = { x: cx, y: cy };
    this.position = { x: cx, y: cy };
    this.scale = { x: 1, y: 1 };
    this.rotation = randomNum(0, 2 * Math.PI);
    this.velocity = { x: randomNum(-9, 9), y: -randomNum(6, 11) };
  }

  update() {
    this.velocity.x -= this.velocity.x * dragConfetti;
    this.velocity.y = Math.min(
      this.velocity.y + gravityConfetti,
      terminalVelocity
    );
    this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
  }
}
