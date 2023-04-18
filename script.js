const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const btnAll =document.getElementById('btn-all');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');

const fetchApi = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
  .then((res) => res.json()) // res = response/ responder em json
  .then((data) => {
    console.log(data); // data = dado
    return data;
  });

  return result;
}

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Planeta de origem',
  episode: 'Episódios',
}

const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key))
    .map((elem) => { // utilizando map para separar cada key  do array keys
      if(elem.checked == true && (Array.isArray(result[elem.name])) == true){
        const arrayResult = result[elem.name].join('\r\n');
        console.log(arrayResult);
        const newElem = document.createElement('p'); // criando um paragrafo no html em seguida utilizando DOM/innerHTML 

        newElem.innerHTML = `${newKeys[elem.name]}: ${arrayResult}`;// alimentando o paragrafo com a chave selecionada e o resultado da array dada l29
  
        content.appendChild(newElem); // pendurar um filho no content (criando uma tag dentro da tag content)
      } else if(elem.checked == true && (elem.name == 'origin')){ // se checar que foi selecionado o elemento 'origin'
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`; 
        content.appendChild(newElem);
      } else if(elem.checked == true && typeof(result[elem.name]) !== 'object'){ // typeof para vereficar o tipo do resultado que esta sendo entregue para nao ter que determinar cada chave 
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`;
        content.appendChild(newElem); 
      }
    });
}

btnGo.addEventListener('click', async (event) => { //usando async para deixar assíncrono e ser entendido em tempo diferente do demais codigo  
  event.preventDefault(); // preservar os dados na tela 

  if(characterId.value === ''){
    return content.innerHTML = 'É necessário fazer um filtro.';
  }
  const result = await fetchApi(characterId.value); //await para ficar de acordo com o assincronismo  

  if(content.firstChild === null){ // primeiroFilho 
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`; // .src faz image ser alimentado pelo src da api 
    buildResult(result);
  } else {
    content.innerHTML = '';
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
  }
});

btnReset.addEventListener('click', () => location.reload()); // reflash na pagina usando botao limpar (location.reload())

btnAll.addEventListener('click', (event) => {
    event.preventDefault();
    for(let __key of keys){
    checkboxes = document.getElementsByName(__key);
    for(var checkbox of checkboxes){
      checkbox.checked = true;
    }
  }
});