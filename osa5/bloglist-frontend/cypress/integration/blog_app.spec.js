describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testikäyttäjä',
      username: 'testaaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('logged in as Testikäyttäjä')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('väärä')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({username:'testaaja',password: 'salainen'})
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('testiblogi')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('testiurl')
      cy.get('#create-button').click()
      cy.contains('Added "testiblogi" by testikirjoittaja')
    })

    it('A blog can be liked', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('testiblogi')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('testiurl')
      cy.get('#create-button').click()
      cy.contains('title: testiblogi').parent().as('blogElement')
      cy.get('@blogElement').find('button').click()
      cy.get('@blogElement').contains('likes: 0')
      cy.get('@blogElement').contains('like').click()
      cy.get('@blogElement').contains('likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('testiblogi')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('testiurl')
      cy.get('#create-button').click()
      cy.contains('title: testiblogi').parent().as('blogElement')
      cy.get('@blogElement').find('button').click()
      cy.get('@blogElement').contains('delete').click()
      cy.get('html').should('not.contain', 'title: testiblogi')
    })

    it.only('Blogs are in descending order based on likes', function() {
      cy.createBlog('testiblogi1','testi','testi')
      cy.createBlog('testiblogi2','testi','testi')
      cy.createBlog('testiblogi3','testi','testi')

      cy.contains(`title: testiblogi1`).parent().contains('view').click()
      cy.contains(`title: testiblogi2`).parent().contains('view').click()
      cy.contains(`title: testiblogi3`).parent().contains('view').click()

      for (let i = 0; i < 1; i++){
        cy.contains(`title: testiblogi1`).parent().contains('like').click()
      }

      for (let i = 0; i < 3; i++){
        cy.contains(`title: testiblogi2`).parent().contains('like').click()
      }

      for (let i = 0; i < 5; i++){
        cy.contains(`title: testiblogi3`).parent().contains('like').click()
      }
      cy.get('#blogs').children().first().contains(`title: testiblogi3`)
      cy.get('#blogs').children().last().contains(`title: testiblogi1`)
    })
  })
})