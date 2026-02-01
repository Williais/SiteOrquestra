import { useState, useEffect } from 'react'
import '../style/hero.css'

import foto01 from '../assets/fotoCarrossel/foto01.png'
import foto02 from '../assets/fotoCarrossel/foto02.jpg'
import foto03 from '../assets/fotoCarrossel/foto03.jpg'
import foto04 from '../assets/fotoCarrossel/foto04.JPG'
import foto05 from '../assets/fotoCarrossel/foto05.jpeg'

const localImagem = [foto01, foto02, foto03, foto04, foto05]

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const intervalo = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % localImagem.length)
        }, 5000)

        return () => clearInterval(intervalo)
    }, [])

    return(
        <div id='container-hero'>
            <div className='container'>
                <div className="title-wrapper">
                    <h1 className='title-bold'>MÚSICA</h1>
                    <h1 className='transforma'>TRANSFORMA</h1>
                    <h1 className='title-bold'>VIDAS</h1>
                </div>

                <div className="text-container">
                    <div className="gold-line"></div>
                    <p className='text'>
                        A Orquestra Filarmônica do CEFEC une a excelência artística ao impacto social no coração da Paraíba.
                    </p>
                </div>
            </div>

            <div className='hero-image-placeholder'>
                {localImagem.map((imagem, index) => (
                    <img 
                        key={index} 
                        src={imagem} 
                        alt={`Orquestra CEFEC destaque ${index}`} 
                        className={`slide-image ${index === currentIndex ? 'active' : ''}`} 
                    />
                ))}
                
                <div className="pelicula-fosca"></div>
            </div>
        </div>
    )
}

export default Hero