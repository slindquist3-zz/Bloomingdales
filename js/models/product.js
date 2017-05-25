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
			var label = "<br><label>Size</label>"
			var string = ""
			var i = 0;
			while (i < array.length) {
				string += "<input class='size-selection' type='radio' name='size' value=" + array[i] + "> " + array[i] + "</input>" + " ";
				i++;
			}
			return label + string;
 	},
		getColorInput: function(array) {
			var label = "<label>Color</label>"
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
