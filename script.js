//Api web
const urlWebApiPost = "https://api-teste-automatizados-0cb0fdf20c5b.herokuapp.com/users/register";
const urlWebApiDelete = "https://api-teste-automatizados-0cb0fdf20c5b.herokuapp.com/users/";

//Api Local
const urlApiLocalPost = "http://localhost:5000/users/register";
const urlApiLocalDelete = "http://localhost:5000/users/";
const urlApiLocalUpdate = "http://localhost:5000/users/update-name/";
const urlApiLocalGet = "http://localhost:5000/users";

//Post
document.getElementById('createUserForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = {
    nome: event.target.nome.value,
    telefone: event.target.telefone.value,
    dataNas: event.target.dataNas.value,
    email: event.target.email.value,
    
  };

  // if (data.nome === data.funcao) {
  //   alert('Nome não pode ser igual a função');
  //   return;
  // }
  // if (!empresa) {
  //   alert('o Campo "Empresa" e obrigatorio')
  //   return;
  // }
  // console.log('Empresa preenchida:', empresa);


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

window.onload = fetchUsers;