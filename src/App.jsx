import React, { useState, useEffect } from "react";
import Experience from './Experience/Experience'
import "./App.css";
import LoadingAnim from "./LoadingAnim/LoadingAnim";

export default function App() {

    const experience = new Experience()
    const resources = experience.resources
    const [loaded, setLoaded] = useState(false)
    const [endAnimation, setEndAnimation] = useState(false)

    useEffect(() => {
        resources.on('ready', () => {
            setEndAnimation(true) 
            window.setTimeout(() =>
            {
                setLoaded(true)  
            }, 500)
        })
    }, [resources])

    return (
        <div className={loaded === false ? 'App background notLoaded' : 'App background loaded'}>
                <div className={endAnimation === false ? 'loadingAnim notLoaded' : 'loadingAnim loaded'}>
                    {<LoadingAnim />}
                </div>
            <div className="point point-0 visible">
                <div className="label">?</div>
                <div className="text">
                    <h4>This a 3D model of the Teshima Art Museum in Japan, designed by artist Rei Naito and architect Ryue Nishizawa.<br/>The model was built in Blender and Three.js</h4>
                </div>
            </div>
            <div className='link'>
                <p>visit portfolio at {(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? <br/> : ''}<a className='textButton' href='http://emiliegauvin.com/' target="_blank"><i>emiliegauvin.com</i></a></p>
                {(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? <p className='instructions'>( one touch: move,<br/>two touches: rotate )</p> : <p>( left click: move, right click: rotate )</p>}
            </div>

    </div> 
    );
}

