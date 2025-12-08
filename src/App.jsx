import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Agenda from './components/Agenda'
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


      <section id="Agenda">
        <Agenda/>
      </section>

    </div>
  )
}

export default App
