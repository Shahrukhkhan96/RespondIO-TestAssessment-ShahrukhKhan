describe("Scenario based testing",()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.get('#searchbox').as('searchBar') //alias
    })
    // Searching for item and validate through product count
    it('Scenario 1: Validate Users are able to search for an item using the search bar',()=>{
    
        cy.fixture("data").then(function (data) {
        this.data = data.ui.scenario1;
        this.data.forEach(data =>{

        
                cy.get('@searchBar')
                .find('input[name="search_query"]')
                .type(data)
                
                cy.get('@searchBar').find('button').click()
        
                cy.xpath("(//div[@class='product-count'])[1]").should('contain.text',"Showing ")   //assertion
                cy.visit('/')

        })
        
    })
})


    it('Scenario 2: Validate Users are able to filter search results under Women category by Color and Category ',() =>{
        //getting data from example.json
        cy.fixture('data').then(function (data){
        this.data=data.ui.scenario2
        cy.get('#block_top_menu')
        .find('li').contains('Women')
        .click()

       cy.get('#ul_layered_category_0')
        .find('a').first().click()
        //waiting to load component
        cy.wait(5000)

        cy.get('#ul_layered_id_attribute_group_3')
        .find('a').first().click()

        cy.wait(5000)
        cy.get('#enabled_filters').should('contain.text',this.data.category)
        cy.get('#enabled_filters').should('contain.text', this.data.color)

        })
    })
    it('Scenario 3: Users are able to view the details of any clothing item from the POPULAR section and add them to the cart', ()=>{
        cy.get('.homefeatured').find('a')
        .contains('Add to cart')
        .first()
        .click()

        cy.wait(5000)
        cy.get('.icon-ok')
        .should('exist')

        cy.get('.cross').click({force:true})

        cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').should('exist')

    })
})