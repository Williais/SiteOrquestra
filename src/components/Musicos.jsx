import { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { SquareArrowLeft, SquareArrowRight } from 'lucide-react';
import '../style/musicos.css';

function Musicos() {
    const [listaMusicos, setListaMusicos] = useState([]);
    const carouselRef = useRef(null);
    
    const pesosInstrumentos = {
        "Violino I": 1, "Violino II": 2, "Viola": 3, "Violoncelo": 4, "Contrabaixo": 5,
        "Baixo-Eletrico": 6, "Flauta-Transversal": 7, "Clarinete": 8, "Trombone": 9,
        "Trompete": 10, "Sax-Alto": 11, "Sax-Tenor": 12, "Regente": 0, "Spalla": 0.5
    };

    useEffect(() => {
        const fetchMusicos = async () => {
            try {
                const { data, error } = await supabase
                    .from('musicos')
                    .select('*');

                if (error) throw error;

                const dadosOrdenados = data.sort((a, b) => {
                    const pesoA = pesosInstrumentos[a.instrumento] || 99;
                    const pesoB = pesosInstrumentos[b.instrumento] || 99;

                    if (pesoA !== pesoB) {
                        return pesoA - pesoB;
                    }
                    return a.nome.localeCompare(b.nome);
                });

                setListaMusicos(dadosOrdenados);

            } catch (error) {
                console.error("Erro ao buscar músicos:", error);
            }
        };
        fetchMusicos();
    }, []);

    const handleScrollRight = () => {
        if (carouselRef.current) carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleScrollLeft = () => {
        if (carouselRef.current) carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

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
                                <div className="musico" key={musico.id || index}>
                                    <div className="circulo-musico">

                                        {(musico.foto_url) 
                                            ? <img src={musico.foto_url} alt={`Foto de ${musico.nome}`} /> 
                                            : <div style={{width:'100%', height:'100%', background:'#ddd', display:'flex', alignItems:'center', justifyContent:'center'}}>♪</div>
                                        }
                                    </div>
                                    <h4>
                                        <a 
                                            href={musico.social ? `https://instagram.com/${musico.social.replace('@', '').replace('https://instagram.com/', '')}` : '#'} 
                                            target='_blank' 
                                            rel="noreferrer"
                                            style={{ pointerEvents: musico.social ? 'auto' : 'none' }}
                                        >
                                            {musico.nome} {musico.sobrenome}
                                        </a>
                                    </h4>
                                    <p>{musico.instrumento}</p>
                                    {musico.ano && <p style={{fontSize: '0.8em', color: '#666'}}>Desde {musico.ano}</p>}
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

export default Musicos;