const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  };

  // Função para renderizar o Pokémon e exibir suas informações
  const renderPokemon = async (pokemon, nameElement, numberElement, imageElement, inputElement, statsElements) => {
    nameElement.innerHTML = 'Loading...';
    numberElement.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);
    if (data) {
      imageElement.style.display = 'block';
      nameElement.innerHTML = data.name;
      numberElement.innerHTML = data.id;
      imageElement.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  
      // Atualizando os stats
      const stats = data.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
      }, {});
  
      // Exibindo os stats na tela
      statsElements.hp.innerHTML = stats.hp || 'N/A';
      statsElements.attack.innerHTML = stats.attack || 'N/A';
      statsElements.defense.innerHTML = stats.defense || 'N/A';
      statsElements.spAttack.innerHTML = stats['special-attack'] || 'N/A'; // Sp. Attack
      statsElements.spDefense.innerHTML = stats['special-defense'] || 'N/A'; // Sp. Defense
      statsElements.speed.innerHTML = stats.speed || 'N/A'; // Speed
  
      inputElement.value = '';
    } else {
      imageElement.style.display = 'none';
      nameElement.innerHTML = 'Not found :c';
      numberElement.innerHTML = '';
    }
  };
  
  // Função para configurar a Pokédex
  const setupPokedex = (nameId, numberId, imageId, inputId, formId, prevId, nextId, statsElements) => {
    const pokemonName = document.getElementById(nameId);
    const pokemonNumber = document.getElementById(numberId);
    const pokemonImage = document.getElementById(imageId);
    const input = document.getElementById(inputId);
    const form = document.getElementById(formId);
    const buttonPrev = document.getElementById(prevId);
    const buttonNext = document.getElementById(nextId);
    
    let searchPokemon = 1;
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      renderPokemon(input.value.toLowerCase(), pokemonName, pokemonNumber, pokemonImage, input, statsElements);
    });
  
    buttonPrev.addEventListener('click', () => {
      if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon, pokemonName, pokemonNumber, pokemonImage, input, statsElements);
      }
    });
  
    buttonNext.addEventListener('click', () => {
      searchPokemon += 1;
      renderPokemon(searchPokemon, pokemonName, pokemonNumber, pokemonImage, input, statsElements);
    });
  
    renderPokemon(searchPokemon, pokemonName, pokemonNumber, pokemonImage, input, statsElements);
  };
  
  // Elementos da primeira Pokédex
  const stats1 = {
    hp: document.getElementById('pokemonHP1'),
    attack: document.getElementById('pokemonAttack1'),
    defense: document.getElementById('pokemonDefense1'),
    spAttack: document.getElementById('pokemonSpAttack1'),
    spDefense: document.getElementById('pokemonSpDefense1'),
    speed: document.getElementById('pokemonSpeed1')
  };
  
  // Elementos da segunda Pokédex
  const stats2 = {
    hp: document.getElementById('pokemonHP2'),
    attack: document.getElementById('pokemonAttack2'),
    defense: document.getElementById('pokemonDefense2'),
    spAttack: document.getElementById('pokemonSpAttack2'),
    spDefense: document.getElementById('pokemonSpDefense2'),
    speed: document.getElementById('pokemonSpeed2')
  };
  
  // Inicializando as duas Pokédex com seus respectivos stats
  setupPokedex('pokemonName1', 'pokemonNumber1', 'pokemonImage1', 'input1', 'form1', 'btnPrev1', 'btnNext1', stats1);
  setupPokedex('pokemonName2', 'pokemonNumber2', 'pokemonImage2', 'input2', 'form2', 'btnPrev2', 'btnNext2', stats2);
