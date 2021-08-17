const csv = require('csvtojson');
const validateContactList = require('./utils/contactListValidation');
const generateBirthdayMessage = require('./utils/generateBirthdayMessage');
/* 
    FLUXO DE FUNCIONAMENTO DO BOT ->
  
  - Autenticação (função de login na API).

  - Procura por por aniversários.
    - Recupera a lista de aniversariantes do arquivo .csv (joga exceção se hover algum problema na operação).✔️
    - Valida se a lista de aniversariantes está com os campos corretos (nome dos campos, valores dos campos).✔️
    - Após validar que tá tudo certo, percorre o array de objetos dos aniversariantes, retornando os aniversariantes do dia ou uma mensagem caso não tenha nenhuma aniversariante. ✔️
    - Consola os dados de todas as pessoas que estão aniversariando no dia (data, nome e departamento). ✔️

  - Enviar mensagem de aniversário.
    - Verifica se a lista de aniversariantes e válida (!contacts || contacts.length < 1). ✔️
    - Analisa a quantidade de aniversariantes e envia mensagens diferentes pra uma ou mais pessoas. (if (contacts.length) === 1, else). ✔️
    - Verifica se a lista de aniversariantes está vazia antes de enviar os parabéns. ✔️
    - Pega os dados do canal/grupo e faz a requisição para enviar a mensagem.
*/

const searchBirthday = async () => {
  let contacts = await csv().fromFile(`${__dirname}/../contacts/list.csv`);
  const today = (new Date()).toLocaleDateString('pt-br', {day: '2-digit', month: '2-digit'});

  let birthdays =  contacts.filter(contact => contact.birthday === today);
  validateContactList(birthdays);

  if (birthdays.length < 1)
    return console.log("\nNão há aniversariantes no dia de hoje.\n");

  sendBirthdayMessage(birthdays);
};

const sendBirthdayMessage = (contacts) => {
  const message = generateBirthdayMessage(contacts);
  console.log(message);
};

searchBirthday();