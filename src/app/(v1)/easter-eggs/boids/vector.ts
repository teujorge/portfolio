export class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
  }

  sub(vector: Vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
  }

  mult(n: number) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }

  div(n: number) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
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

  static distance(a: Vector, b: Vector) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    const z = a.z - b.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  static sub(a: Vector, b: Vector) {
    return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  static mult(a: Vector, n: number) {
    return new Vector(a.x * n, a.y * n, a.z * n);
  }
}
