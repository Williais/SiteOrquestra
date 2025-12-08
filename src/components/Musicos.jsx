import { useEffect, useState, useRef } from 'react'
import { SquareArrowLeft, SquareArrowRight } from 'lucide-react'
import '../style/musicos.css'

function Musicos() {
    const [listaMusicos, setListaMusicos] = useState([])
    const carouselRef = useRef(null)
    const pesosInstrumentos = {
        "Violino": 1,
        "Violino I": 1,
        "Violino II": 1,
        "Viola": 2,
        "Violoncelo": 3,
        "Contrabaixo": 4,
        "Baixo-Eletrico": 5,
    };

    useEffect(() => {
        const fetchMusicos = async () => {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbxLTKS7DDidv7fPjWGo8iV7gEpRfmIDujMmvIO67HntCY-6gjJqumW7mDLb7TdHPVTE/exec')
                const data = await response.json()

                const dadosOrdenados = data.sort((a, b) => {
                    const pesoA = pesosInstrumentos[a.instrumento] || 99;
                    const pesoB = pesosInstrumentos[b.instrumento] || 99;

                    if (pesoA !== pesoB) {
                        return pesoA - pesoB;
                    }
                    return a.nome.localeCompare(b.nome);
                });

                console.log("LISTA ORDENADA:", dadosOrdenados);
                setListaMusicos(dadosOrdenados)

            } catch (error) {
                console.error("Erro ao buscar músicos:", error);
            }
        }
        fetchMusicos()
    }, [])

    const handleScrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    }

    const handleScrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    }

    return (
        <div>
            <div className="musicos">
                <h2>Nossos Músicos</h2>
                
                <div className="headerMusicos">
                    <div className="setas" onClick={handleScrollLeft}> 
                        <SquareArrowLeft size={32} cursor="pointer" /> 
                    </div>
                    <div className="container-musicos" ref={carouselRef}>
                        {listaMusicos.map((musico, index) => {
                            return (
                                <div className="musico" key={index}>
                                    <div className="circulo-musico">
                                        {(musico.foto && musico.foto !== 'Sem Foto') 
                                            ? <img src={musico.foto} alt={`Foto de ${musico.nome}`} /> 
                                            : 'Músico'
                                        }
                                    </div>
                                    <h4>
                                        <a 
                                            href={'https://www.instagram.com/' + musico.social.replace('@', '')} 
                                            target='_blank' 
                                            rel="noreferrer"
                                        >{musico.nome} {musico.sobrenome}</a>
                                    </h4>
                                    <p>{musico.instrumento}</p>
                                    <p>Desde {musico.ano}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="setas" onClick={handleScrollRight}> 
                        <SquareArrowRight size={32} cursor="pointer" /> 
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Musicos