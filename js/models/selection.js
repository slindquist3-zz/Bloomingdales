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
