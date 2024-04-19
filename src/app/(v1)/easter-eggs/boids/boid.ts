import { Vector } from "./vector";

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
  private maxForce = 5; // px/s^2
  private maxSpeed = 200; // px/s

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.position = new Vector(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    this.velocity = new Vector(
      Math.random() * 200 - 100,
      Math.random() * 200 - 100
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

  update(dt: number) {
    const distanceToTravel = Vector.mult(this.velocity, dt);
    this.position.add(distanceToTravel);
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

    if (this.position.z > 10) {
      this.position.z = -10;
    } else if (this.position.z < -10) {
      this.position.z = 10;
    }
  }
}
