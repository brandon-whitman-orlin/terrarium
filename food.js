document.addEventListener("click", function(event) {
  // Create a new div element with class "fishFood"
  var foodDiv = document.createElement("div");
  foodDiv.className = "fishFood";
  
  // Set the position of the div using fixed positioning
  foodDiv.style.position = "fixed";
  foodDiv.style.left = event.clientX + "px";
  foodDiv.style.top = event.clientY + "px";
  
  // Find the parent element with class "food"
  var foodParent = event.target.closest(".food");
  
  // Append the foodDiv to the foodParent
  if (foodParent) {
    foodParent.appendChild(foodDiv);
  }
});
