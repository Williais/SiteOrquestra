import '../style/agenda.css'

function Agenda() {

    const data = new Date()
    const ano = data.getFullYear()

    return(
        <div>
            <section className='container-agenda'>

                <div className="header-agenda">
                    <h1>Temporada {ano}</h1>

                    <a href="#">VER CALENDÁRIO COMPLETO</a>
                </div>

                <div className="content-agenda">

                    <div className='container-data'>
                        <h1>13</h1>
                        <h3>DEZEMBRO</h3>
                    </div>

                    <div className='img-agenda'>
                    </div>

                    <div className="container-infos">
                        <h3 className="title">Concerto Especial</h3>
                        <h2 className="programa">11º Concerto da OFC</h2>
                        <p className="local">Auditório do CEFEC, 19:30</p>
                    </div>

                    <button>DETALHES</button>

                </div>

                <div className="content-agenda">

                    <div className='container-data'>
                        <h1>25</h1>
                        <h3>DEZEMBRO</h3>
                    </div>

                    <div className='img-agenda'>
                    </div>

                    <div className="container-infos">
                        <h3 className="title">Magia Natalina</h3>
                        <h2 className="programa">Concerto Natalino</h2>
                        <p className="local">Teatro Santa Rosa, 20:00</p>
                    </div>

                    <button>DETALHES</button>

                </div>
            </section>

            
        </div>
    )
}

export default Agenda