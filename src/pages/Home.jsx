import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Agenda from '../components/Agenda'
import Musicos from '../components/Musicos'
import Galeria from '../components/Galeria'
import Footer from '../components/Footer'
import Doc from '../components/Doc'
import News from '../components/News'
import Chefe from '../components/Chefe'
import '../App.css'

function Home() {
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
        <Chefe/>
        <Musicos />
      </section>

      <section id="Agenda">
        <Agenda />
      </section>

      <section id="Doc">
        <Doc />
      </section>

      <section id="Galeria">
        <Galeria />
      </section>

      <section id="News">
        <News />
      </section>

      <Footer/>
    </div>
  )
}

export default Home;