import '../style/hero.css'
import orq from '../assets/foto_Orquestra.jpg'


function Hero() {
    return(
        <div id='container-hero'>
            <img src={orq} alt="foto aleatoria da orquestra" />
            <div className='container'>
                <h1>Orquestra Filarmônica do CEFEC</h1>
                <p>Música como instrumento de transformação social</p>
                <button>Um pouco sobre nós</button>
            </div>
            
        </div>
    )
}

export default Hero