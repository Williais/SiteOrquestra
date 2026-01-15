import { useState, useEffect } from 'react';
import '../style/news.css';

function News() {
    const [noticias, setNoticias] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4;

    const formatarImagem = (link) => {
        if (!link || typeof link !== 'string') return null;
        const idMatch = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
        
        if (idMatch && idMatch[1]) {
            return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
        }
        
        return link;
    };

    useEffect(() => {
        const urlApi = "https://script.google.com/macros/s/AKfycbzV7iOYy-wjEKdGyD111t-cbaTWATAt_8DZgOuuzsx1RPcL4RwFW93qkfbEo0T0IRfrlg/exec";

        fetch(urlApi)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setNoticias(data);
                } else {
                    console.error("Erro na API:", data);
                }
            })
            .catch(error => console.error("Erro na requisição:", error));
    }, []);

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const noticiasAtuais = noticias.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(noticias.length / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
        document.querySelector('.news').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <section className='news'>
                <div className="news-header">
                    <p className='jornal'>JORNAL DA OFC</p>
                    <div className="title-div">
                        <h1>Bastidores <span>&</span> Novidades</h1>
                        <p><a href="https://www.instagram.com/orquestracefec/" target="_blank">SIGA NO INSTAGRAM</a></p>
                    </div>
                </div>

                <div className="container-noticias">
                    {noticias.length === 0 && <p style={{textAlign: 'center'}}>Carregando notícias...</p>}

                    {noticiasAtuais.map((item, index) => {
                        if (!item.titulo) return null;

                        const imagemTratada = formatarImagem(item.imagem);

                        return (
                            <div className="new" key={index}>
                                <div 
                                    className="img-news" 
                                    style={imagemTratada ? { 
                                        backgroundImage: `url(${imagemTratada})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    } : {}}
                                >
                                    {!imagemTratada && <p>Notícias</p>}
                                </div>

                                <p className='subtitle'>{item.tema}</p>
                                <h3 className="title">{item.titulo}</h3>
                                <p className='texto'>{item.descricao}</p>

                                <a className='saiba-mais' href="https://www.instagram.com/orquestracefec/" target="_blank">Saiba Mais</a>
                            </div>
                        );
                    })}
                </div>

                {totalPaginas > 1 && (
                    <div className="paginacao-container">
                        <button 
                            onClick={() => mudarPagina(paginaAtual - 1)} 
                            disabled={paginaAtual === 1}
                            className="btn-paginacao"
                        >
                            &lt; Anterior
                        </button>

                        {Array.from({ length: totalPaginas }, (_, i) => (
                            <button 
                                key={i + 1} 
                                onClick={() => mudarPagina(i + 1)}
                                className={`btn-paginacao numero ${paginaAtual === i + 1 ? 'ativo' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            onClick={() => mudarPagina(paginaAtual + 1)} 
                            disabled={paginaAtual === totalPaginas}
                            className="btn-paginacao"
                        >
                            Próxima &gt;
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default News;