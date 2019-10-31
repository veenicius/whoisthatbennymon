const pokeImageSelector = document.querySelector("img");
const pokeButtonSelector = document.querySelectorAll("#pokeButtons");
const rightSelector = document.querySelector("#acertos");
const wrongSelector = document.querySelector("#erros");
var bar = document.getElementById("timer");
function progressBar() {
  var animate = setInterval(function() {
    bar.value -= 10;

    if (bar.value == 0) {
      wrong++;
      wrongSelector.innerHTML = "Erros: " + wrong;
      bar.value = bar.max;
      getPokemonList();
      clearInterval(animate);
    }
  }, 1000);
}
var rightPoke = [];
score = 0;
wrong = 0;

rightSelector.innerHTML = "Acertos: " + score;
wrongSelector.innerHTML = "Erros: " + wrong;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

async function getPokemonList() {
  var pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, {
    params: { limit: 964 }
  });
  choosePokemons(pokemons);
  progressBar();
}

function getRandomPokemon(api) {
  return api.data.results[Math.floor(Math.random() * api.data.results.length)];
}

async function choosePokemons(api) {
  let choices = new Set([]);

  while (choices.size < 4) {
    const pokemon = getRandomPokemon(api);
    choices.add(pokemon);
  }

  let arr = [...choices];
  arr[Math.floor(Math.random() * arr.length)];

  renderPokemons(arr);
}

async function renderPokemons(pokes) {
  shuffle(pokes);
  rightPoke = pokes[Math.floor(Math.random() * pokes.length)];
  let rightName = rightPoke.name;
  let rightPhoto = await axios.get(rightPoke.url).then(function(response) {
    pokeImageSelector.setAttribute("src", response.data.sprites.front_default);
  });

  for (i = 0; i < pokes.length; i++) {
    pokeButtonSelector[i].innerHTML = pokes[i].name;
  }
}

function checkChoice(value) {
  if (value == rightPoke.name) {
    score++;
    rightSelector.innerHTML = "Acertos: " + score;
    getPokemonList();
    bar.value = bar.max;
  } else {
    wrong++;
    wrongSelector.innerHTML = "Erros: " + wrong;
    getPokemonList();
    bar.value = bar.max;
  }
}
