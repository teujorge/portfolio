// https://velasquezdaniel.com/blog/rendering-100k-spheres-instantianing-and-draw-calls/

import { useEffect, useRef } from "react";
import * as THREE from "three";

let fragmentShader = `
varying vec3 vColor;
  void main(){
    vec3 color = vColor;
    gl_FragColor = vec4(color, 1.);
  }
`;

let vertexShader = `
#define PI 3.14159265359
attribute vec4 aCurve;
uniform float uTime;
uniform float uHold;
uniform vec2 uMouse;
uniform float uScale;
attribute vec3 aColor;
varying vec3 vColor;
  vec3 getCurvePosition(float progress, float radius, float offset){
    vec3 pos = vec3(0.);
    pos.x += cos(progress *PI *8.) * radius ;
    pos.y += sin(progress *PI*8. ) * radius + sin(progress * PI *2. + uTime) * 30.;
    pos.z += progress *200. - 200./2. + offset;
    return pos;
  }
  vec3 getSecondCurvePosition(float progress, float radius, float offset){
    vec3 pos = vec3(0.);
    pos.y += cos(progress * PI * 8.) * radius ;
    pos.x += sin(progress * PI * 8.) * radius  ;
    pos.z += (progress) *200.  + offset - 200./2.;
    pos = normalize(pos) * (radius );
    return pos;
  }
  vec2 getScreenNDC(vec3 pos){
    // https://stackoverflow.com/questions/26965787/how-to-get-accurate-fragment-screen-position-like-gl-fragcood-in-vertex-shader
    vec4 clipSpace = projectionMatrix* modelViewMatrix * vec4(pos, 1.);
    vec3 ndc = clipSpace.xyz / clipSpace.w; //perspective divide/normalize
    vec2 viewPortCoord = ndc.xy; //ndc is -1 to 1 in GL. scale for 0 to 1
    return viewPortCoord;
  }
  void main(){
    vec3 transformed = position.xyz;
    float aSpeed = aCurve.w;
    float aRadius = aCurve.x;
    float aZOffset = aCurve.z;
    float aProgress = mod(aCurve.y + uTime * aSpeed, 1.);
    vec3 curvePosition = getCurvePosition(aProgress, aRadius, aZOffset);
    vec3 spherePosition = mix(getSecondCurvePosition(aProgress, aRadius, aZOffset),curvePosition,  uHold);
    vec2 SphereViewportCoord =getScreenNDC( spherePosition); //ndc is -1 to 1 in GL. scale for 0 to 1
    float dist = length(uMouse - SphereViewportCoord);
    
    if(dist < 0.4){
      transformed *= 1.+ (1.-dist/0.4) *6.;
    }
    transformed *= 1.- abs(aProgress - 0.5) *2.;
    transformed *= uScale;
    transformed += spherePosition;
    gl_Position = projectionMatrix* modelViewMatrix * vec4(transformed, 1.);
    vColor = aColor;
  }
`;

const Flow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // scene
    const canvas = canvasRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // objects
    createSpheres(scene);

    camera.position.z = 5;

    // animation loop
    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  function createSpheres(scene: THREE.Scene) {
    // base geometry //

    let baseGeometry = new THREE.BufferGeometry();

    // itemSize = 3 because there are 3 values (components) per vertex
    baseGeometry.setAttribute(
      "position",
      new THREE.SphereGeometry(2, 32, 32).attributes.position
    );

    // instance and mesh //

    // instanced geometry
    let instancedGeometry = new THREE.InstancedBufferGeometry().copy(
      baseGeometry
    );
    const instances = 7000;
    instancedGeometry.instanceCount = instances;
    let material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uHold: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uScale: { value: 1 },
      },
    });

    let mesh = new THREE.Mesh(instancedGeometry, material);
    scene.add(mesh);

    // geometry attributes //

    // 1. create the values for each instance
    let aCurve = [];
    let aColor = [];
    let colors = [new THREE.Color("#ff3030"), new THREE.Color("#121214")];

    for (let i = 0; i < instances; i++) {
      let radius = Math.random() * 10 + 30;
      let zOffset = Math.random() * 10 - 5;
      let progress = Math.random();
      let speed = Math.random() * (0.07 + 0.02) - 0.02;
      aCurve.push(radius, progress, zOffset, speed);

      let color = colors[Math.round(Math.random() * (colors.length - 1))];
      aColor.push(color.r, color.g, color.b);
    }

    // 2. transform the array to float32
    let aCurveFloat32 = new Float32Array(aCurve);
    let aColorFloat32 = new Float32Array(aColor);

    // 3. create te instanced Buffer Attribute of size three
    instancedGeometry.setAttribute(
      "aCurve",
      new THREE.InstancedBufferAttribute(aCurveFloat32, 4, false)
    );
    instancedGeometry.setAttribute(
      "aColor",
      new THREE.InstancedBufferAttribute(aColorFloat32, 3, false)
    );
  }

  return (
    <canvas
      onMouseMove={() => {}}
      ref={canvasRef}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default Flow;
