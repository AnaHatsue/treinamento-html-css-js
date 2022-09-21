//Forma tradicional de declarar função
function linguagem() {
    //Variáveis:
    var a; //O var quase não é mais utilizado, porém permite que a variável seja declarada e depois inicializadas.
    let b; 
    const c = 5; //Essa é uma variável constante e não é possível alterar o seu valor depois. E já precisa ser inicializada.

    //Valores:
    let numero = 0;
    let boleano = true;
    let texto = '';
    let data = new Date(); //Data de hoje.

    //Tipos:
    typeof numero;
    typeof boleano;
    typeof texto;
    typeof data;

    //Operadores:
    numero =='0'; //Compara o valor final da variável.
    numero === 0; //Compara o valor e o tipo da variável.
    !boleano; //falso
    data > new Date(2022, 01, 01);

    //null e indefined
    let indefinido; 
    let nulo = null;
    typeof indefinido; //Se a variável não tiver o tipo e nem o valor definido, retornará indefined.
    typeof nulo; //Mas se tiver pelo menos o tipo definido, mas sem valor será null.

    //Arrays e Objetos
    let lista = []; //Quando interagir com lista é sempre "[]".
    let objeto = {}; //Quando interagir com objeto é sempre ".campo".

    //laços e blocos de execução
    for (let i = 0; i < lista.length; i++) {
        console.log(lista[i]);
    }

    //foreach
    for (const item of lista) {
        console.log(item);
    } //Sempre melhor escolher fazer um foreach porque ele faz o mesmo que o for sem precisar criar variáveis "i", "j", "k", etc.

    //while
    while(false) {}

    //do while
    do {} while (false);

    //forEach do objeto array
    lista.forEach ((item) => { //Pode funcionar como um foreach, mas é um método da lista que leva como parâmetro uma variável, a qual receberá o item da array.
        console.log(item);
    }) //"=>": Arrow function.

    // if e else
    if (lista) console.log('array'); //Quando escritos em uma única linha, não precisa colocar chaves. Esse tipo de código é estranho, mas o if analisará a lista se ela estiver defined e retornará um valor booleano.
    else console.log('objeto'); 

    if (objeto) { //Mas em blocos, precisa das chaves.
        console.log('objeto');
    } else {
        console.log('vazio');
    }

    // switch case
    let x = 1
    switch (x) {
        case 1:
            console.log('1');
            break;
        default:
            console.log('desconhecido');
    }

    //ternário
    true ? 'verdadeiro' : 'falso';
}

function soma(num1, num2) {
    return num1 + num2;
}

//Funções
const funcao = function() {
    linguagem();
}

/**
 * Envia dados para API
 * @param {{ tipo: number; nome: string }} novaSubmissao
 * @returns {Promise<{ tipo: number; nome: string }>} Nova submissão
 */
 const postData = (novaSubmissao) =>
 fetch(`http://localhost:3000/submissoes`, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(novaSubmissao),
 })
   .then((response) => response.json())
   .catch((err) => console.error(err));

/**
 * Consulta dados na API
 * @returns {Promise<{ tipo: number; nome: string }[]>} Lista de submissões
 */
 const getData = () => 
 fetch('http://localhost:3000/submissoes')
   .then(response => response.json())
   .catch(err => console.error(err));

/**
 * Adiciona item na lista do html
 * @param {{ tipo: number; nome: string }} item
 * @param {HTMLUListElement} ulEl 
 */
 const addListItem = (item, ulEl) => {
    const liEl = document.createElement("li");
    liEl.innerText = `${item.nome} - Tipo: ${item.tipo}`;
    ulEl.appendChild(liEl);
  } 

/**
 * Adiciona lista de submits consultada
 * @param {HTMLUListElement} ulEl 
 */
 const addSubmits = async (ulEl) => {
    // Trabalhando com promises usando async/await
    const result = await getData();
  
    // Se result existir e tiver elementos no array
    if (result && result.length)
    result.forEach((item) => addListItem(item, ulEl));
  }

/** Executa o submit do formulário da página
* @param {Event} event Evento de submit
*/
//Arrow Function
const funcao2 = () => {
    funcao();
}

var square = function(numero) {return numero * numero}; 
var x = square(4) //Funções são declarações também, então é permitido que isso aconteça e x receberá valor 16.

//Orientação à eventos / Callback
document.addEventListener('DOMContentLoaded', function(){
    console.log('ola mundo'); //Essa função fica assistindo/listening o evento acontecer.
});
  
//   function onSubmit(event) {
//     event.preventDefault(); //Evita que a página carregue cada vez que submite o formulário.
//     console.log(event);
//     console.log('submetido');
//   }

/**
 * Executa o submit do formulário da página
 * @param {Event} event Evento de submit
 */
 const onSubmit = (event) => {
    event.preventDefault();
    const ulEl = document.querySelector('.main ul');
  
    if (ulEl) {
      const submitedValue = {
        nome: event.target.nome.value,
        tipo: event.target.tipo.value,
      };
      // Trabalhando com promises sem uso do async/await
      postData(submitedValue).then((novaSubmissao) => {
        addListItem(novaSubmissao, ulEl);
      });
    }
  };

/**
* executa após carregamento do conteúdo do DOM
*/
const onLoad = () => {
    const footerEl = document.querySelector('.footer p');
    const formEl = document.querySelector('form');
    const ulEl = document.querySelector(".submits ul");
    // verifica o elemento buscado
    if (footerEl)
        footerEl.innerHTML += ` - ${new Date().getFullYear()}`;
    // verifica o elemento buscado
    if (formEl) formEl.addEventListener('submit', onSubmit);
    // verifica o elemento buscado
    if (ulEl)
    addSubmits(ulEl);
    // remove evento do documento
    document.removeEventListener('DOMContentLoaded', onLoad);
};
// adiciona evento no documento
document.addEventListener('DOMContentLoaded', onLoad);