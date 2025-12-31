import '../style/galeria.css'

function Doc() {
    return(
        <div>
            <section className='Container-doc'>
                <div className="header-doc">
                    <div className="title">
                    <p>LANÇADO EM 2024</p>
                    <h1>A Nossa História</h1>
                    <h1>Em 8 Minutos.</h1>
                    </div>
                    <div className="descricao">
                        <p>Um registro emocionante sobre como a música transformou a vida de dezenas de jovens na Orquestra.</p>
                    </div>
                </div>

                <div className="body-doc">
                    <div className='video'><iframe width="80%" height="540" src="https://www.youtube.com/embed/BAc3McCmDYk?si=rpCS97dfKWfkFjOj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
                </div>
                <div className='descricao-video'>
                    <p>DOCUMENTÁRIO OFICIAL</p>
                    <p>DURAÇÃO: 08:00</p>
                    <p>DIRIGIDO POR <a className='link-will' href="https://www.instagram.com/willbacht/" target='_blank'>Willian Padilha</a></p>
                </div>
            </section>
        </div>
    )
}

export default Doc