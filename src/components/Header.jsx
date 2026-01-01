import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import '../style/header.css'

function Header() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header>
            <a href="#" id="logo">OFC</a>
            <ul className={isOpen ? "nav-menu active" : "nav-menu"}>

                <li><a href="#Hero" onClick={toggleMenu}>A Orquestra</a></li>
                <li><a href="#About" onClick={toggleMenu}>Nossos Músicos</a></li>
                <li><a href="#Agenda" onClick={toggleMenu}>Concertos</a></li>
                <li><a href="#Doc" onClick={toggleMenu}>Documentário</a></li>
                <li><a href="#Galeria" onClick={toggleMenu}>Galeria</a></li>
                <li><a href="#News" onClick={toggleMenu}>Noticias</a></li>
            </ul>

            <div className="hamburger" onClick={toggleMenu}>
                {isOpen ? <X size={30} color="#0f172a"/> : <Menu size={30} color="#0f172a"/>}
            </div>
        </header>
    )
}

export default Header