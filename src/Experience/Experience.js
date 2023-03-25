import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import PointerEvents from './Utils/PointerEvents'
import World from './World/World.js'
import Resources from './Utils/Resources'
import sources from './World/sources.js'
import Debug from './Utils/Debug'
import Stats from 'stats.js'

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance
        }
        instance = this

        //Global acces
        window.experience = this

        //Stats, run 'npm install --save stats.js'
        this.statsActive = window.location.hash === '#stats'
        if (this.statsActive) {
            this.stats = new Stats()
            this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(this.stats.dom)
        }

        // Fullscreen
        window.addEventListener('dblclick', () => {
            const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
            if (!fullscreenElement) {
                if (canvas.requestFullscreen) { canvas.requestFullscreen() }
                else if (canvas.webkitRequestFullscreen) { canvas.webkitRequestFullscreen() }
            }
            else {
                if (document.exitFullscreen) { document.exitFullscreen() }
                else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
            }
        })

        //Options
        this.canvas = canvas

        //Set up
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.pointerEvents = new PointerEvents()
        this.pointer = this.pointerEvents.pointer
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)

        this.world = new World()

        //Sizes resize events
        this.sizes.on('resize', () => {
            this.resize()
        })

        //Time tick event
        this.time.on('tick', () => {
            this.update()
        })

        this.pointText()
    }

    pointText() {
        this.pointPosition = new THREE.Vector3(-37.14, 0.72, 29.12)
        this.raycaster = new THREE.Raycaster()
        
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        if (this.statsActive) this.stats.begin()

        this.camera.update()
        this.renderer.update()

        const screenPosition = this.pointPosition.clone()
        screenPosition.project(this.camera.instance)

        this.raycaster.setFromCamera(screenPosition, this.camera.instance)
        const intersects = this.raycaster.intersectObjects(this.scene.children, true)

        if (intersects.length === 0) {
            document.querySelector('.point-0').classList.add('visible')
        }
        else {
            const intersectionDistance = intersects[0].distance
            const pointDistance = this.pointPosition.distanceTo(this.camera.instance.position)
            const pointIntersectionDistance = this.pointPosition.distanceTo(intersects[0].point)


            if (intersectionDistance < pointDistance) {
                document.querySelector('.point-0').classList.remove('visible')
            }
            else if (pointIntersectionDistance > intersectionDistance) {
                document.querySelector('.point-0').classList.remove('visible')
            }
            else {
                document.querySelector('.point-0').classList.add('visible')
            }

        }
        const translateX = screenPosition.x * this.sizes.width * 0.5
        const translateY = - screenPosition.y * this.sizes.height * 0.5
        document.querySelector('.point-0').style.transform = `translateX(${translateX}px) translateY(${translateY}px)`



        if (this.statsActive) this.stats.end()
    }
}
