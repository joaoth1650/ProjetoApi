const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const btnAll =document.getElementById('btn-all');
const content = document.getElementById('content');

const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");

const fetchApi = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
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



const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Origem',
  episode: 'Episódios',
}

// const proximaURL = (url) => {
//   url.split('')
//   let urlNum = parseInt(url[40] + url[41])
//   let copcop = urlNum + 1
//   url = `https://rickandmortyapi.com/api/episode/${copcop}`
//   console.log(url)
// }

const funcao_clicou_no_botao = async (url, next=undefined, back=undefined) => {
  let result = await fetchApiEpisode(url)
  const personag = result.characters.join('\r\n\n')
  console.log({next}, {back})
  if(next === undefined && back === undefined){
    console.log({linkEpisodios})
    let
    // quem é o proximo ou anterior
    next = `${proximo}`;
    back = `${anterior}`;
  }
  
  Swal.fire({
    html: `<div class="px-4 m-4 nav-sweet"><img src="RMapi.png"></div>
           <div class="p-4 bg-do-sweet" id="sweet-content"><h2> Name: ${result.name}</h2>
           <h2> Personagens: ${personag}</h2>
           <h2> Lançamento:${result.air_date}</h2>
           <h2> Temporada: ${result.episode}</h2>
           
           <br>
           
           <img src="thumb.jpg" class="m-2"style="width:400px; height="130px">
           </div>
           <div class="footer-sweet row">
           <span class="btn btn-primary col-2 d-grid gap-2 d-md-block" id="anterior" onclick="funcao_clicou_no_botao('${back}')">Episódio Anterior</span>
           <div class="col-8"></div>
           <span class="btn btn-primary col-2 d-md-flex justify-content-md-end" id="proximo" onclick="funcao_clicou_no_botao('${next}')">Próximo Episódio</span>
           
           </div>`,
    width:'50%',
  })
}

const linkEpisodios = [];

const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key))
  .map((elem) => {
    const content2 = document.getElementById('eps');
    content2.innerHTML = ""
    if(elem.checked == true && (Array.isArray(result[elem.name])) == true){
      const arrayResult = result[elem.name];
      linkEpisodios.push(...arrayResult)
      arrayResult.map((re,index) => {
        const newElem = document.createElement('span');
        const letra = re.replace('https://rickandmortyapi.com/api/episode/', 'ep ');
        newElem.className = 'btn btn-primary m-3 p-3 rounded-circle p-3';
        newElem.innerHTML = `${letra}`; //replace
        newElem.dataset.link = re;
        let next = arrayResult[index + 1]
        let back = arrayResult[index - 1]
        newElem.onclick = function() { 
          funcao_clicou_no_botao(re, next, back)
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

btnGo.addEventListener('click', async (event) => { //usando async para deixar assíncrono e ser entendido em tempo diferente do demais codigo  
  event.preventDefault(); // preservar os dados na tela 

  if(characterId.value === ''){
    return content.innerHTML = 'É necessário fazer um filtro.';
  }
  const result = await fetchApi(characterId.value); //await para ficar de acordo com o assincronismo  

  if(content.firstChild === null){ // primeiroFilho 
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`; // adicionando uma classname ao pai de content e ajustando no css
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
// const buttons = document.getElementBytagName("button"); buttons('eps');
// buttons.className = 'btn btn-primary';