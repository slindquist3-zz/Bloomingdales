//adding an argument to all of these functions
	//will make them more resuable


$("#checkout").on('click', function() {
	alert("Thanks for choosing Bloomingdale's!")
})

function total() {
	return getSalePrice() * getQuantity();
}

function getQuantity() {
	return parseInt(product.get("quantity"));
}

function getSalePrice() {
	return parseInt(product.get("price").sale);
}

function getOriginalPrice() {
	return parseInt(product.get("price").original);
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
	$("#product-details").append("<p> Size: " + selection.get("size") + "</p>");
	$("#product-details").append("<p> Color: " + selection.get("color") + "</p>");
	$("#product-details").append("<p> Quantity: " + selection.get("quantity") + "</p>");

})

$("#back").on('click', function() {
	$(".checkout").remove()
	$("#shipaddress").hide();
	$("#selections").show();
})

$("#edit").on('click', function() {
	$('#analyticsinfo').hide();
	$("#shipaddress").show();
})

$('#finish').on('click', function() {
	shipping.set({
		address: $("#addOne").val() + " " + $("#addTwo").val(),
		city: $("#city").val(),
		state: $("#state").val(),
		zipcode: $("#zipcode").val()
	});
	console.log(shipping.attributes)
	$("#shipaddress").hide();
  $('#analyticsinfo').show();
	$('#analyticsinfo').append("<p class='checkout'> Total: $" + total() + "</p>");
	$('#analyticsinfo').append("<p class='checkout'> Your Savings: $" + savings(product) + "</p>");
})

$(".size-selection").on("change", function() {
	selection.set(this.name, this.value);
})

$(".color-selection").on("change", function() {
	selection.set("color", "to be set");
	});

$(".color-selection").on("change", function() {
	selection.set(this.name, this.value);
	var arr = Object.values(product.get("color"))
	var url = []
		for (var i = 0; i < arr.length; i++) {
			if (Object.keys(arr[i])[0] === this.value) {
				url.push(Object.values(arr[i])[0])
			}
		}
	selection.set("image", url[0]);
	console.log(selection.get("color"))
	console.log(selection.get("image"))

});

$(".quantity-selection").on("change", function() {
	selection.set(this.name, this.value);
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
  	initialize: function() {
    	console.log("A new product has been created")
    }
  });

 var product = new Product({
	 brand: "Sunset & Spring",
	 name: "High/Low Maxi Dress",
	 //this image value should actually point to an array
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

 var Selection = Backbone.Model.extend({
	 defaults: {
		 quantity: 1,
		 size: $(".size-selection")[0].value,
		 color: $(".color-selection")[0].value,
		 image: Object.values(product.get("color")[0])[0]
	 },
	 initialize: function() {
		 console.log("User can make selections.")
	 }
 });

 var selection = new Selection();

 var Shipping = Backbone.Model.extend({
	 initialize: function() {
		 console.log("Shipping info!")
	 }
 });

 var shipping = new Shipping();



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
				"<p>" + "Sale: $" + this.model.get("price").sale + "</p>")
		return this;
	 }
 });

 var productView = new ProductView({ el: "#product-details", model: product});
 productView.render();


 var ShippingView = Backbone.View.extend({
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

 var shippingView = new ShippingView({ el: "#shipping-info", model: shipping});
 shippingView.render();
 //There should be some way to use one function to populate my models with their attributes, because to do each
 //	one individually will make my code heavy and not very dry.

 var SelectionView = Backbone.View.extend({
	 initialize: function(){
		this.model.on("change", this.render, this)
	},
	render: function() {
		this.$el.html(
			 "<img id='dress' src=" + this.model.get("image") + ">");
		return this;
	}
 })

 var selectionView = new SelectionView({el: "#image-view", model: selection})
 selectionView.render()
