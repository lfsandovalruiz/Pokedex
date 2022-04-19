import { MdOutlineCatchingPokemon } from "react-icons/md";
import { useEffect, useState } from "react";
import logo from './question-mark.png';

function Pokedex() {

  const pokeDefault = {
    name: "?",
    img: logo,
    id: "?",
    stats: {
      hp: "?",
      attack: "?",
      defence: "?",
      spAttack: "?",
      spDef: "?",
      speed: "?"
    },
    type: [{ typeName: "?", color: "#FFFFFF" }]
  }

  const [ palabra, setPalabra ] = useState("");
  const [ pokemon, setPokemon ] = useState(pokeDefault);

  // peleta de colores
  const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
  };

  const buscarPokemon = async palabra => {
    // if (palabra === "") return;

    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${palabra.toLowerCase()}`);
     
      if(respuesta.status === 200) {

        const data = await respuesta.json();

        if (data.hasOwnProperty("count")) return;

        setPokemon({
          name: data.name.toUpperCase(),
          img: data.sprites.front_default,
          id: data.id,
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defence: data.stats[2].base_stat,
            spAttack: data.stats[3].base_stat,
            spDef: data.stats[4].base_stat,
            speed: data.stats[5].base_stat
          },
          type: createTypeColors(data.types)
        });

      } else {

      }

      if(respuesta.status === 404) setPokemon(pokeDefault);


    } catch (error) {
      console.log('algo anda mal:', error);
    }

  }

  const createTypeColors = (types) => {
    return types.map((element) => {
      const typeName = element.type.name;
      const color = typeColors[typeName];
      return {typeName, color}
    });
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-screen h-screen flex justify-center items-center p-8">

      <div className="min-w-[270px] flex flex-col px-6 py-8 space-y-8 bg-[#ff1900] w-full h-full max-w-[17rem] sm:max-w-[20rem] max-h-[28rem] sm:max-h-[31rem] rounded-md drop-shadow-[2px_2px_2px_rgba(0,0,0,0.85)]">
        <div className="flex items-center w-3/5 justify-between">
          <div className="w-[3.3rem] h-[3.3rem] border-solid border-4 border-[#fffffe] rounded-full bg-[#2ae9ff]"></div>
          <div className="flex justify-between space-x-2">
            <div className="w-[1.5rem] h-[1.5rem] border-solid border-2 border-[#ffc057] rounded-full bg-[#ffe64e]"></div>
            <div className="w-[1.5rem] h-[1.5rem] border-solid border-2 border-[#898102] rounded-full bg-[#43d418] -m-0.5"></div>
          </div>
        </div>
        <div className="bg-[#35424d] w-full h-full p-[14px] pr-[16px] rounded-sm border-solid border-t-2 border-l-2 border-[#1b252d]">

          <div className="bg-white w-full after:block after:pb-[100%]">

            <div className="absolute w-[68.6%] sm:w-[75%] flex flex-col p-3">
              
              <div className="flex items-center p-2">

                <MdOutlineCatchingPokemon className="basis-1/5 w-6 h-6 text-[#6b757e]" />
                <div className="basis-basis-1/2 pr-2">
                  <input 
                    onChange={ e => setPalabra(e.target.value) }
                    value={palabra}
                    type="text"
                    className="w-full border-solid border-b-2 focus:outline-0 border-blue-600 text-xs sm:text-sm"   
                  />
                </div>
                <button 
                  onClick={() => buscarPokemon(palabra) }
                  className="basis-1/3 bg-blue-600 active:bg-blue-700 text-white p-2 text-[8px] sm:text-[12px] rounded"
                >
                  BUSCAR
                </button>
   
              </div>

              <div className="flex">

                <div className="basis-2/3 flex flex-col sm:justify-between">
                  <img
                    src={pokemon.img} 
                    alt="pokemon" 
                    className="w-[50%] sm:w-[65%] h-[50%] sm:h-[65%]" 
                  />
                  <h2 className="text-[8px] sm:text-sm text-slate-500 font-medium capitalize">#{pokemon.id}-{pokemon.name}</h2>
                  <p className="flex text-[8px] sm:text-sm">Type:</p>
                  <div className="flex flex-wrap space-x-1 text-[8px] sm:text-sm">
                    {
                      pokemon.type.map((element, index) => {
                        return (
                          <p key={index} style={{ backgroundColor: element.color }} className="capitalize rounded p-[2px]">{element.typeName}</p>
                        );
                      })
                    }
                  </div>
                </div>

                <div className="basis-1/3 flex flex-col text-[10px] sm:text-xs justify-between">
                  <h3>Base:</h3>
                  <p>Hp: {pokemon.stats.hp}</p>
                  <p>Attack: {pokemon.stats.attack}</p>
                  <p>Defense: {pokemon.stats.defence}</p>
                  <p>Sp.ATK: {pokemon.stats.spAttack}</p>
                  <p>Sp.Def: {pokemon.stats.spDef}</p>
                  <p>Speed: {pokemon.stats.speed}</p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Pokedex;
