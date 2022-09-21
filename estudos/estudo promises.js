//PROMISES SÃO EVENTOS ASSÍNCRONOS, OS QUAIS AINDA IRÃO ACONTECER. UMA PROMESSA. UTILIZA A FUNÇÃO CALLBACK DENTRO DA FUNÇÃO THEN OU ASYNC/AWAIT.

//Cenário: João quer fazer brigadeiro mas não tem leite condensado. Precisa comprar na padaria antes de fazê-lo.

function comprarLeiteCondensado() {
    console.log("João está indo na padaria comprar leite condensado.");
    return new Promise((resolve, reject) => {
        //Determina o tempo de 5seg que João irá levar até João comprar leite condensado.
        //Cria mensagens para confirmar cenários true e false.
        setTimeout(() => {
            const mensagemTrue = "João retornou da padaria.";
            const mensagemFalse = "João sofreu um acidente a caminho da padaria.";
            resolve(mensagemTrue);
            // reject(mensagemFalse);
        }, 5000);
        })
}

function fazerBrigadeiro() {
    //Emite mensagem confirmando que fará o brigadeiro.
    console.log("Fazendo brigadeiro.");
}


//Fetch API
function comprarLeiteCondensadoEFazerBrigadeiroFetchAPI() {
    comprarLeiteCondensado()
        .then((mensagemTrue) => {
            //A função then aponta que se a promise for executada com a mensagemTrue, então poderá fazer brigadeiro. 
            console.log(mensagemTrue);
            fazerBrigadeiro();
    })
    .catch((mensagemFalse) => console.log(mensagemFalse))
        //A função catch serve para apontar o reject do promise. Irá printar a mensagemFalse da função comprarBrigadeiro.
        .finally(() => console.log("Script concluído."))
        //A função finally termina a execução da Promise.
}

// comprarLeiteCondensadoEFazerBrigadeiroFetchAPI();

//Resultado1: No console o João vai a padaria comprar o leite condensado, começa a fazer o brigadeiro e depois retorna a padaria. 
//Isso acontece porque está configurado o TimeOut, mas o sistema não espera o tempo necessário para o tempo terminar, ele dá seguimento às demais funções.
//A promise tem como objetivo fazer o sistema esperar o término dessa condição para depois continuar a executar o código. Será adicionada.

//Resultado2: Adiconada a promise na função comprarBrigadeiro, com uma ação para resolve e o reject. Quando essa função for chamada ela terá um comportamento no then(resolve) e chamará a outra função fazerBrigadeiro OU terá um comportamento no catch(reject). Já o finally é para demonstrar a conclusão da promise.

async function comprarLeiteCondensadoEFazerBrigadeiroAsyncAwait() {
    try {    
        //O statement try tenta realizar a função comprarLeite e se der certo irá printar o resolve que está armazenado na variável "retorno" e consequentemente irá chamar a função fazerBrigadeiro.
        const retorno = await comprarLeiteCondensado();
        console.log(retorno);
        fazerBrigadeiro();
    } catch (erro) {
        //O statement catch é o mesmo que a função, ele cria uma variável "erro" para armazenar o comportamento do reject e "erro" será printado.
        console.log(erro);
    } console.log("Script concluído.")
    //Esse é o finally.
    
}

comprarLeiteCondensadoEFazerBrigadeiroAsyncAwait()