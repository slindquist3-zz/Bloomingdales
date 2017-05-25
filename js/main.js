
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
		getSizeInput: function(array) {
			var label = "<label>Size:</label><br>"
			var string = ""
			var i = 0;
			while (i < array.length) {
				string += "<input class='size-selection' type='radio' name='size' value=" + array[i] + "> " + array[i] + "</input>" + " ";
				i++;
			}
			return label + string;
 	},
		getColorInput: function(array) {
			var label = "<label>Color:</label><br>"
			var string = ""
			var i = 0;
			while (i < array.length) {
				string += "<input class='color-selection' type='radio' name='color' value=" + array[i] + "> " + array[i] + "</input>" + " ";
				i++;
			}
			return label + string;
		},
  	initialize: function() {
    	console.log("A new product has been created")
    },
		getColorArray: function() {
			var colors = []
		  var nestedColor = Object.keys(product.attributes.color);
		  for (var i = 0; i < nestedColor.length; i++) {
		 	 colors.push(Object.keys(product.attributes.color[i])[0])
		  }
			return colors;
		}
  });

 var product = new Product({
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

 var ProductView = Backbone.View.extend({
	tagName: "div",
	initialize: function(){
		this.model.on("change", this.render, this)
	},
	render: function() {
		this.$el.html(
			 "<p id='brand'><strong>" + this.model.get("brand") + "</strong></p>" +
			 "<p>" + this.model.get("name") + "</p>" +
			 "<p><strike>" + "REG. $" + this.model.get("price").original + "</strike></p>" +
			 "<p id='sale'>" + "SALE $" + this.model.get("price").sale + "</p>" +
			 this.model.getSizeInput(this.model.get("size")) +
		 	 this.model.getColorInput(this.model.getColorArray()))

	 return this;
	}
 });

 var productView = new ProductView({ el: "#product-details", model: product});
 productView.render();


 var Selection = Backbone.Model.extend({
	 defaults: {
		 quantity: 1,
		 size: $(".size-selection")[0].value,
		 color: $(".color-selection")[0].value,
		 image: Object.values(product.get("color")[0])[0]
	 },
	 initialize: function() {
		 console.log("User can make selections.")
	 },
	 getQuantity: function() {
		 return this.get("quantity");
	 },
	 getTotal: function() {
		 return this.getQuantity() * product.get("price").sale;
	 },
	 getSavings: function() {
		 return (this.getQuantity() * product.get("price").original) - this.getTotal();
	 }
 });

 var selection = new Selection();

 var SelectionView = Backbone.View.extend({
	initialize: function(){
	 this.model.on("change", this.render, this)
 	},
 	render: function() {
	 this.$el.html(
			"<img id='mainImage' class='views' src=" + this.model.get("image") + ">");
	 return this;
 }
 })

 var selectionView = new SelectionView({el: "#image-view", model: selection})
 selectionView.render()


 var Shipping = Backbone.Model.extend({
	 initialize: function() {
		 console.log("Shipping info!");
	 }
 });

 var shipping = new Shipping();

 var ShippingView = Backbone.View.extend({
	 tagName: "div",
	 initialize: function(){
		 this.model.on("change", this.render, this);
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


 $("#checkout").on('click', function() {
	 alert("Thanks for choosing Bloomingdale's!");
 });

 $('#next').on('click touchstart', function(e) {
	 e.preventDefault();
	 $("#selections").hide();
	 $('#purchase').append("<h4 class='checkout'> Total: $" + selection.getTotal() + "</h4>");
	 $('#purchase').append("<h4 id='savings' class='checkout'> Your Savings: $" + selection.getSavings() + "</h4>");
   $('#shipaddress').show();
 });

 $("#back").on('click', function() {
	 $(".checkout").remove();
	 $("#shipaddress").hide();
	 $("#selections").show();
 });

 $("#edit").on('click', function() {
	 $('#analyticsinfo').hide();
	 $("#shipaddress").show();
 });

 $('#finish').on('click', function() {
	 var values = []
	 for (var i = 0; i < $(".ship").length; i++) {
		 values.push($(".ship")[i].value)
	 	}
	 	if (values.includes("")) {
	 		alert("Please fill out the shipping form");
	 		return;
	 	}
	 	shipping.set({
	 		address: $("#addOne").val() + " " + $("#addTwo").val(),
	 		city: $("#city").val(),
	 		state: $("#state").val(),
	 		zipcode: $("#zipcode").val()
	 	});

 		$("#shipaddress").hide();
   $('#analyticsinfo').show();
 });

 $(".size-selection").on("change", function() {
 	selection.set(this.name, this.value);
 	console.log(selection.get("size"))
 })

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

$(".size-selection")[0].setAttribute("checked", "checked");
$(".color-selection")[0].setAttribute("checked", "checked");

$("#add").on("click", function(){
	selection.set("quantity", selection.get("quantity") + 1)
	$("#quantity-selection").attr("value", selection.get("quantity"))

})

$("#delete").on("click", function(){
	if (selection.get("quantity") <= 1 ) {
		return;
	}
	selection.set("quantity", selection.get("quantity") - 1)
	$("#quantity-selection").attr("value", selection.get("quantity"))

})
