import { useState, useEffect } from 'react';
import '../style/news.css';

function News() {
    const [noticias, setNoticias] = useState([]);

    const formatarImagem = (link) => {
        if (!link) return null;
        if (typeof link !== 'string') return null;
        if (link.includes("export=view")) return link;

        const idMatch = link.match(/\/d\/(.+)\//);
        if (idMatch && idMatch[1]) {
            return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
        }
        return link;
    };

    useEffect(() => {
        const urlApi = "https://script.google.com/macros/s/AKfycbxmUDuZz2WOqNLnyEO0rKlCOSxzjW9mfDe5SKLzbPQxMzMF7I_5DFG3KGv0PJ-7MgCrWA/exec";

        fetch(urlApi)
            .then(response => response.json())
            .then(data => {

                console.log("Dados recebidos da API:", data);
                if (Array.isArray(data)) {
                    setNoticias(data);
                } else {
                    console.error("A API não retornou uma lista. Provavelmente um erro no Script:", data);
                }
            })
            .catch(error => console.error("Erro ao carregar noticias:", error));
    }, []);

    return (
        <div>
            <section className='news'>
                <div className="news-header">
                    <p className='jornal'>JORNAL DA OFC</p>
                    <div className="title-div">
                        <h1>Bastidores <span>&</span> Novidades</h1>
                        <p>SIGA NO INSTAGRAM</p>
                    </div>
                </div>

                <div className="container-noticias">
                    {noticias.length === 0 && <p style={{textAlign: 'center'}}>Carregando notícias...</p>}

                    {noticias.map((item, index) => {
                        if (!item.titulo) return null;

                        const imagemTratada = formatarImagem(item.imagem);

                        return (
                            <div className="new" key={index}>
                                <div 
                                    className="img-news" 
                                    style={imagemTratada ? { 
                                        backgroundImage: `url(${imagemTratada})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    } : {}}
                                >
                                    {!imagemTratada && <p>Notícias</p>}
                                </div>

                                <p className='subtitle'>{item.tema}</p>
                                <h3 className="title">{item.titulo}</h3>
                                <p className='texto'>{item.descricao}</p>

                                <a className='saiba-mais' href="#" target="_blank">Saiba Mais</a>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default News;