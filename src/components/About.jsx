import '../style/about.css'
import sadraque from '../assets/IMG_1135.JPG'
import jojo from '../assets/ImagemJojo.JPG'

function About() {
    return(

        <div className='container-main'>
            <div className='content-maestro'>
                <section className='maestro' >
                    <div className="img-sadraque">
                        <img src={sadraque} alt="Foto do Maestro Sadraque" width={250}/>
                    </div>
                    <div className="frase-box">
                        <p className='frase'>"A música não é apenas arte, é cidadania."</p>
                        <p className='nome-frase'>- Maestro Sadraque Barreto</p>
                    </div>
                </section>

                <section className='sobre'>
                    <p className='quem-somos titulo-com-barra-sadraque'>DIREÇÃO ARTÍSTICA</p>
                    <h1>Nascidos do sonho <span>de transformar.</span></h1>

                    <p className='texto-Sobre'>Maestro, produtor cultural e multi-instrumentista (teclado, sanfona e violão), Sadraque Barreto é referência na Paraíba. Pós-graduado em Regência, Neurociências e Gestão, lidera a Orquestra Filarmônica do CEFEC e é Produtor do regional Lageiro Seco.
                        <br />
                        <br /> 
                    Idealizador do Ponto de Cultura Palco Zé Ataíde e Campeão Nacional de Composição (2021), atua hoje como Diretor do Núcleo de Artes de Santa Rita. Sua trajetória une excelência técnica e impacto social, formando cidadãos através da arte.
                    </p>

                    <a href="https://www.instagram.com/maestrosadraque/" target='_blank' className='conheca-link'> CONHEÇA MAIS <span> → </span></a>
                </section> 

            </div>

            <div className='content-maestro reverse'>

                <section className='maestro'>
                    <div className="img-sadraque">
                        <img src={jojo} alt="Foto do Spalla Joenderson" width={250}/>
                    </div>

                    <div className="frase-box box-spalla">
                        <p className='frase'>"A música é a alma falando em segredo."</p>
                        <p className='nome-frase'>- Joenderson Batista</p>
                    </div>
                </section>

                <section className='sobre'>

                    <p className='quem-somos titulo-com-barra' id='nome-dourado'>LIDERANÇA DAS CORDAS</p>
                    
                    <h1>O Spalla <span>Joenderson</span></h1>

                    <p className='texto-Sobre'>
                        O primeiro violino não é apenas um solista; é a voz que unifica as cordas. 
                        Como Spalla da Orquestra Filarmônica do Cefec, Joenderson traz virtuosismo e liderança.
                        <br /><br /> 
                        Desde 2018, Joenderson percorreu um caminho de descoberta, migrando do violão para o violino inspirado pela genialidade de Vivaldi. A ascensão ao posto de Spalla reflete o reconhecimento do Maestro Sadraque, que viu em sua técnica desenvolvida e em sua história com a orquestra as qualidades essenciais para liderar o naipe.
                    </p>
                </section> 

            </div>


        </div>

        

        
    )
}

export default About