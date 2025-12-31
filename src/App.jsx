import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Agenda from './components/Agenda'
import Musicos from './components/Musicos'
import Galeria from './components/Galeria'
import Footer from './components/Footer'
import Doc from './components/Doc'
import './App.css'


function App() {

  return (
    <div className="App">
      <Header />

      <section id="Hero">
        <Hero />
      </section>

      <section id="About">
        <About />
      </section>

      <section id="Musicos">
        <Musicos />
      </section>

      <section id="Agenda">
        <Agenda />
      </section>

      <section id="Agenda">
        <Doc />
      </section>

      <section id="Galeria">
        <Galeria />
      </section>

      <Footer/>
    </div>
  )
}

export default App
