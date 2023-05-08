const characterName= document.getElementById('characterName');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const btnAll =document.getElementById('btn-all');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');
const aondeImagensFicam = document.getElementById('aondeImagensFicam');
const anterior = document.getElementById("anteriorButton");
const proximoButton = document.getElementById("proximoButton");



const fetchApiNameCharacter = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/?name=${value}`)
  .then((res) => res.json()) // res = response/ responder em json
  .then((data) => {
    console.log(data); // data = dado
    return data;
  });

  return result;
}


const fetchApiEpisode = (url) => {
  const result = fetch(`${url}`)
  .then((res) => res.json()) // res = response/ responder em json
  .then((data) => {
    console.log(data); // data = dado
    return data;
  });

  return result;
}



const fetchApiAllCharacters = () => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)}`)
  .then((res) => res.json()) // res = response/ responder em json
  .then((data) => {
    console.log(data); // data = dado
    return data;
  });

  return result;
}

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Origem',
  episode: 'Episódios',
}



const funcao_clicou_no_botao = async (url, next=undefined, back=undefined) => {
  let result = await fetchApiEpisode(url)
  const personag = result.characters.join('\r\n')
  console.log({next}, {back})
  if(next === undefined && back === undefined){
    console.log({linkEpisodios})

    for (let i = 0; i < linkEpisodios.length; i++) {
      if (linkEpisodios[i] === url) {
        // proximo.disabled = true;
        next = linkEpisodios[i + 1]
        back = linkEpisodios[i - 1]
      }
    }
  }
  let meuHtml = `<div class="px-4 m-4 nav-sweet"><img src="RMapi.png"></div>`;
  
  Swal.fire({
    html: `${meuHtml}
           <div class="p-4 bg-do-sweet" id="sweet-content"><h2> Name: ${result.name}</h2>
           <h2> Personagens: ${personag}</h2>
           <h2> Lançamento:${result.air_date}</h2>
           <h2> Temporada: ${result.episode}</h2>
           
           <br>
           
           <img src="img/thumb.jpg" class="m-2 col-12">
           </div>
           <div class="footer-sweet m-3 row">
           <span class="btn btn-primary col-3" id="anteriorButton" onclick="funcao_clicou_no_botao('${back}')">Episódio Anterior</span>
           <div class="col-6"></div>
           <span class="btn btn-primary col-3" id="proximoButton" onclick="funcao_clicou_no_botao('${next}')">Próximo Episódio</span>
           
           </div>`,
    width:'55%',
    height:'30%',

  })
   if ( next===undefined ) {
    const proximoButton = document.getElementById('proximoButton');
    proximoButton.classList.add('sumiu')
    const anterior = document.getElementById('anteriorButton');
    anterior.classList.remove('col-3')
  } else if (back===undefined) {
    const anterior = document.getElementById('anteriorButton');
    anterior.classList.add('sumiu')
    const proximoButton = document.getElementById('proximoButton');
    proximoButton.classList.remove('col-3')
    
    
  }
}



const buildPesquisa = async () => {
  let opçoesCharacters = await fetchApiNameCharacter(characterName.value);
 aondeImagensFicam.innerHTML =""
  opçoesCharacters.results.map((result) => {
    const personagensResult = result.image
    let conteudo = `
      <div class= "col-lg-2">
      <img src="${personagensResult}" class="p-4 img-fluid">
      </div>
    `;
    aondeImagensFicam.innerHTML = aondeImagensFicam.innerHTML + conteudo;
    
   
  })
}

// buildPesquisa()

const linkEpisodios = [];
const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key))
  .map((elem) => {
    const content2 = document.getElementById('eps');
    content2.innerHTML = ""
    if(elem.checked == true && (Array.isArray(result[elem.name])) == true){
      const arrayResult = result[elem.name];
      linkEpisodios.push(...arrayResult)
      arrayResult.map((url,index) => {
        const newElem = document.createElement('span');
        const letra = url.replace('https://rickandmortyapi.com/api/episode/', 'ep ');
        newElem.className = 'btn btn-primary m-3 p-3 rounded-circle p-3';
        newElem.innerHTML = `${letra}`; //replace
        newElem.dataset.link = url;
        let next = arrayResult[index + 1]
        let back = arrayResult[index - 1]
        newElem.onclick = function() { 
          funcao_clicou_no_botao(url, next, back)
        };
        content2.appendChild(newElem);
      });
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

const BuildHome = async () => {
  let personagens = await fetchApiAllCharacters();

  personagens.map((personagem) => {
    const personagemImg = personagem.image
    let conteudo = `
      <div class= "col-lg-2">
      <img src="${personagemImg}" class="p-4 img-fluid">
      </div>
    `;
    aondeImagensFicam.innerHTML = aondeImagensFicam.innerHTML + conteudo;
    // aondeImagensFicam.insertAdjacentHTML('afterEnd', conteudo);
    // newElem.setAttribute("src", `${personagemImg}`);
    // aondeImagensFicam.appendChild(newElem)
  })
}

// BuildHome()



btnGo.addEventListener('click', async (event) => { //usando async para deixar assíncrono e ser entendido em tempo diferente do demais codigo  
  event.preventDefault(); // preservar os dados na tela 
  
  if(characterName.value === ''){
    return content.innerHTML = 'É necessário fazer um filtro.';
  }
  const result = await fetchApiNameCharacter(characterName.value); //await para ficar de acordo com o assincronismo  

  if(content.firstChild === null){ // primeiroFilho 
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`; // adicionando uma classname ao pai de content e ajustando no css
    buildPesquisa(result);
  } else {
    content.innerHTML = '';
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildPesquisa(result);
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
// const buttons = document.getElementBytagName("button"); buttons('eps');
// buttons.className = 'btn btn-primary';