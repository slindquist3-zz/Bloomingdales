//provides a default image, allows image to change if user changes selection model
var SelectionView = Backbone.View.extend({
 initialize: function(){
  this.model.on("change", this.render, this)
 },
 render: function() {
  this.$el.html(
     "<img id='dress' class='views' src=" + this.model.get("image") + ">");
  return this;
}
})

var selectionView = new SelectionView({el: "#image-view", model: selection})
selectionView.render()
