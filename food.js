document.addEventListener("click", function(event) {
    // Create a new div element with class "fishFood"
    var foodDiv = document.createElement("div");
    foodDiv.className = "fishFood";

    // Set the position of the div using absolute positioning
    // Adjust position by accounting for positioned ancestors
    var rect = event.target.getBoundingClientRect();
    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;

    foodDiv.style.position = "absolute";
    foodDiv.style.left = offsetX + "px";
    foodDiv.style.top = offsetY + "px";

    // Find the parent element with class "animals"
    var foodParent = document.querySelector(".animals");

    // Append the foodDiv to the foodParent
    if (foodParent) {
        foodParent.appendChild(foodDiv);

        function getRandomNumber() {
            return Math.floor(Math.random() * (70 - 15 + 1)) + 15;
        }       
        
        var randomNumber = getRandomNumber();

        // Function to make the fish food fall
        function fallFood() {
            var currentTop = parseFloat(foodDiv.style.top);
            var substrate = document.querySelector(".substrate");

            if (substrate) {
                var substrateRect = substrate.getBoundingClientRect();

                // Check if the food has reached the substrate
                if (currentTop + foodDiv.clientHeight < substrateRect.top - randomNumber) {
                    // Move the food down
                    currentTop += 1;
                    foodDiv.style.top = currentTop + "px";
                    requestAnimationFrame(fallFood); // Continue falling
                }
            }
        }

        // Start the falling animation
        fallFood();
    }
});