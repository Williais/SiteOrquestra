import '../style/about.css'
import sadraque from '../assets/IMG_1135.JPG'

function About() {
    return(
        <div className='content'>
            <section className='maestro' >
                <div className="img-sadraque">
                    <img src={sadraque} alt="Foto do Maestro Sadraque" width={200}/>
                </div>
                <div className="frase">
                    <p id='frase'>"A música não é apenas arte, é cidadania."</p>
                    <p id='nome-frase'>- Maestro Sadraque Barreto</p>
                </div>
            </section>

            <section className='sobre'>
                <p id=''>QUEM SOMOS</p>
                <h1>Nascidos do sonho <span>de transformar.</span></h1>

                <p className='texto-Sobre'>A Orquestra CEFEC não é apenas um    corpo artístico; é a prova viva de que a cultura pode reescrever histórias. 
                    <br />
                    <br /> 
                Integrada ao <a href="">Projeto CEFEC</a>, oferecemos formação de excelência para jovens músicos, criando pontes entre a música de concerto e a comunidade.
                </p>

                <a href=""> CONHEÇA NOSSA HISTÓRIA <span> → </span></a>

            </section>
        </div>
    )
}

export default About