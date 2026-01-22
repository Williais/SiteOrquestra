import '../style/chefe.css'

function Chefe() {
    return(
        <div className='container'>
            <div className='header-chefe'>
                <p>SOLISTAS PRINCIPAIS</p>
                <h1>Chefes de Naipe</h1>
            </div>

            <div className="body-chefe">
                <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                
                    <div className="containe-chefe">
                        <div className="img">

                        </div>

                        <h3 className="nome">Nome do Músico</h3>
                        <p className="instrumento">Violino Principal</p>

                    </div>
                </a>
            </div>

        </div>
    )
}

export default Chefe