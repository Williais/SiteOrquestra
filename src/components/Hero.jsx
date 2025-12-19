import '../style/hero.css'

function Hero() {
    return(
        <div id='container-hero'>
            <div className='container'>
                <p className='title-bold'>MÚSICA</p>
                <p className='transforma'>TRANSFORMA</p>
                <p className='title-bold'>VIDAS</p>

                <p className='text'>A Orquestra Filarmônica do CEFEC une a excelência artística ao impacto social no coração da Paraíba.</p>
            </div>

            <div className='hero-image-placeholder'>
                <span>Orchestral Silhouette</span> 
            </div>
            
        </div>
    )
}

export default Hero