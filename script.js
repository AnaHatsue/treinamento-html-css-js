/**
 * Consulta dados na API
 * @returns {Promise<{ tipo: number; nome: string }[]>} Lista de submissões
 */

//  const getDataMock = () => 
//  fetch('http://localhost:3000/submissoes')
//    .then(response => response.json())
//    .catch(err => console.error(err));

//RESCRITA DO CÓDIGO

const getData = () => {
    return fetch('http://localhost:3000/submissoes', {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}


/**
 * Envia dados para API
 * @param {{ tipo: number; nome: string }} novaSubmissao
 * @returns {Promise<{ tipo: number; nome: string }>} Nova submissão
 */

//  const postDataMock = (novaSubmissao) => //Como não está entre chaves, ele já retorna o fetch automaticamente. Se colocar entre chaves precisa adicionar o return.


//  //Fetch tem um argumento obrigatório que é o local do recurso a ser adquirida. E retornará uma promessa se a aquisição foi bem sucedida ou não (response e catch).
//  fetch(`http://localhost:3000/submissoes`, {

//  //O método de requisição HTTP é o que indica qual ação será executada com a API. Nesse caso será o método de postagem.
//  method: "POST",

//  //Os cabeçalhos HTTP passam informaões entre o cliente e servidor, com informações adicionais ou respostas. Nesse caso ele manda um arquivo json sem qualquer novo conteúdo, porque ele será mandado no body.
//    headers: {
//      "Content-Type": "application/json",
//    },

// //No body são enviadas as informações necessárias para o POST. Nesse caso o parâmetro novaSubmissao foi transformado em objeto para ser postado na API.
//    body: JSON.stringify(novaSubmissao),
//  })
 
//  //O HTTp tem alguns códigos de resposta. A confirmação é código 200; 500 Erro interno no servidor; 400 Tem alguma coisa errada na requisição.
//    .then((response) => response.json())
//    .catch((err) => console.error(err));




//REESCRITA DO CÓDIGO

const postData = (novaSubmissao) => {
    return fetch('http://localhost:3000/submissoes',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(novaSubmissao),
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}


/**
 * Função que cria itens da lista no index.html.
 * @param {{ tipo: number; nome: string }} item
 * @param {HTMLOListElement} elementoLista 
 */

//  const addListItemMock = (item, ulEl) => {
//     const liEl = document.createElement("li");
        //"li" significa item de lista. Nesse caso ele está criando um novo <li> no html.
//     liEl.innerText = `${item.nome} - Tipo: ${item.tipo}`;
//     ulEl.appendChild(liEl);
//  }

//REESCRITA DO CÓDIGO

const addListItem = (item, elementoLista) => {
    const itemLista = document.createElement("li");
    itemLista.innerText = `${item.nome} - Tipo ${item.tipo}`;
    elementoLista.appendChild(itemLista);
}


/**
 * Função para adicionar lista de submits na página.
 * @param {HTMLOListElement} elementoLista 
 */

// const addSubmitsMock = async (elementoLista) => {
//     //Essa função assíncrona consulta na API para fazer a lista de submits e espera a resposta.
//     const result = await getData();
  
//     // Se a consulta der certo (200) e tiver dados (> 0) irá realizar a iteração.
//     if (result && result.length)

//     //O forEach passa por todos os elementos de result e coloca na variável item. Depois ele chama a função addListItem para adicionar esses items no html.
//     result.forEach((item) => addListItem(item, elementoLista));
// }

//REESCRITA DO CÓDIGO

const addSubmits = async (elementoLista) => {
    const result = await getData();
    if (result && result.length) {
        result.forEach((item) => {
            addListItem(item, elementoLista);
        })
   }
}

  
/**
 * Executa o submit do formulário da página
 * @param {Event} event Evento de submit
 */
 const onSubmit = (event) => {
    //Para evitar que a página carregue novamente ao enviar o formulário:
    event.preventDefault(); 

    //Ele procura dentro do html o trecho ".main ol" e armazena em elementoLista.
    const elementoLista = document.querySelector('.main ol');
  
    //
    if (elementoLista) {
      const submitedValue = {
        nome: event.target.nome.value,
        tipo: event.target.tipo.value,
      };
      // Trabalhando com promises sem uso do async/await
      postData(submitedValue).then((novaSubmissao) => {
        addListItem(novaSubmissao, elementoLista);
      });
    }
  };

/**
* executa após carregamento do conteúdo do DOM
*/
const onLoad = () => {
    const footerEl = document.querySelector('.footer p');
    const formEl = document.querySelector('form');
    const elementoLista = document.querySelector(".submits ol");
    // verifica o elemento buscado
    if (footerEl){
        footerEl.innerHTML += ` - ${new Date().getFullYear()}`;
    }
    
    // verifica o elemento buscado
    if (formEl) formEl.addEventListener('submit', onSubmit);
    
    // verifica o elemento buscado
    if (elementoLista) {
        addSubmits(elementoLista);
    }
    
    // remove evento do documento
    document.removeEventListener('DOMContentLoaded', onLoad);
};


// PRIMEIRA LINHA DE CÓDIGO EXECUTADA NA PÁGINA.
document.addEventListener('DOMContentLoaded', onLoad);