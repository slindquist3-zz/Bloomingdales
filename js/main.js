

$('#next').on('click', function(e) {
	e.preventDefault()
	$("#selections").hide()
  $('#shipaddress').show();
})

$("#back1").on('click', function() {
	$("#shipaddress").hide()
	$("#selections").show()
})

$('#finish').on('click', function() {
	userinfo.set({
		address: $("#addOne").val() + " " + $("#addTwo").val(),
		city: $("#city").val(),
		state: $("#state").val(),
		zipcode: $("#zipcode").val()
	})
	console.log(userinfo.attributes)
	$("#initial").hide();
	$("#shipaddress").hide();
  $('#analyticsinfo').show();
})

$(".size-selection").on("change", function() {
	product.set(this.name, this.value);
	console.log(product.attributes)
})

$(".color-selection").on("change", function() {
	product.set(this.name, this.value)
	console.log(product.attributes)
})

$(".quantity-selection").on("change", function() {
	product.set(this.name, this.value)
	console.log(product.attributes)
})

// ---------  MODELS -------------

var Product = Backbone.Model.extend({
		defaults: {
			quantity: 1,
			price: {
				original: "",
				sale: ""
			}
		},
  	initialize: function() {
    	console.log("A new product has been created")
    }
  })

 var product = new Product({
	 brand: "Bloomingdales",
	 name: "Strappy-back dress",
	 image: "<img src='https://images.bloomingdales.com/is/image/BLM/products/0/optimized/9390170_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'>",
	 price: {
		 original: "$195",
		 sale: "$145"
	 }
 })

 var Userinfo = Backbone.Model.extend({
	 initialize: function() {
		 console.log("User has info!")
	 }
 })

 var userinfo = new Userinfo({
 })

 // ---------  VIEWS -------------

 var ProductView = Backbone.View.extend({
	 tagName: "div",
	 initialize: function(){
		 this.model.on("change", this.render, this)
	 },
	 render: function() {
		 this.$el.html(
			 	"<p>" + this.model.get("brand") + "</p>" +
		 		"<p>" + this.model.get("name") + "</p>" +
				"<p>" + "Original Price: " + this.model.get("price").original + "</p>" +
				"<p>" + "Sale: " + this.model.get("price").sale + "</p>" +
				"<p>" + this.model.get("image") + "</p>")
//how to get this view to render the new model attributes without showing these
	//values as undefined before they are set?
		 return this;
	 }
 })

 var initialProductView = new ProductView({ el: "#initial", model: product})
 initialProductView.render()
 var selectedProductView = new ProductView({ el: "#selected", model: product})
 selectedProductView.render()

 var UserinfoView = Backbone.View.extend({
	 tagName: "div",
	 initialize: function(){
		 this.model.on("change", this.render, this)
	 },
	 render: function() {
		 this.$el.html(
			  "<p>" + this.model.get("address") + "</p>" +
		 		"<p>" + this.model.get("city") + ", " + this.model.get("state") + "</p>" +
		 		"<p>" + this.model.get("zipcode") + "</p>");

		 return this;
	 }
 })

 var userinfoView = new UserinfoView({ el: "#shipping-info", model: userinfo})
 userinfoView.render()
 //There should be some way to use one function to populate my models with their attributes, because to do each
 //	one individually will make my code heavy and not very dry.

//When a user clicks next, I need to also add the product to a hypothetical Product Collection,
//  which will be populated only with this one model, but it will show that it could have others

//That Product collection view will render the modelViews


  //create product collection
  //create product collection views


  //need to handle events when on the last page a user wants to delete an item from the collection.
  //integrate Bootstrap
