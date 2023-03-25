import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import { MapControls } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/examples/jsm/controls/OrbitControls.js';
import Experience from "./Experience";



export default class Camera {
    constructor() {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.pointerEvents = this.experience.pointerEvents
        this.pointer = this.experience.pointer
        this.time = this.experience.time

        this.setInstance()
        this.setOrbitControls()

        this.controls.addEventListener("change", (e) => this.change())

    }

    change() {
        var minPan = new THREE.Vector3(- 22, 0.6, - 18);
        var maxPan = new THREE.Vector3(20, 0.4, 18);
        var _v = new THREE.Vector3();

        _v.copy(this.controls.target);
        this.controls.target.clamp(minPan, maxPan);
        _v.sub(this.controls.target);
        this.instance.position.sub(_v);
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            1000)
        this.instance.position.set(-2, 0.5, -0.3)
        this.scene.add(this.instance)

        this.resize()
    }

    setOrbitControls() {
        this.controls = new MapControls(this.instance, this.canvas)
        this.controls.panSpeed = 15
        this.controls.rotateSpeed = 0.5
        this.controls.enableZoom = false
        this.controls.target.set(0, 0.7, 0);

        this.controls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        if (this.controls) this.controls.update()
    }
}

