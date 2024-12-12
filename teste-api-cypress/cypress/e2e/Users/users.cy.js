
describe('POST /users', () => {


  context('validando campos obrigatorios.', () => {

    let user

    beforeEach(() => {
      user = {
        name: "Rodrigo Lacerda",
        email: "rodrigolacerda@gmail.com",
        password: "Pwd123",
        confirmpassword: "Pwd123",
        phone: "12345689",
      }
    })

    it('não digitando  nome', () => {

      delete user.name

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Nome é obrigatório.')
        })
    })

    it('não digitando  email', () => {
      delete user.email

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Email é obrigatório.')
        })
    })

    it('digitando não corretamento  o email faltando o @', () => {

      user.email = 'rodrigolacerda'

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Email inválido. Certifique-se de que ele contenha "@" e ".com".')


        })
    })

    it('digitando não corretamento  o email faltando o .com', () => {

      user.email = 'rodrigolacerda@'

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Email inválido. Certifique-se de que ele contenha "@" e ".com".')


        })
    })

    it('não digitando senha', () => {
      delete user.password

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Senha é obrigatória.')
        })
    })

    it('validando  senha com letra minuscula', () => {
      user.password = 'pwd123'

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Senha deve conter pelo menos uma letra maiúscula e um número.')
        })
    })

    it('validando  senha com numero', () => {
      user.password = '123'

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Senha deve conter pelo menos uma letra maiúscula e um número.')
        })
    })

    it('validando  confirmação de senha', () => {
      delete user.confirmpassword

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Digite a senha igual a anterior.')
        })
    })

    it('validando  telefone', () => {
      delete user.phone

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Telefone é obrigatório.')
        })
    })

    it('validando  telefone com menos de 9 digitos', () => {
      user.phone = '12345678'

      cy.postUser(user)
        .then(Response => {
          expect(Response.status).to.eq(422)
          expect(Response.body.message).to.eq('Telefone deve ter exatamente 9 dígitos.')
        })
    })

  })

  it('registrar novo usuario', () => {

    const user = {
      name: "Login Teste Não Delete",
      email: "login@gmail.com",
      password: "Pwd123",
      confirmpassword: "Pwd123",
      phone: "123456789",

    }

    cy.task('deleteUser', user.id)

    cy.postUser(user)
      .then(Response => {
        expect(Response.status).to.eq(200)
      })

  })

  it('email duplicado ', () => {

    const user = {
      name: "Rodrigo Lacerda",
      email: "teste@gmail.com",
      password: "Pwd123",
      confirmpassword: "Pwd123",
      phone: "123456789",
    }

    cy.postUser(user)

    cy.postUser(user)
      .then(Response => {
        expect(Response.status).to.eq(422)
        expect(Response.body.message).to.eq('Por Favor , Utilize outro Email. esse email Já existe na nossa base')

      })

  })

})

