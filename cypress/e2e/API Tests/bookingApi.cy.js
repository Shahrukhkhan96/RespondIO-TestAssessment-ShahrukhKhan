describe("Testing the create booking API", () => {
    
//Data fetching is done from fixture file
// fixture has 3 different payloads
// 1. Correct Payload
// 2. Wrong Payload as have wrong Date
// 3. Wrong Payload as first name is a Number

  let baseUrl = "https://restful-booker.herokuapp.com";
  let bookingEndPoint = "/booking";
  let updatedUrl = baseUrl + bookingEndPoint;


  
  //Create Booking with correct Payload
  it("Create booking with the correct data provided", () => {
    cy.fixture("data").then(function (data) {
      this.data = data.api;

      cy.request({
        method: "POST",
        url: updatedUrl,
        body:this.data.apiValidData,
      }).then((Response) => {
        expect(Response.status).eq(200); // assertion
        expect(Response.body.bookingid).greaterThan(1000)//Validation that new booking id is created
        expect(JSON.stringify(Response.body.booking)).eq(JSON.stringify(this.data.apiValidData))//validation of correct creation of booking
      });
    });
  });


  // Wrong Date is given in payload, 
  it("Validate booking with false date i.e changing date format to string", () => {
    cy.fixture("data").then(function (data) {
      this.data = data.api;

      cy.request({
        method: "POST",
        url: updatedUrl,
        body:this.data.apiInvalidDateData,
      }).then((Response) => {
        expect(Response.status).eq(200);
        expect(Response.body).eql("Invalid date"); // response error
      });
    });
  });



//First name is a number resulting in error
  it("Create booking with corrupted data i.e add integer in Name field", () => {
    cy.fixture("data").then(function (data) {
      this.data = data.api;

      cy.request({
        method: "POST",
        url: updatedUrl,
        body:this.data.apiNameData,
        failOnStatusCode: false,
      }).then((Response) => {
        expect(Response.status).eq(500);
        expect(Response.body).eql("Internal Server Error");
      });
    });
  });
});
