import "../style/chefe.css";

import imgJojo from '../assets/musicosChefes/jojo.jpg';
import imgEdrielson from '../assets/musicosChefes/edrielson.jpeg';
import imgAlan from '../assets/musicosChefes/alan.jpeg';
import imgAllyson from '../assets/musicosChefes/allyson.jpeg';
import imgMatheus from '../assets/musicosChefes/matheus.jpg';
import imgDudu from '../assets/musicosChefes/dudu.JPG';

function Chefe() {
  const chefes = [
    {
      imgChefe: imgJojo, 
      nome: "Joenderson Batista",
      instrumentoChefe: "dos Violinos",
      redeSocial: "joenderson_4040",
    },
    {
      imgChefe: imgEdrielson,
      nome: "Edrielson Nunes",
      instrumentoChefe: "das Violas",
      redeSocial: "Edrielson_19",
    },
    {
      imgChefe: imgAlan,
      nome: "Alan Pereira",
      instrumentoChefe: "dos Violoncelos",
      redeSocial: "allanpereiraof",
    },
    {
      imgChefe: imgAllyson,
      nome: "Allyson Medalha",
      instrumentoChefe: "do Sopro",
      redeSocial: "allysonkgm",
    },
    {
      imgChefe: imgMatheus,
      nome: "Matheus Olegário",
      instrumentoChefe: "da Base",
      redeSocial: "matheus.h.olegario",
    },
    {
      imgChefe: imgDudu,
      nome: "Edwardo Gomes",
      instrumentoChefe: "da Percussão",
      redeSocial: "Edwardo_gomes21",
    },
  ];

  return (
    <div className="container">
      <div className="header-chefe">
        <p>SOLISTAS PRINCIPAIS</p>
        <h1>Chefes de Naipe</h1>
      </div>

      <div className="body-chefe">
        {chefes.map((musico, index) => (
          <a
            href={"http://instagram.com/" + musico.redeSocial}
            target="_blank"
            key={index}
          >
            <div className="containe-chefe">
              <div className="img">
                <img src={musico.imgChefe} alt={`Foto de ${musico.nome}`} />
              </div>

              <h3 className="nome">{musico.nome}</h3>
              <p className="instrumento">Chefe {musico.instrumentoChefe}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Chefe;
