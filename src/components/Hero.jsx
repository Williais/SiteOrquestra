import { useState, useEffect } from 'react'
import '../style/hero.css'

import foto01 from '../assets/fotoCarrossel/foto01.png'
import foto02 from '../assets/fotoCarrossel/foto02.jpg'
import foto03 from '../assets/fotoCarrossel/foto03.jpg'

const localImagem = [foto01, foto02, foto03]

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const intervalo = setInterval(() => {

            setCurrentIndex((prevIndex) => (prevIndex + 1) % localImagem.length)
        }, 4000)

        return () => clearInterval(intervalo)
    }, [])

    return(
        <div id='container-hero'>
            <div className='container'>
                <p className='title-bold'>MÚSICA</p>
                <p className='transforma'>TRANSFORMA</p>
                <p className='title-bold'>VIDAS</p>

                <p className='text'>A Orquestra Filarmônica do CEFEC une a excelência artística ao impacto social no coração da Paraíba.</p>
            </div>

            <div className='hero-image-placeholder'>
                {localImagem.map((imagem, index) => (
                    <img key={index} src={imagem} alt={`imagem ${index}`} className={`slide-image ${index === currentIndex ? 'active' : ''}`} />
                ))}

                <div className="pelicula-fosca"></div>
            </div>
        </div>
    )
}

export default Hero