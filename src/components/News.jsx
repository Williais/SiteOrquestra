import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../style/news.css';

function News() {
    const [noticias, setNoticias] = useState([]);

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

    return (
        <section className='news'>
            
            <div className="container-noticias">
                {noticias.map((item) => (
                    <div className="new" key={item.id}>
                        <div className="img-news" style={{ backgroundImage: `url('${item.imagem_url}')`, backgroundSize: 'cover' }}>
                            {!item.imagem_url && <p>Notícias</p>}
                        </div>

                        <p className='subtitle'>{item.tema}</p>
                        <h3 className="title">{item.titulo}</h3>

                        <div 
                            className='texto' 
                            dangerouslySetInnerHTML={{ __html: item.texto_html }} 
                        />

                        <a className='saiba-mais' href="#">Saiba Mais</a>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default News;