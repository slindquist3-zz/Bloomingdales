

$('#next').on('click', function(e) {
	e.preventDefault()
  $('#shipaddress').show();
})

$('#finish').on('click', function() {
  $('#analyticsinfo').show();
  // Display the information picked up above.
})

$(".size-selection").on("change", function() {
	product.set("size", "make dynamic");
	console.log(product.attributes)
})

$(".color-selection").on("change", function() {
	product.set("color", "make dynamic")
	console.log(product.attributes)
})

$(".quantity-selection").on("change", function() {
	product.set("quantity", "make dynamic")
	console.log(product.attributes)
})

// ---------  MODELS -------------

//Need a userinfo model to store selections and show them at the end
var Product = Backbone.Model.extend({
  	initialize: function() {
    	console.log("A new product has been created")
    }
  })

 var product = new Product({
	 brand: "Bloomingdales",
	 name: "Strappy-back dress",
	 image: "<img src= 'https://images.bloomingdales.com/is/image/BLM/products/0/optimized/9390170_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'>"
 })

 //

 var Userinfo = Backbone.Model.extend({
	 initialize: function() {
		 console.log("User has info!")
	 }
 })

 var userinfo = new Userinfo({
 })

 // ---------  VIEWS -------------

 var ProductView = Backbone.View.extend({
	 tagName: "li",
	 render: function(){
		 this.$el.html(this.model.get("brand") +
		 		" " + this.model.get("name") +
				"<br> " + this.model.get("image"))
		 return this;
	 }
 })

 var productView = new ProductView({ el: "#product", model: product})
 productView.render()

//

 var UserinfoView = Backbone.View.extend({ el: "#selected-product", model: product})

  //create product model with size, color, quantity, price//2levels
  //create product collection
  //create product model views
  //create product collection views

  //selections need to set model attributes

  //finish button should show views of each model--even if this 	   assignment only needs one, my code should take into consideration the case that there may be more than one product on the final page

  //need to handle events when on the last page a user wants to delete an item from the collection.

  //integrate Bootstrap
