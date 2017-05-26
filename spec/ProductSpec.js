
describe("Product", function(){
  var product

  beforeEach(function() {
      product = new Product({
        brand: "Sunset & Spring",
        name: "High/Low Maxi Dress",
        price: {
          original: 195,
          sale: 145
        },
        color:[
          {Black: "https://images.bloomingdales.com/is/image/BLM/products/2/optimized/9497962_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"},
          {Coral: "https://images.bloomingdales.com/is/image/BLM/products/3/optimized/9497963_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"},
          {Blue: "https://images.bloomingdales.com/is/image/BLM/products/6/optimized/9497966_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"}
        ],
        size: ["2S", "3M", "4L"]
      });
  });

  it("Brand is required", function() {
    product.unset("brand");
    expect(product.isValid()).toBeFalsy();
    product.set("brand", "Rag & Bone")
    expect(product.isValid()).toBeTruthy();
  });

  it("Name is required", function() {
    product.unset("name");
    expect(product.isValid()).toBeFalsy();
    product.set("name", "Super cute dress")
    expect(product.isValid()).toBeTruthy();
  });

  it("Sale price should be less than original", function(){
    expect(product.isValid()).toBeTruthy();
    product.attributes.price.original = 20;
    product.attributes.price.sale = 40;
    expect(product.isValid()).toBeFalsy();
  });

  it("getSizeInput should include the correct sizes", function() {
    product.attributes.price.original = 0;
    product.attributes.price.sale = 0;
    expect(product.isValid()).toBeFalsy();
  })

  it("getColorInput method should return a string", function() {
    var string = product.getColorInput([1, 2, 3])
    expect(typeof string).toEqual("string");
  });

});
