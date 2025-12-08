import '../style/about.css'
import sadraque from '../assets/IMG_1135.JPG'
import Musicos from './Musicos'

function About() {
    return(
        <div className='content'>
            <section className='sobre'>
                <div className='sobre-orquestra'>
                    <h1>Sobre a Orquestra</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ut nulla eveniet, beatae, qui architecto mollitia neque sequi sint obcaecati deserunt veniam corrupti similique iure accusamus quae vitae quaerat ipsam?</p>

                </div>

                <div className='historia-projeto'>
                    <div className="nossa-historia">
                        <h2>Nossa História</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim impedit ducimus minus quo voluptate libero illum voluptatum architecto iste praesentium. <br/><br/>Molestias atque ratione maxime consequatur ea asperiores voluptatum fugit? Fugiat.</p>
                    </div>
                    <div className="projeto-cefec">
                        <h2>Um Projeto Cefec</h2>
                        <p>A Orquestra Filarmônica do CEFEC é o braço cultural do <a href='https://cefecpb.com.br' target="_blank">Centro de Formação Educativo Comunitário (CEFEC)</a>. Nascemos do desejo de usar a música clássica e popular como ferramenta de inclusão, educação e desenvolvimento humano.</p>
                        <button>Conheça a ONG</button>
                    </div>   
                </div>
                <div className="maestro">
                    <div className="img-maestro">

                    <img src={sadraque} width={250} alt="foto do maestro" />
                    </div>
                    <div className="info-maestro">
                        <h1>O Maestro</h1>
                        <h3>Sadraque Barreto</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod debitis minus temporibus cupiditate quos saepe dolore dignissimos. Optio quis architecto esse, eius temporibus atque voluptate necessitatibus ab eum molestiae!
                            <br/>
                            <br/>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quod debitis minus temporibus cupiditate quos saepe dolore dignissimos.
                        </p>
                    </div>
                </div>
                <Musicos/>
            </section>
        </div>
    )
}

export default About