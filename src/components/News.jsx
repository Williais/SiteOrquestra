import '../style/news.css'

function News() {
    return(
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
                    <div className="new">
                        <div className="img-news">
                        <p>Notícias</p>
                        </div>
                        <p className='subtitle'>Institucional</p>
                        <h3 className="title">Abertura da Temporada 2025</h3>
                        <p className='texto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor adipisci a ipsam quae autem aspernatur explicabo pariatur quia sequi?</p>

                        <a className='saiba-mais' href="#" target="_blank">Saiba Mais</a>
                    </div>

                    <div className="new">
                        <div className="img-news">
                        <p>Notícias</p>
                        </div>
                        <p className='subtitle'>Novidade</p>
                        <h3 className="title">Novo Spalla da Orquestra</h3>
                        <p className='texto'>Na última semana, nossos alunos tiveram a oportunidade única de aprender técnicas avançadas com </p>

                        <a className='saiba-mais' href="#" target="_blank">Saiba Mais</a>
                    </div>

                    <div className="new">
                        <div className="img-news">
                        <p>Notícias</p>
                        </div>
                        <p className='subtitle'>Novidade</p>
                        <h3 className="title">Novo Spalla da Orquestra</h3>
                        <p className='texto'>Na última semana, nossos alunos tiveram a oportunidade única de aprender técnicas avançadas com </p>

                        <a className='saiba-mais' href="#" target="_blank">Saiba Mais</a>
                    </div>
                </div>

                
            </section>
        </div>
    )

}

export default News