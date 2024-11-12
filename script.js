const webUrl = "https://api-teste-automatizados-0cb0fdf20c5b.herokuapp.com/users/register"


document.getElementById('createUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
      nome: event.target.nome.value,
      funcao: event.target.funcao.value,
      salario: event.target.salario.value
    };
    try {
      const response = await fetch(webUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log('Usuario criado:', result);
      alert('Usuario Criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar Usuario', error);
      alert('Erro ao criar usuario');
    }
});

document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nome = event.target.nomeDelete.value;
  console.log('Nome to delete:', nome);
  try {
      const response = await fetch(`https://api-teste-automatizados-0cb0fdf20c5b.herokuapp.com/users/${nome}`, {
          method: 'DELETE'
      });
      const result = await response.json();
      console.log('Usuário deletado:', result);
      alert('Usuário deletado com sucesso!');
  } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário.');
  }
});
