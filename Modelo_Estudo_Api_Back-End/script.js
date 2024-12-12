//Api web
const urlWebApiPost = "https://api-teste-automatizados-0cb0fdf20c5b.herokuapp.com/users/register";
const urlWebApiDelete = "https://api-teste-automatizados-0cb0fdf20c5b.herokuapp.com/users/";

//Api Local
const urlApiLocalPost = "http://localhost:5000/users/register";
const urlApiLocalDelete = "http://localhost:5000/users/";
const urlApiLocalUpdate = "http://localhost:5000/users/update-name/";
const urlApiLocalGet = "http://localhost:5000/users";
const urlApiLocalAgendamentoPost = "http://localhost:5000/agendamento/agendamento";
const urlApiLocalAgendamentoDelete = "http://localhost:5000/agendamento/";
const urlLocalAgendamentoGet = "http://localhost:5000/agendamento";

//Post
document.getElementById('createUserForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = {
    nome: event.target.nome.value,
    telefone: event.target.telefone.value,
    dataNas: event.target.dataNas.value,
    email: event.target.email.value,
  };

  try {
    const response = await fetch(`${urlApiLocalPost}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });


    const result = await response.json();
    console.log('Usuario criado:', result);
    location.reload();


  } catch (error) {
    console.error('Erro ao criar Usuario', error);
    alert('Erro ao criar usuario');
  }
});

// POST AGENDAMENTO
document.getElementById('createAgendamentoForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const agendamentoInput = {
    observacao: event.target.observacao.value,
    status: event.target.status.value,
    servico: event.target.servico.value
  };

  try {
    const response = await fetch(`${urlApiLocalAgendamentoPost}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agendamentoInput)
    });



    if (!response.ok) { throw new Error('Network response was not ok ' + response.statusText); }

    const data = await response.json();
    console.log('Agendamento criado:', data);


    const mensagemSucesso = document.getElementById('mensagemSucesso');
    mensagemSucesso.style.display = 'block';
    mensagemSucesso.innerText = 'Agendamento Criado com Sucesso'

    event.target.reset();
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    alert('Erro ao criar agendamento: ' + error.message);
  }
});

// DELETE AGENDAMENTO
document.getElementById('deleteAgendamentoForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nome = event.target.servicoDelete.value;
  console.log('Serviço Deletado com sucesso', servico);

  try {
    const response = await fetch(`${urlApiLocalAgendamentoDelete}${nome}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    console.log('Usuario deletado com sucesso', result);

    const mensagemSucesso = document.getElementById('mensagemSucesso');
    mensagemSucesso.style.display = 'block';
    mensagemSucesso.innerText = 'Agendamento Criado com Sucesso';

    location.reload();
  } catch (error) {
    console.error('Erro ao deletar Serviço:', error);
    alert('Erro ao deletar Serviço')
  }
});










//Delete
document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nome = event.target.nomeDelete.value;
  console.log('Nome to delete:', nome);
  try {
    const response = await fetch(`${urlApiLocalDelete}${nome}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    console.log('Usuário deletado:', result);
    location.reload();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    alert('Erro ao deletar usuário.');
  }
});
















//Path (Update)
document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const currentName = event.target.nomeAtual.value;
  const newName = event.target.novoNome.value;

  try {
    const response = await fetch(`${urlApiLocalUpdate}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentName, newName })
    });
    const result = await response.json();
    console.log('Usuário atualizado:', result);
    location.reload();
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    alert('Erro ao atualizar usuário.');
  }
});

//Get Cliente
async function fetchUsers() {
  try {
    const response = await fetch(urlApiLocalGet);
    const users = await response.json();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `
      Nome: ${user.nome}, 
      Função: ${user.funcao}, 
      Salário: ${user.salario},
      Email: ${user.email},
      Empresa: ${user.empresa}`
      userList.appendChild(listItem);
    });

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

//GET AGENDAMENTO
async function fetchAgendamento() {
  try {
    const response = await fetch(urlLocalAgendamentoGet);
    const agendamentos = await response.json();  // Corrigi o nome da variável para 'agendamentos'
    const agendamentoList = document.getElementById('agendamentoList');  // Corrigi o nome da variável para 'agendamentoList'
    agendamentoList.innerHTML = '';  // Certifique-se de limpar a lista antes de preenchê-la

    agendamentos.forEach(agendamento => {
      const listItem = document.createElement('li');
      listItem.textContent = `
      Observação: ${agendamento.observacao},
      Status: ${agendamento.status},
      Serviço: ${agendamento.servico}`;
      agendamentoList.appendChild(listItem);  // Certifique-se de adicionar o item à lista correta
    });
  } catch (error) {
    console.error('Erro ao buscar Serviço', error);
  }
}










window.addEventListener('load', () => {
  fetchAgendamento();
  fetchUsers();
});
