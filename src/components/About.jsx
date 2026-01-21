import '../style/about.css'
import sadraque from '../assets/IMG_1135.JPG'

function About() {
    return(
        <div className='content'>
            <section className='maestro' >
                <div className="img-sadraque">
                    <img src={sadraque} alt="Foto do Maestro Sadraque" width={250}/>
                </div>
                <div className="frase-box">
                    <p id='frase'>"A música não é apenas arte, é cidadania."</p>
                    <p id='nome-frase'>- Maestro Sadraque Barreto</p>
                </div>
            </section>

            <section className='sobre'>
                <p id='quem-somos'>QUEM SOMOS</p>
                <h1>Nascidos do sonho <span>de transformar.</span></h1>

                <p className='texto-Sobre'>Maestro, produtor cultural e multi-instrumentista (teclado, sanfona e violão), Sadraque Barreto é referência na Paraíba. Pós-graduado em Regência, Neurociências e Gestão, lidera a Orquestra Filarmônica do CEFEC e é Produtor do regional Lageiro Seco.
                    <br />
                    <br /> 
                Idealizador do Ponto de Cultura Palco Zé Ataíde e Campeão Nacional de Composição (2021), atua hoje como Diretor do Núcleo de Artes de Santa Rita. Sua trajetória une excelência técnica e impacto social, formando cidadãos através da arte.
                </p>

                <a href="https://www.instagram.com/maestrosadraque/" target='_blank' id='conheca-link'> CONHEÇA MAIS <span> → </span></a>

            </section>
        </div>
    )
}

export default About