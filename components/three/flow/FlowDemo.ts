import * as THREE from "three";
import { Spheres } from "./Spheres";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createInputEvents from "./simple-input";
import { MouseEvent } from "react";

export class FlowDemo {
  container: any;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  disposed: boolean;

  config: any;
  controls: OrbitControls;
  text: Text;
  topSpheres: Spheres;
  bottomSpheres: Spheres;
  event: any;
  animating: any;
  closed: any;

  constructor(container: any, config: any) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      stencil: false,
    });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
    this.renderer.setPixelRatio(Math.max(1.5, window.devicePixelRatio));

    container.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.1,
      10000
    );
    this.camera.position.z = 50;
    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();
    this.disposed = false;
    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.setSize = this.setSize.bind(this);

    this.config = config;
    this.camera.position.z = 200;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.text = new Text("this");
    this.topSpheres = new Spheres(config, [
      new THREE.Color("#ff3030"),
      new THREE.Color("#121214"),
    ]);
    this.bottomSpheres = new Spheres(config, [
      new THREE.Color("#5050ff"),
      new THREE.Color("#121214"),
    ]);
    this.scene.background = new THREE.Color("#1d2132");

    this.onMove = this.onMove.bind(this);
    this.restart = this.restart.bind(this);

    this.event = createInputEvents(this.container);
  }

  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    );
    return { width: height * this.camera.aspect, height };
  }

  setSize(width: number, height: number) {
    this.renderer.setSize(width, height, false);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  tick() {
    if (this.disposed) return;
    if (resizeRendererToDisplaySize(this.renderer)) {
      console.log("need to resize");
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  }

  restart() {
    this.topSpheres.clean();
    this.bottomSpheres.clean();
    this.topSpheres.init();
    this.bottomSpheres.init();
  }

  onMove({ event }: { event: MouseEvent }) {
    let mouse = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };

    this.topSpheres.onMouseMove(mouse);
    this.bottomSpheres.onMouseMove(mouse);
  }

  dispose() {
    this.disposed = true;
    this.event.disable();
    // this.scene.dispose();
  }

  init() {
    this.tick();

    this.topSpheres.init();
    this.bottomSpheres.init();
    this.scene.add(this.bottomSpheres);
    this.scene.add(this.topSpheres);

    this.topSpheres.rotation.y = Math.PI / 2;
    this.topSpheres.position.x = Math.PI / 2;

    this.bottomSpheres.rotation.y = Math.PI / 2;
    this.bottomSpheres.rotation.x = Math.PI;
    this.bottomSpheres.position.x = Math.PI / 2;

    this.event.on("move", this.onMove);
  }

  update() {
    let time = this.clock.getElapsedTime();
    this.topSpheres.update(time);
    this.bottomSpheres.update(-time);
  }
}

function resizeRendererToDisplaySize(renderer: THREE.Renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
