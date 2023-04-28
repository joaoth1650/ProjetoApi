
var array = ["https://rickandmortyapi.com/api/episode/4", "https://rickandmortyapi.com/api/episode/3","https://rickandmortyapi.com/api/episode/5"]
var string = array[1]; // acessa a primeira string no array ("foo")
var letra = string.replace('https://rickandmortyapi.com/api/episode/', 'episode '); // divide a string em um array de caracteres e acessa o segundo caractere (índice 1)
console.log(letra); // imprime "o"