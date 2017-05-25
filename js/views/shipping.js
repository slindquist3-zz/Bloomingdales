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
