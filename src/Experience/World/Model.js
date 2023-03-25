import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from "../Experience";
import fakeGodRayVertexShader from './shaders/fakeGodRay/vertex.glsl'
import fakeGodRayFragmentShader from './shaders/fakeGodRay/fragment.glsl'

export default class Model
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug

        //setup
        this.resources = this.experience.resources
        this.resource = this.resources.items.teshimaModel
        this.modelTexture = this.resources.items.modelTexture
        this.background1Texture = this.resources.items.background1Texture
        this.background2Texture = this.resources.items.background2Texture


        // Base
        this.baseScale = 20
        this.setModel()
    }

    setModel()
    {
        //Import model
        this.model = this.resource.scene
        this.model.position.set( 0, -0.3, 0)
        this.model.scale.set(this.baseScale, this.baseScale, this.baseScale)
        this.scene.add(this.model)

        // Baked texture
        this.modelTexture.flipY = false
        this.bakedMesh = this.model.children.find((child) => child.name === 'Floor')
        this.atticMaterial = new THREE.MeshBasicMaterial({ map: this.modelTexture })
        this.bakedMesh.material = this.atticMaterial

        // Baked texture
        this.sphereMesh = this.model.children.find((child) => child.name === 'Sphere')
        this.sphereMesh.material = this.atticMaterial

        //fakeGodRay1 Materials
        this.fakeGodRayMaterial1 = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color('#fffcf5') },
                uBlurOffset: { value: 0.90 },
                uAlphaBase: { value: 0.20 },
                uAlphaRays: { value: 0.07 },
                uFrequency: { value: 1.8 }
            }
        })
        this.fakeGodRayMesh1 = this.model.children.find((child) => child.name === 'godray1')
        this.fakeGodRayMesh1.material = this.fakeGodRayMaterial1

        //fakeGodRay1 Materials
        this.fakeGodRayMaterial2 = new THREE.ShaderMaterial({
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color('#fffcf5') },
                uBlurOffset: { value: 0.93 },
                uAlphaBase: { value: 0.10 },
                uAlphaRays: { value: 0.03 },
                uFrequency: { value: 1.8 }
            }
        })
        this.fakeGodRayMesh2 = this.model.children.find((child) => child.name === 'godray2')
        this.fakeGodRayMesh2.material = this.fakeGodRayMaterial2

        // Background 1
        this.background1Mesh = this.model.children.find((child) => child.name === 'background1')
        this.background1Material = new THREE.MeshBasicMaterial({ map: this.background1Texture })
        this.background1Mesh.material = this.background1Material

        // Background 2
        this.background2Mesh = this.model.children.find((child) => child.name === 'background2')
        this.background2Texture.repeat.set(1, 1)
        this.background2Material = new THREE.MeshBasicMaterial({ map: this.background2Texture })
        this.background2Mesh.material = this.background2Material
    }
}
