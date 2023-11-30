const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (response.status === 200) {
    pokemonImage.style.display = 'block';

    const dados = await response.json();
    return dados;
  }
};
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const dados = await fetchPokemon(pokemon);
  if (dados) {
    pokemonName.innerHTML = dados.name;
    pokemonNumber.innerHTML = dados.id;
    pokemonImage.src =
      dados['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ];
    input.value = '';
    searchPokemon = dados.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = `Not Found 😵‍💫`;
    pokemonNumber.innerHTML = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

btn_next.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
btn_prev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
renderPokemon(1);
