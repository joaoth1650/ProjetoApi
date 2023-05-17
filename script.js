const characterName = document.getElementById('characterName');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const btnAll = document.getElementById('btn-all');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');
const aondeImagensFicam = document.getElementById('aondeImagensFicam');
const anterior = document.getElementById("anteriorButton");
const proximoButton = document.getElementById("proximoButton");

//somente fetch abaixo //

const fetchApiNameCharacter = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/?name=${value}`)
        .then((res) => res.json()) // res = response/ responder em json
        .then((data) => {
            console.log(data); // data = dado
            return data;
        });

    return result;
}

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

const fetchApiAllCharacters = () => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)},${generateRandomInteger(800)}`)
        .then((res) => res.json()) // res = response/ responder em json
        .then((data) => {
            console.log(data); // data = dado
            return data;
        });

    return result;
}

// somente fetch acima //

// inclementos abaixo //
function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

const linkEpisodios = [];

const consultaPerson = async (id) => {
    location.href = "#selecao1";
    const result = await fetchApi(id)
    buildResult(result)
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



// inclementos acima //

const funcao_clicou_no_botao = async (url, next = undefined, back = undefined) => {
    let result = await fetchApiEpisode(url)


    let personagensIds = result.characters.map(char => char.replace('https://rickandmortyapi.com/api/character/', "https://rickandmortyapi.com/api/character/avatar/") + ".jpeg");
    console.log(personagensIds);

    let imagePerson = personagensIds.map(personagem => `<img src="${personagem}">`)


    if (next === undefined && back === undefined) {
        console.log({ linkEpisodios })

        for (let i = 0; i < linkEpisodios.length; i++) {
            if (linkEpisodios[i] === url) {
                // proximo.disabled = true;
                next = linkEpisodios[i + 1]
                back = linkEpisodios[i - 1]
            }
        }
    }
    let meuHtml = `<div class="px-4 m-4 nav-sweet"><img src="img/RMapi.png"></div>`;

    Swal.fire({
        html: `${meuHtml}
           <div class="p-4 bg-do-sweet" id="sweet-content"><h2> Name: ${result.name}</h2>
        
           <h2> Lançamento:${result.air_date}</h2>
           <h2> Temporada: ${result.episode}</h2>
           <h2> personagens:</h2> ${imagePerson}           
           <br>
           
           <img src="img/thumb.jpg" class="m-2 col-12">
           </div>
           <div class="footer-sweet mx-auto row">
           <span class="btn btn-primary col-3" id="anteriorButton" onclick="funcao_clicou_no_botao('${back}')">Episódio Anterior</span>
           <div class="col-6"></div>
           <span class="btn btn-primary col-3" id="proximoButton" onclick="funcao_clicou_no_botao('${next}')">Próximo Episódio</span>
           
           </div>`,
        width: '55%',
        height: '30%',

    })
    if (next === undefined) {
        const proximoButton = document.getElementById('proximoButton');
        proximoButton.classList.add('sumiu')
        const anterior = document.getElementById('anteriorButton');
        anterior.classList.remove('col-3')
    } else if (back === undefined) {
        const anterior = document.getElementById('anteriorButton');
        anterior.classList.add('sumiu')
        const proximoButton = document.getElementById('proximoButton');
        proximoButton.classList.remove('col-3')


    }
}


// Construção da pagina com DOM //

const buildPesquisa = async () => {
    let opçoesCharacters = await fetchApiNameCharacter(characterName.value);

    aondeImagensFicam.innerHTML = ""

    opçoesCharacters.results.map((result) => {
        const personagensResult = result.image
        const nomeDosPersonagens = result.name
        const idPersonagem = result.id
        const episodes = result.episode
        let conteudo = ""
        conteudo = `
        <div class= "mt-3 m-3 col-sm-5 col-md-3 col-lg-2 bg-dark text-white rounded">
      <span onclick="consultaPerson(${idPersonagem})"><img src="${personagensResult}" class="p-4 img-fluid"></span>
      <p>${nomeDosPersonagens}</p>
      </div>
    `;

        aondeImagensFicam.innerHTML = aondeImagensFicam.innerHTML + conteudo;

    })
}

const buildResult = (result) => {

    const origin = result.origin;
    const episodes = result.episode;
    conteinerResult.className = 'result-style';
    let conteudo = ""
    conteudo = `

    <div class="container">
        <div class="row">
                
                <div class="">
                    <img src="${result.image}" class="rounded"id="personImage">
                </div>

                 <h1 class="mt-4">${result.name}</h1>

                <div class="row">
                   
                    <h3 class="col-3">status: ${result.status}</h3>
                    <h3 class="col-3">especie: ${result.species}</h3>
                    <h3 class="col-3">genero: ${result.gender}</h3>
                    <h3 class="col-3"origem: >${origin.name}</h3>
                </div>  

            <div class="row">
              <div class="col">
                    <select class="mb-3 col form-select" onchange="funcao_clicou_no_botao(this.value)">
                        <option>selecione um episodio</option>
                        ${episodes.map(episode => `<option value="${episode}">${episode}</option>`).join('')}
                    </select>
                    
                </div>
            </div>

        </div>
    </div>
     `
    conteinerResult.innerHTML = conteudo
}

// return keys.map((key) => document.getElementById(key))
// 	.map((elem) => {
// 		const content2 = document.getElementById('eps');
// 		content2.innerHTML = ""
// 		if (elem.checked == true && (Array.isArray(result[elem.name])) == true) {
// 			const arrayResult = result[elem.name];
// 			linkEpisodios.push(...arrayResult)
// 			arrayResult.map((url, index) => {
// 				const newElem = document.createElement('span');
// 				const letra = url.replace('https://rickandmortyapi.com/api/episode/', 'ep ');
// 				newElem.className = 'btn btn-primary m-3 p-3 rounded-circle p-3';
// 				newElem.innerHTML = `${letra}`; //replace
// 				newElem.dataset.link = url;
// 				let next = arrayResult[index + 1]
// 				let back = arrayResult[index - 1]
// 				newElem.onclick = function () {
// 					funcao_clicou_no_botao(url, next, back)
// 				};
// 				content2.appendChild(newElem);
// 			});
// 		}
// 		//    else if(elem.checked == true && (elem.name == 'origin')){ // se checar que foi selecionado o elemento 'origin'
// 		//     const newElem = document.createElement('p');
// 		//     newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`; 
// 		//     content.appendChild(newElem);
// 		//   } else if(elem.checked == true && typeof(result[elem.name]) !== 'object'){ // typeof para vereficar o tipo do resultado que esta sendo entregue para nao ter que determinar cada chave 
// 		//     const newElem = document.createElement('p');
// 		//     newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`;
// 		//     content.appendChild(newElem); 
// 		//   } 
// 		// });
// 	}
// 	)

const BuildHome = async () => {
    let personagens = await fetchApiAllCharacters();

    personagens.map((personagem, index) => {

        const episodes = personagem.episode
        const personagensResult = personagem.image
        const nomeDosPersonagens = personagem.name
        const idPersonagem = personagem.id
        linkEpisodios.push(...episodes)
        let next = episodes[index + 1]
        let back = episodes[index - 1]

        let conteudo = `
        <div class= "mt-3 m-3 col-sm-5 col-md-3 col-lg-2 bg-dark text-white rounded">

       <span onclick="consultaPerson(${idPersonagem})"><img src="${personagensResult}" class="p-1 img-fluid"></span>
        <p>${nomeDosPersonagens}</p>
        </div>
      `;


        aondeImagensFicam.innerHTML = aondeImagensFicam.innerHTML + conteudo;
        // aondeImagensFicam.insertAdjacentHTML('afterEnd', conteudo);
        // newElem.setAttribute("src", `${personagemImg}`);
        // aondeImagensFicam.appendChild(newElem)
    })
}

BuildHome()

// Construção da pagina com DOM //


// addEvent click abaixo //

btnGo.addEventListener('click', async (event) => { //usando async para deixar assíncrono e ser entendido em tempo diferente do demais codigo  
    event.preventDefault(); // preservar os dados na tela 

    if (characterName.value === '') {
        return content.innerHTML = 'É necessário fazer um filtro.';
    }
    const result = await fetchApiNameCharacter(characterName.value); //await para ficar de acordo com o assincronismo  

    if (content.firstChild === null) { // primeiroFilho 
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

// btnReset.addEventListener('click', () => location.reload());


// reflash na pagina usando botao limpar (location.reload())

// btnAll.addEventListener('click', (event) => {
//     event.preventDefault();
//     for(let __key of keys){
//     checkboxes = document.getElementsByName(__key);
//     for(var checkbox of checkboxes){
//       checkbox.checked = true;
//     }
//   }
// });
// const buttons = document.getElementBytagName("button"); buttons('eps');
// buttons.className = 'btn btn-primary';


