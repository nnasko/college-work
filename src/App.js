import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [Loading, isLoading] = useState(false);
  const [pokemonInput, setPokemonInput] = useState("pikachu");
  const [types, setTypes] = useState([]);

  async function handleClick() {
    try {
      isLoading(true);
      setTypes([]);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonInput,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setName(data.name);
      setPhoto(data.sprites.front_default);
      for (let i = 0; i < data.types.length; i++) {
        setTypes((prev) => [...prev, data.types[i].type.name]);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      isLoading(false);
    }
  }

  function typesMap(types) {
    let result = "";
    for (let i = 0; i < types.length; i++) {
      result += types[i];
      if (i !== types.length - 1) {
        result += " and ";
      }
    }
    return result;
  }

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-white mb-4 text-center">
          <p className="font-bold text-lg mb-2">{name}</p>
          <img src={photo} alt={name} className="w-32 h-32 mb-4 ml-12" />
          <p className="text-sm">
            {name} is a <span className="font-bold text-violet-500"></span>{" "}
            <span className="font-bold text-violet-500">
              {typesMap(types)} {""}
            </span>
            pokemon.
          </p>
        </div>
        <input
          type="text"
          placeholder="Enter a Pokemon"
          className="bg-neutral-800 text-white p-2 rounded mb-2"
          value={pokemonInput}
          onChange={(e) => setPokemonInput(e.target.value)}
        />
        <button
          onClick={handleClick}
          disabled={Loading}
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
