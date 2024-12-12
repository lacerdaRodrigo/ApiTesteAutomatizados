describe('POST /login', () => {

    it('login na sessao', () => {

        const login = {
            name: 'Login Teste Não Delete',
            email: 'login@gmail.com',
            password: 'Pwd123'
        }

        cy.postLogin(login)
            .then(Response => {
                expect(Response.status).to.eq(200)
                expect(Response.body.name).to.eq(login.name)
                expect(Response.body.message).to.eq('Você está autenticado')
                expect(Response.body.token).not.to.be.empty
            })
    })

    it('login com senha invalida', () => {

        const login = {
            email: 'teste@gmail.com',
            password: 'Pwd123456'
        }

        cy.postLogin(login)
            .then(Response => {
                expect(Response.status).to.eq(422)
                expect(Response.body.message).to.eq('Senha invalida')
            })
    })

    it('login com email invalida', () => {

        const login = {
            email: 'teste1@gmail.com',
            password: 'Pwd123'
        }

        cy.postLogin(login)
            .then(Response => {
                expect(Response.status).to.eq(422)
                expect(Response.body.message).to.eq('Não há usuario cadastrado com este e-mail')
            })
    })

})

Cypress.Commands.add('postLogin', (login) => {
    cy.api({
        url: '/users/login',
        method: 'POST',
        body: login,
        failOnStatusCode: false
    }).then(Response => { return Response })
})