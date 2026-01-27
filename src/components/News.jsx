import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../style/news.css';

function News() {
    const [noticias, setNoticias] = useState([]);
    const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const { data, error } = await supabase
                .from('noticias')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error("Erro:", error);
            else setNoticias(data);
        };
        fetchNews();
    }, []);

    const abrirModal = (item) => {
        setNoticiaSelecionada(item);
        document.body.style.overflow = 'hidden';
    };

    // Função para fechar o modal
    const fecharModal = () => {
        setNoticiaSelecionada(null);
        document.body.style.overflow = 'auto';
    };

    const noticiasExibidas = noticias.slice(0, 3);

    return (
        <section className='news'>
            <div className="news-header">
                <p className='jornal'>JORNAL DA OFC</p>
                <div className="title-div">
                    <h1>Bastidores <span>&</span> Novidades</h1>
                    <p><a href="https://instagram.com" target="_blank" rel="noreferrer">SIGA NO INSTAGRAM</a></p>
                </div>
            </div>

            <div className="container-noticias">
                {noticiasExibidas.length === 0 && <p>Carregando notícias...</p>}

                {noticiasExibidas.map((item) => (
                    <div className="new" key={item.id}>
                        <div className="img-news">
                            {item.imagem_url ? (
                                <img src={item.imagem_url} alt={item.titulo} />
                            ) : (
                                <div style={{width:'100%', height:'100%', background:'#eee'}}></div>
                            )}
                        </div>

                        <p className='subtitle'>{item.tema || "Geral"}</p>
                        <h3 className="title">{item.titulo}</h3>

                        <div 
                            className='texto' 
                            dangerouslySetInnerHTML={{ __html: item.texto_html }} 
                        />

                        <button className='saiba-mais' onClick={() => abrirModal(item)}>
                            Saiba Mais
                        </button>
                    </div>
                ))}
            </div>

            {noticiaSelecionada && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={fecharModal}>&times;</button>
                        
                        {noticiaSelecionada.imagem_url && (
                            <img 
                                src={noticiaSelecionada.imagem_url} 
                                alt={noticiaSelecionada.titulo} 
                                className="modal-img"
                            />
                        )}

                        <div className="modal-body">
                            <span className="modal-tema">{noticiaSelecionada.tema}</span>
                            <h2 className="modal-titulo">{noticiaSelecionada.titulo}</h2>
                            
                            <div 
                                className="modal-texto-completo"
                                dangerouslySetInnerHTML={{ __html: noticiaSelecionada.texto_html }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default News;