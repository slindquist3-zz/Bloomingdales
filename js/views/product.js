//renders product attributes with defaults set in model for size and color
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
