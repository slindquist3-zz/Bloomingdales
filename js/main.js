//adding an argument to all of these functions
	//will make them more resuable


function total() {
	var amount = parseInt(product.get("price").sale.slice(1));
	var quantity = product.get("quantity");
	return amount * quantity;
}

function getQuantity() {
	return parseInt(product.get("quantity"));
}

function getSalePrice() {
	return parseInt(product.get("price").sale.slice(1));
}

function getOriginalPrice() {
	return parseInt(product.get("price").original.slice(1));
}

function savings() {
	var originalPrice = getOriginalPrice()
	var quantity = getQuantity()
	var wouldBePrice = originalPrice * quantity;
	return wouldBePrice - total();
}

//I can refactor the above two functions into one, or atleast not repeat myself

$('#next').on('click', function(e) {
	e.preventDefault();
	$("#selections").hide();
  $('#shipaddress').show();

	$("#product").append("<p> Size: " + product.get("size") + "</p>");
	$("#product").append("<p> Color: " + product.get("color") + "</p>");
	$("#product").append("<p> Quantity: " + product.get("quantity") + "</p>");

})

$("#back1").on('click', function() {
	$("#shipaddress").hide();
	$("#selections").show();
})

$('#finish').on('click', function() {
	userinfo.set({
		address: $("#addOne").val() + " " + $("#addTwo").val(),
		city: $("#city").val(),
		state: $("#state").val(),
		zipcode: $("#zipcode").val()
	});
	console.log(userinfo.attributes)
	$("#shipaddress").hide();
  $('#analyticsinfo').show();
	$('#analyticsinfo').append("<p> Total: $" + total() + "</p>");
	$('#analyticsinfo').append("<p> Your Savings: $" + savings() + "</p>");



})

$(".size-selection").on("change", function() {
	product.set(this.name, this.value);
	console.log(product.attributes);
})

$(".color-selection").on("change", function() {
	product.set(this.name, this.value)
	if (product.get("color") === "Black") {
		product.set("image", "<img src='https://images.bloomingdales.com/is/image/BLM/products/2/optimized/9497962_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'>");
	} else if (product.get("color")  === "Coral") {
		product.set("image", "<img src='https://images.bloomingdales.com/is/image/BLM/products/3/optimized/9497963_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'>");
	} else if (product.get("color")  === "Blue") {
		product.set("image", "<img src='https://images.bloomingdales.com/is/image/BLM/products/6/optimized/9497966_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'>");
	}
	console.log(product.attributes);
});

//I can refactor this so that each image is just a value in an array and on color change the function iterates through the array of hypothetical images
//These image values should all be stored on the instance of the model

$(".quantity-selection").on("change", function() {
	product.set(this.name, this.value);
	console.log(product.attributes);
});

// ---------  MODELS -------------

var Product = Backbone.Model.extend({
		validate: function(attrs) {
			if(!attrs.brand) {
				return "Every product needs a brand.";
			}
			if(!attrs.name) {
				return "Every product needs a name.";
			}
			if(attrs.price.original === "" && attrs.price.sale === "") {
				return "Every product needs at least one price.";
			}
			if(attrs.price.original <= 0 || attrs.price.sale <= 0) {
				return "Every product should have a value greater than zero.";
			}
			if(attrs.price.sale > attrs.price.original) {
				return "The sale price should be less than original.";
			}
		},
		defaults: {
			quantity: 1,
			size: $(".size-selection")[0].value,
			color: $(".color-selection")[0].value
		},
  	initialize: function() {
    	console.log("A new product has been created")
    }
  });

 var product = new Product({
	 brand: "Sunset & Spring",
	 name: "High/Low Maxi Dress",
	 image: "<img src='https://images.bloomingdales.com/is/image/BLM/products/2/optimized/9497962_fpx.tif?wid=800&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'>",
	 //this image value should actually point to an array
	 price: {
		 original: 195,
		 sale: 145
	 }
 });

 var Userinfo = Backbone.Model.extend({
	 initialize: function() {
		 console.log("User has info!")
	 }
 });

 var userinfo = new Userinfo({
 });

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
				"<p>" + "Original Price: $" + this.model.get("price").original + "</p>" +
				"<p>" + "Sale: $" + this.model.get("price").sale + "</p>" +
				"<p>" + this.model.get("image") + "</p>")
//how to get this view to render the new model attributes without showing these
	//values as undefined before they are set?
		 return this;
	 }
 });

 var productView = new ProductView({ el: "#product", model: product});
 productView.render();


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

 var userinfoView = new UserinfoView({ el: "#shipping-info", model: userinfo});
 userinfoView.render();
 //There should be some way to use one function to populate my models with their attributes, because to do each
 //	one individually will make my code heavy and not very dry.

//When a user clicks next, I need to also add the product to a hypothetical Product Collection,
//  which will be populated only with this one model, but it will show that it could have others

//That Product collection view will render the modelViews

  //create product collection
  //create product collection views


  //need to handle events when on the last page a user wants to delete an item from the collection.
  //integrate Bootstrap
