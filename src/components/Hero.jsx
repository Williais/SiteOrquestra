import '../style/hero.css'
import orq from '../assets/Gemini_Generated_Image_2nthbv2nthbv2nth.png'


function Hero() {
    return(
        <div id='container-hero' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${orq})`}}>

            <div className='container'>
                <h1>Orquestra Filarmônica do CEFEC</h1>
                <p>Música como instrumento de transformação social</p>
                <button>Um pouco sobre nós</button>
            </div>
            
        </div>
    )
}

export default Hero