import '../style/about.css'
import sadraque from '../assets/IMG_1135.JPG'
import jojo from '../assets/ImagemJojo.JPG'

function About() {
    return(
        <div className='container-main'>
            
            <div className='content-maestro'>
                <div className='maestro-visual'>
                    <div className="img-moldura">
                        <img src={sadraque} alt="Maestro Sadraque Barreto" />
                    </div>
                    <div className="assinatura-maestro">Maestro Sadraque</div>
                </div>

                <div className='maestro-info'>
                    <span className="label-cargo">DIREÇÃO ARTÍSTICA & REGÊNCIA</span>
                    <h1 className="titulo-maestro">
                        Sadraque Barreto
                        <span>A visão por trás da música</span>
                    </h1>

                    <p className='texto-bio'>
                        Maestro, produtor cultural e multi-instrumentista, Sadraque é referência na música paraibana. Pós-graduado em Regência e Neurociências, ele lidera a Orquestra Filarmônica do CEFEC com uma filosofia única: a excelência técnica deve caminhar lado a lado com o impacto social.
                        <br /><br />
                        Idealizador do Ponto de Cultura Palco Zé Ataíde e Campeão Nacional de Composição (2021), sua batuta não rege apenas notas, mas constrói cidadania.
                    </p>

                    <div className="citacao-box">
                        <p className="citacao-texto">"A música não é apenas arte para ser ouvida, é uma ferramenta poderosa para transformar realidades."</p>
                    </div>
                </div>
            </div>

            <div className='content-spalla'>
                <div className="spalla-wrapper">
                    <div className="spalla-info">
                        <span className="label-cargo">SPALLA & LÍDER DE NAIPE</span>
                        <h2 className="spalla-titulo">
                            Joenderson <span>Batista</span>
                        </h2>
                        
                        <p className="texto-spalla">
                            O primeiro violino não é apenas um solista; é a voz que unifica as cordas. Como Spalla da OFC, Joenderson traz virtuosismo e uma liderança silenciosa e precisa.
                            <br /><br />
                            Sua trajetória, iniciada em 2018, é marcada por uma transição apaixonada do violão para o violino clássico. Hoje, ele personifica a disciplina e a emoção que a orquestra busca transmitir em cada concerto.
                        </p>

                        <span className="destaque-instrumento">Violino I • Desde 2018</span>
                    </div>

                    <div className="spalla-visual">
                        <img src={jojo} alt="Spalla Joenderson Batista" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About