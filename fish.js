document.addEventListener('DOMContentLoaded', (event) => {

    // Array of possible fish actions with tuples (action, duration)
    var possibleActions = [
        ["Eating", 5],
        ["Exploring", 8],
        // ["Mating", 10],
        // ["Resting", 3]
        // Add more actions as needed
    ];

    // Constructor function for creating fish objects
    function Fish(name, species, color, price) {
        this.name = name;
        this.species = species;
        this.color = color;
        this.price = price;
        this.action = getRandomAction(); // Call function to set random action
        this.stopAction = false;

        // Method to create and append a div for the fish
        this.createFishElement = function() {
            var fishElement = document.createElement("div");
            fishElement.className = "fish";
            fishElement.id = this.name;
            fishElement.style.backgroundColor = this.color;

            // Find the 'animals' container and append the fish element
            var animalsContainer = document.querySelector(".animals");
            animalsContainer.appendChild(fishElement);
        };

        // Method to perform the action
        this.performingAction = function() {
            var self = this;
            console.log(this.name + " is " + this.action);
            var duration = getActionDuration(this.action);

            // Stop the ongoing behavior
            self.stopAction = true;

            setTimeout(function() {
                self.stopAction = false; // Reset stopAction to false

                // Call specific movement function based on the action
                switch (self.action) {
                    case "Eating":
                        eatBehavior(self);
                        break;
                    case "Exploring":
                        exploreBehavior(self);
                        break;
                    case "Mating":
                        mateBehavior();
                        break;
                    case "Resting":
                        restBehavior();
                        break;
                        // Add more cases for other actions
                }

                // Schedule the next behavior change
                setTimeout(function() {
                    self.action = getRandomAction();
                    self.performingAction(); // Repeat after waiting for duration
                }, duration * 1000);

            }, 100); // Wait for 1 second to stop ongoing behavior
        };

        // Call the method immediately upon creation
        this.createFishElement();
        this.performingAction(); // Start performing action
    }

    // Function to get a random action from possibleActions array
    function getRandomAction() {
        // Filter out "eating" behavior if there are no fishFood elements
        const availableActions = possibleActions.filter(action => {
            if (action[0] === "Eating") {
                return document.querySelectorAll('.fishFood').length > 0;
            }
            return true;
        });
    
        if (availableActions.length === 0) {
            return null; // No available actions
        }
    
        const randomIndex = Math.floor(Math.random() * availableActions.length);
        return availableActions[randomIndex][0]; // Return the action name
    }

    // Function to get the duration of a specific action
    function getActionDuration(action) {
        for (var i = 0; i < possibleActions.length; i++) {
            if (possibleActions[i][0] === action) {
                return possibleActions[i][1];
            }
        }
        return 0; // Default duration if action not found
    }

    // Movement behavior functions for each action
    function eatBehavior(fishItem) {
        const fish = document.getElementById(fishItem.name);
        const main = document.querySelector('main');
        const mainWidth = main.clientWidth;
        const mainHeight = main.clientHeight;
        const fishWidth = fish.clientWidth;
        const fishHeight = fish.clientHeight;
        const maxX = mainWidth - fishWidth;
        const maxY = mainHeight - fishHeight;
    
        const getFoodPosition = () => {
            const fishFoods = document.querySelectorAll('.fishFood');
            if (fishFoods.length === 0) {
                return {
                    x: Math.random() * maxX,
                    y: Math.random() * maxY, // Generate Y between minY and maxY
                };
            }
    
            let closestFood = fishFoods[0];
            let closestDistance = getDistance(closestFood);
    
            fishFoods.forEach(food => {
                const distance = getDistance(food);
                if (distance < closestDistance) {
                    closestFood = food;
                    closestDistance = distance;
                }
            });
    
            const rect = closestFood.getBoundingClientRect();
            const foodX = rect.left + rect.width / 2;
            const foodY = rect.top + rect.height / 2;
            const offsetX = (fishWidth - rect.width) / 2;
            const offsetY = (fishHeight - rect.height) / 2;
    
            // Adjust the offsetY to target slightly above the food
            const adjustedY = Math.min(Math.max(foodY - offsetY, 0), maxY);
    
            return {
                x: foodX,
                y: foodY - 100,
            };
        };
    
        function destroyFood(foodItem) {
            console.log("Destroying Food");
            foodItem.remove();
            fishItem.stopAction = true; // Stop movement when fish overlaps with food
            fishItem.action = getRandomAction();
            fishItem.performingAction();
        }
    
        const getDistance = food => {
            const foodRect = food.getBoundingClientRect();
            const foodX = foodRect.left + foodRect.width / 2;
            const foodY = foodRect.top + foodRect.height / 2;
            const diffX = foodX - (fishWidth / 2);
            const diffY = foodY - (fishHeight / 2);
            return Math.sqrt(diffX * diffX + diffY * diffY);
        };
    
        const speeds = [4];
    
        const getRandomSpeed = () => speeds[Math.floor(Math.random() * speeds.length)];
    
        let newPosition = getFoodPosition();
        let speedFactor = getRandomSpeed(); // Initialize speedFactor
    
        const move = () => {
            if (fishItem.stopAction) {
                return; // Stop movement if stopAction is true
            }
    
            const currentX = parseFloat(fish.style.left || 0);
            const currentY = parseFloat(fish.style.top || 0);
    
            const diffX = newPosition.x - currentX;
            const diffY = newPosition.y - currentY;
    
            const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    
            const adjustedMoveStep = Math.min(distance, 1 * speedFactor); // Apply speed factor
    
            if (distance < adjustedMoveStep) {
                newPosition = getFoodPosition();
                speedFactor = getRandomSpeed(); // Change speed factor when reaching a new position
                requestAnimationFrame(move);
                return;
            }
    
            // Check for collision with fishFood elements
            const fishFoods = document.querySelectorAll('.fishFood');
            fishFoods.forEach(food => {
                const foodRect = food.getBoundingClientRect();
                if (
                    currentX + fishWidth >= foodRect.left &&
                    currentX <= foodRect.left + foodRect.width &&
                    currentY + fishHeight >= foodRect.top - 70 && // Adjusted for the y-offset
                    currentY <= foodRect.top + foodRect.height - 70 // Adjusted for the y-offset
                ) {
                    console.log(`Fish X: ${currentX}, Fish Y: ${currentY}`);
                    console.log(`Food X: ${foodRect.left}, Food Y: ${foodRect.top}`);
                                
                    destroyFood(food);
                    return;
                }
            });

            const angle = Math.atan2(diffY, diffX);
            const deltaX = adjustedMoveStep * Math.cos(angle);
            const deltaY = adjustedMoveStep * Math.sin(angle);
    
            const newX = currentX + deltaX;
            const newY = currentY + deltaY;
    
            const clampedY = Math.min(Math.max(newY, 0), maxY); // Ensure Y is within the range
    
            if (newX >= 0 && newX <= maxX) {
                fish.style.left = newX + 'px';
                fish.style.top = clampedY + 'px';
            }
    
            requestAnimationFrame(move);
        };
    
        move();
    }
    

    function exploreBehavior(fishItem) {
        const fish = document.getElementById(fishItem.name);
        const main = document.querySelector('main');
        const mainWidth = main.clientWidth;
        const mainHeight = main.clientHeight;
        const fishWidth = fish.clientWidth;
        const fishHeight = fish.clientHeight;
        const maxX = mainWidth - fishWidth;
        const maxY = mainHeight - fishHeight;
    
        const getRandomPosition = () => ({
            x: Math.random() * maxX,
            y: Math.random() * maxY,
        });
    
        // const speeds = [20];
        const speeds = [1, 2];
    
        const getRandomSpeed = () => speeds[Math.floor(Math.random() * speeds.length)];
    
        let newPosition = getRandomPosition();
        let speedFactor = getRandomSpeed(); // Initialize speedFactor
    
        const move = () => {
            if (fishItem.stopAction) {
                return; // Stop movement if stopAction is true
            }
    
            const currentX = parseFloat(fish.style.left || 0);
            const currentY = parseFloat(fish.style.top || 0);
    
            const diffX = newPosition.x - currentX;
            const diffY = newPosition.y - currentY;
    
            const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    
            const adjustedMoveStep = 1 * speedFactor; // Apply speed factor
    
            if (distance < adjustedMoveStep) {
                newPosition = getRandomPosition();
                speedFactor = getRandomSpeed(); // Change speed factor when reaching a new position
                requestAnimationFrame(move);
                return;
            }
    
            const angle = Math.atan2(diffY, diffX);
            const deltaX = adjustedMoveStep * Math.cos(angle);
            const deltaY = adjustedMoveStep * Math.sin(angle);
    
            const newX = currentX + deltaX;
            const newY = currentY + deltaY;
    
            const clampedY = Math.min(Math.max(newY, 0), maxY); // Ensure Y is within the range
    
            if (newX >= 0 && newX <= maxX) {
                fish.style.left = newX + 'px';
                fish.style.top = clampedY + 'px';
            }
    
            requestAnimationFrame(move);
        };
    
        move();
    }
    


    function mateBehavior() {
        // Implement mating behavior
        console.log("Mating behavior");
    }

    function restBehavior() {
        // Implement resting behavior
        console.log("Resting behavior");
    }

    // Create fish objects
    var fish1 = new Fish("Nemo", "Clownfish", "Orange", 10);
});