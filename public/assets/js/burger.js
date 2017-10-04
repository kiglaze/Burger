$(document).ready(function() {
	$("[name=submit-burger]").on("click", function() {
		var burgerEntry = $("#burger-entry").val();
		$.post("/api/burger", {burger_name: burgerEntry});
	});
	$(".devour-button").on("click", function() {
		var burgerIdToDevour = $(this).attr("data-burger-id");
		$.ajax({
			method: "PUT",
			url: "/api/burger", 
			data: {devoured: 1, id: burgerIdToDevour}
		}).done(function(res) {
			var devouredBurgerLi = $("li[data-burger-id=" + burgerIdToDevour + "]");
			$("li[data-burger-id=" + burgerIdToDevour + "]").remove();
			var devouredBurgerName = devouredBurgerLi.find("p").html();
			$(".burgers-list.eaten").find("ul").append($("<li>").append("<p>" + devouredBurgerName + "</p>"))
		});
	});
});
