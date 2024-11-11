const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  };
  
  const renderPokemon = async (pokemon, nameElement, numberElement, imageElement, inputElement) => {
    nameElement.innerHTML = 'Loading...';
    numberElement.innerHTML = '';
  
    const data = await fetchPokemon(pokemon);
    if (data) {
      imageElement.style.display = 'block';
      nameElement.innerHTML = data.name;
      numberElement.innerHTML = data.id;
      imageElement.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      inputElement.value = '';
    } else {
      imageElement.style.display = 'none';
      nameElement.innerHTML = 'Not found :c';
      numberElement.innerHTML = '';
    }
  };
  
  const setupPokedex = (nameId, numberId, imageId, inputId, formId, prevId, nextId) => {
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
      renderPokemon(input.value.toLowerCase(), pokemonName, pokemonNumber, pokemonImage, input);
    });
  
    buttonPrev.addEventListener('click', () => {
      if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon, pokemonName, pokemonNumber, pokemonImage, input);
      }
    });
  
    buttonNext.addEventListener('click', () => {
      searchPokemon += 1;
      renderPokemon(searchPokemon, pokemonName, pokemonNumber, pokemonImage, input);
    });
  
    renderPokemon(searchPokemon, pokemonName, pokemonNumber, pokemonImage, input);
  };
  
  // Inicializando as duas Pokédex
  setupPokedex('pokemonName1', 'pokemonNumber1', 'pokemonImage1', 'input1', 'form1', 'btnPrev1', 'btnNext1');
  setupPokedex('pokemonName2', 'pokemonNumber2', 'pokemonImage2', 'input2', 'form2', 'btnPrev2', 'btnNext2');