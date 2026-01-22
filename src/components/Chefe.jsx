import "../style/chefe.css";

function Chefe() {
  const chefes = [
    {
      imgChefe: "src/assets/musicosChefes/jojo.jpg",
      nome: "Joenderson Batista",
      instrumentoChefe: "dos Violinos",
      redeSocial: "joenderson_4040",
    },
    {
      imgChefe: "src/assets/musicosChefes/edrielson.jpeg",
      nome: "Edrielson Nunes",
      instrumentoChefe: "das Violas",
      redeSocial: "Edrielson_19",
    },
    {
      imgChefe: "src/assets/musicosChefes/alan.jpeg",
      nome: "Alan Pereira",
      instrumentoChefe: "dos Violoncelos",
      redeSocial: "allanpereiraof",
    },
    {
      imgChefe: "src/assets/musicosChefes/allyson.jpeg",
      nome: "Allyson Medalha",
      instrumentoChefe: "do Sopro",
      redeSocial: "allysonkgm",
    },
    {
      imgChefe: "src/assets/musicosChefes/matheus.jpg",
      nome: "Matheus Olegário",
      instrumentoChefe: "da Base",
      redeSocial: "matheus.h.olegario",
    },
    {
      imgChefe: "src/assets/musicosChefes/dudu.jpg",
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
