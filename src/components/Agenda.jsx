import '../style/agenda.css'

function Agenda() {
    return(
        <div>
            <div className="header-agenda">
                <h1>Agenda de Concertos</h1>
            </div>

            <div className="container-agenda">
                <div className='container-data'>
                    <h1>13</h1>
                    <h3>DEZ</h3>
                    <p>19:30</p>
                </div>

                <div className="container-infos">
                    <h1 className="title">11º Concerto da OFC</h1>
                    <p className="local"><strong>Local:</strong> Rua do CEFEC, Marcos Moura - Paraíba</p>
                    <p className="programa"><strong>Programação:</strong> Músicas natalinas e Clássicos Nordestina</p>
                </div>
            </div>
        </div>
    )
}

export default Agenda