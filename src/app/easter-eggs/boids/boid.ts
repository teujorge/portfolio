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
}

export class Boid {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;

  alignmentCoefficient = 1.0;
  cohesionCoefficient = 1.0;
  separationCoefficient = 1.0;

  private canvas: HTMLCanvasElement;
  private strokeWeight = 4;
  private stroke = 255;
  private maxForce = 0.05;
  private maxSpeed = 2;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.position = new Vector(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    this.velocity = new Vector(
      Math.random() * 8.0 - 4.0,
      Math.random() * 8.0 - 4.0
    );
    this.acceleration = new Vector();
  }

  draw() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    // Calculate the angle of rotation from the velocity
    const angle = Math.atan2(this.velocity.y, this.velocity.x);

    // Define the size of the triangle
    const size = this.strokeWeight * 2;

    // Calculate the three points of the triangle
    const pointA = {
      x: this.position.x + size * Math.cos(angle),
      y: this.position.y + size * Math.sin(angle),
    };
    const pointB = {
      x: this.position.x + size * Math.cos(angle + (Math.PI * 3) / 4),
      y: this.position.y + size * Math.sin(angle + (Math.PI * 3) / 4),
    };
    const pointC = {
      x: this.position.x + size * Math.cos(angle - (Math.PI * 3) / 4),
      y: this.position.y + size * Math.sin(angle - (Math.PI * 3) / 4),
    };

    // Draw the triangle
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.closePath();

    // Style and fill the triangle
    ctx.fillStyle = `rgb(${this.stroke}, ${this.stroke}, ${this.stroke})`;
    ctx.fill();
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    this.velocity.limit(this.maxSpeed);

    this.edges();
    this.acceleration.mult(0);
  }

  flock(boids: Boid[]) {
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);
    const separation = this.separation(boids);

    alignment.mult(this.alignmentCoefficient);
    cohesion.mult(this.cohesionCoefficient);
    separation.mult(this.separationCoefficient);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  private align(boids: Boid[]) {
    const perceptionRadius = 40;
    const steering = new Vector();
    let total = 0;
    for (const other of boids) {
      const d = Vector.distance(this.position, other.position);
      if (other !== this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  private cohesion(boids: Boid[]) {
    const perceptionRadius = 50;
    const steering = new Vector();
    let total = 0;
    for (const other of boids) {
      const d = Vector.distance(this.position, other.position);
      if (other !== this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  private separation(boids: Boid[]) {
    const perceptionRadius = 30;
    const steering = new Vector();
    let total = 0;
    for (const other of boids) {
      const d = Vector.distance(this.position, other.position);
      if (other !== this && d < perceptionRadius && d != 0) {
        let diff = Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  private edges() {
    if (this.position.x > this.canvas.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.canvas.width;
    }

    if (this.position.y > this.canvas.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.canvas.height;
    }
  }
}
