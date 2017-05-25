//ensures first options and selected upon load
$(".size-selection")[0].setAttribute("checked", "checked");
$(".color-selection")[0].setAttribute("checked", "checked");

//updates quantity attribute based on user event
$(".quantity-selection").on("change", function() {
	 selection.set(this.name, this.value);
});

//add to product quantity
$("#add").on("click", function(){
	selection.set("quantity", selection.get("quantity") + 1)
	$("#quantity-selection").attr("value", selection.get("quantity"))
})

//subract from product quantity, cannot subtract if quantity is 1 or less
$("#subract").on("click", function(){
	if (selection.get("quantity") <= 1 ) {
		return;
	}
	selection.set("quantity", selection.get("quantity") - 1)
	$("#quantity-selection").attr("value", selection.get("quantity"))
})

//updates size selection based on user choice
$(".size-selection").on("change", function() {
 selection.set(this.name, this.value);
 console.log(selection.get("size"))
})

//updates color selection based on user choice,
	//then updates image selection associated with that color
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
});

//prevents user from moving to next page if quantity is less than one
 $('#next').on('click', function() {
	 if ($("#quantity-selection").value < 1 ) {
		 alert("Please add at least one item");
		 return;
	 }
	 //hides product selection
	 $("#selections").hide();
	 //adds total and savings information to review page based on user selections
	 $('#purchase').append("<h4 class='checkout'> Total: $" + selection.getTotal() + "</h4>");
	 $('#purchase').append("<h4 id='savings' class='checkout'> Your Savings: $" + selection.getSavings() + "</h4>");
   $('#shipaddress').show();
 });

//deletes previous selection info added to review page if users want to edit info
 $("#back").on('click', function() {
	 $(".checkout").remove();
	 //hides the shipping page and re-shows the user the selection page to edit info
	 $("#shipaddress").hide();
	 $("#selections").show();
 });

 // hides review page and shows user their previously entered shipping info
 $("#edit").on('click', function() {
	 $('#analyticsinfo').hide();
	 $("#shipaddress").show();
 });
 
//prompts user to fill out the required sections of the shipping information
	//if a section has not been altered, with the exception of second address line
 $('#finish').on('click', function() {
	 var values = []
	 for (var i = 0; i < $(".ship").length; i++) {
		 values.push($(".ship")[i].value)
	 	}
	 	if (values.includes("")) {
	 		alert("Please fill out the shipping form");
	 		return;
	 	}
		//if each section has been filled out, shipping model instance is populated
			//with values
	 	shipping.set({
	 		address: $("#addOne").val() + " " + $("#addTwo").val(),
	 		city: $("#city").val(),
	 		state: $("#state").val(),
	 		zipcode: $("#zipcode").val()
	 	});
		//hides shipping page and moves user to review page
 	 $("#shipaddress").hide();
   $('#analyticsinfo').show();
 });

//would take user to billing page after confirming their information
$("#checkout").on('click', function() {
	alert("Thanks for choosing Bloomingdale's!");
});
