
describe("Product", function(){
  it("should return a string", function() {
    var product = new Product();
    var string = product.getColorInput([1, 2, 3])
    expect(typeof string).toEqual("string");
  })
});
