import { useState } from 'react'
import '../style/footer.css'


function Footer() {

    const [isOpen, setIsOpen] = useState(false)
    
        const toggleMenu = () => {
            setIsOpen(!isOpen)
        }

    return (
        <div>
            <section className='container-footer'>
                <div className="content-footer">
                    <div className="main">
                        <h1>ORQUESTRA <br/>FILARMÔNICA<span>do</span>CEFEC</h1>

                        <p className='texto'>Um projeto de excelência artística e impacto social.</p>

                        <p>R. Governador João Agripino - Santa Rita, PB</p>
                        <p>(83) 98654-4963</p>
                        <p>ofcoficial@gmail.com</p>
                    </div>
                    <div className="explorar">
                        <h4>EXPLORAR</h4>
                        <ul>
                            <li><a href="#Hero" onClick={toggleMenu}>A Orquestra</a></li>
                            <li><a href="#About" onClick={toggleMenu}>Nossos Músicos</a></li>
                            <li><a href="#Agenda" onClick={toggleMenu}>Concertos</a></li>
                            <li><a href="#Galeria" onClick={toggleMenu}>Galeria</a></li>
                            <li><a href="https://cefecpb.com.br" onClick={toggleMenu} target='_blank'>CEFEC</a></li>
                        </ul>
                    </div>
                    <div className="social">
                        <h4>SOCIAL</h4>
                        <ul>
                            <li><a href="https://www.instagram.com/orquestracefec/" target="_blank">Instagram</a></li>
                            <li><a href="http://" target="_blank">Youtube</a></li>
                            <li><a href="https://www.instagram.com/maestrosadraque/" target="_blank">Instagram (Maestro Sadraque)</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="descricao">
                    <p>© 2026 Orquestra Filarmônica do CEFEC</p>
                    <p>Desenvolvido por: <a className='link-will' href="https://github.com/Williais" target='_blank'>Willian Padilha</a></p>
                </div>
            </section>
        </div>
    )
}

export default Footer