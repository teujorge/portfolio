export class Vector {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  sub(vector: Vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  mult(n: number) {
    this.x *= n;
    this.y *= n;
  }

  div(n: number) {
    this.x /= n;
    this.y /= n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const m = this.mag();
    if (m !== 0) {
      this.div(m);
    }
  }

  limit(max: number) {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
  }

  setMag(n: number) {
    this.normalize();
    this.mult(n);
  }

  heading() {
    return Math.atan2(this.y, this.x);
  }

  rotate(angle: number) {
    const newHeading = this.heading() + angle;
    const mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
  }

  static distance(a: Vector, b: Vector) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    return Math.sqrt(x * x + y * y);
  }

  static sub(a: Vector, b: Vector) {
    return new Vector(a.x - b.x, a.y - b.y);
  }

  static mult(a: Vector, n: number) {
    return new Vector(a.x * n, a.y * n);
  }
}
