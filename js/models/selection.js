//creates a selection model with default values for user to change through events
var Selection = Backbone.Model.extend({
  validate: function(attrs) {
    if (attrs.quantity < 1) {
      return "All products must have a quantity value of at least one."
    }
    if (!attrs.size) {
      return "All products must have at least one size listed."
    }
    if (!attrs.color) {
      return "All products must have at least one color listed."
    }
  },
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
