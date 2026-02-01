import { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
                const { data, error } = await supabase.from('musicos').select('*');
                if (error) throw error;

                const dadosOrdenados = data.sort((a, b) => {
                    const pesoA = pesosInstrumentos[a.instrumento] || 99;
                    const pesoB = pesosInstrumentos[b.instrumento] || 99;
                    return pesoA !== pesoB ? pesoA - pesoB : a.nome.localeCompare(b.nome);
                });
                setListaMusicos(dadosOrdenados);
            } catch (error) {
                console.error("Erro ao buscar músicos:", error);
            }
        };
        fetchMusicos();
    }, []);

    const handleScroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -320 : 320;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="musicos-section">
            <div className="musicos-header">
                <div className="divider-gold"></div>
                <h2>Nossos Virtuosos</h2>
                <p className="subtitle">A alma da orquestra</p>
            </div>
            
            <div className="carousel-container">
                <button className="nav-btn left" onClick={() => handleScroll('left')}>
                    <ChevronLeft size={40} strokeWidth={1} />
                </button>
                
                <div className="track-musicos" ref={carouselRef}>
                    {listaMusicos.map((musico, index) => (
                        <div className="card-musico" key={musico.id || index}>
                            <div className="card-inner">
                                <div className="moldura-foto">
                                    {musico.imagem_url 
                                        ? <img src={musico.imagem_url} alt={musico.nome} /> 
                                        : <div className="placeholder-img">♪</div>
                                    }
                                </div>
                                <div className="info-musico">
                                    <h4>
                                        <a 
                                            href={musico.social ? `https://instagram.com/${musico.social.replace('@', '').replace('https://instagram.com/', '')}` : '#'} 
                                            target='_blank' 
                                            rel="noreferrer"
                                            className={!musico.social ? 'disabled-link' : ''}
                                        >
                                            {musico.nome} <span className="sobrenome">{musico.sobrenome}</span>
                                        </a>
                                    </h4>
                                    <span className="instrumento">{musico.instrumento}</span>
                                    {musico.ano_inicio && <span className="ano">Desde {musico.ano_inicio}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <button className="nav-btn right" onClick={() => handleScroll('right')}>
                    <ChevronRight size={40} strokeWidth={1} />
                </button>
            </div>
        </section>
    )
}

export default Musicos;