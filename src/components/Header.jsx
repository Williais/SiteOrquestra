import '../style/header.css'

function Header() {

    return(
        <header>
            <div>
                <a id="logo" href="/">OFC</a>
            </div>

            <nav>
                <ul>
                    <li><a href="/">Início</a></li>
                    <li><a href="/">Sobre</a></li>
                    <li><a href="/">Agenda</a></li>
                    <li><a href="/">Galeria</a></li>
                    <li><a href="/">Apoie</a></li>
                    <li><a href="/" className='demonstrativo'>Um projeto Cefec</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header