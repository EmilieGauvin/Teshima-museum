import Experience from "../Experience";
import Model from './Model'


export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.model = new Model()
        })
    }
}




