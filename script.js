document.addEventListener('DOMContentLoaded', (event) => {
    const openclose = document.getElementById("openclose");
    const menuItems = document.getElementById("menuItems");
    const line1 = document.getElementById("menuIconLine1");
    const line2 = document.getElementById("menuIconLine2");
    const line3 = document.getElementById("menuIconLine3");

    let lastToggleTime = 0;

    openclose.addEventListener("click", function() {
        const currentTime = Date.now();

        if (currentTime - lastToggleTime >= 1000) {
            lastToggleTime = currentTime;

            if (openclose.getAttribute("data-state") === "closed") {
                openclose.setAttribute("data-state", "open");
                line1.style.transform = "translateY(234%)";
                line3.style.transform = "translateY(-234%)";

                setTimeout(() => {
                    line2.style.opacity = "0";
                    line2.style.width = "0%";
                    line2.style.transform = "rotate(90deg)";
                    openclose.style.transform = "rotate(45deg)";
                }, 300);
                setTimeout(() => {
                    line2.style.opacity = "1";
                    line2.style.width = "70%";
                    openclose.style.transform = "rotate(45deg)";
                }, 600);

                menuItems.style.left = "calc(0% - 5px)";
            } else {
                openclose.setAttribute("data-state", "closed");
                line2.style.width = "0%";

                setTimeout(() => {
                    openclose.style.transform = "rotate(0deg)";
                    line2.style.transform = "rotate(0deg)";
                }, 300);
                setTimeout(() => {
                    line2.style.transition = "none";
                    line2.style.width = "70%";
                    line1.style.transform = "translateY(0%)";
                    line3.style.transform = "translateY(0%)";
                }, 600);
                setTimeout(() => {
                    line2.style.transition = "transform 0.3s ease-in-out, scale 0.3s ease-in-out, width 0.3s ease-in-out";
                }, 700);
                menuItems.style.left = "-500%";
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    function moveFish() {
        const fishes = document.querySelectorAll('.fish');
        const main = document.querySelector('main');
        
        const mainWidth = main.clientWidth;
        const mainHeight = main.clientHeight;
        
        fishes.forEach((fish) => {
          const fishWidth = fish.clientWidth;
          const fishHeight = fish.clientHeight;
      
          const maxX = mainWidth - fishWidth;
          const maxY = mainHeight - fishHeight;
          
          const getRandomPosition = () => ({
            x: Math.random() * maxX,
            y: Math.random() * maxY,
          });

          const getRandomSpeed = () => Math.random() * 2 + 1; // Adjust the range for different speed variations
        
          const zIndexValues = [2, 3, 4];
        
          const getRandomZIndex = () => zIndexValues[Math.floor(Math.random() * zIndexValues.length)];
        
          const changeZIndexWithDelay = () => {
            fish.style.zIndex = getRandomZIndex();
            const delay = Math.floor(Math.random() * 10000) + 5000;
            setTimeout(changeZIndexWithDelay, delay);
          };

          let newPosition = getRandomPosition();
          let speedFactor = getRandomSpeed(); // Get a random speed factor

          const moveStep = 1; // You can adjust the base step size for slower/faster movement
          
          const move = () => {
            const currentX = parseFloat(fish.style.left || 0);
            const currentY = parseFloat(fish.style.top || 0);
            
            const diffX = newPosition.x - currentX;
            const diffY = newPosition.y - currentY;
            
            const distance = Math.sqrt(diffX * diffX + diffY * diffY);

            const adjustedMoveStep = moveStep * speedFactor; // Apply speed factor
            
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
            
            if (newX >= 0 && newX <= maxX && newY >= 0 && newY <= maxY) {
              fish.style.left = newX + 'px';
              fish.style.top = newY + 'px';
            }
            
            requestAnimationFrame(move);
          };
          
          move();
          changeZIndexWithDelay();
        });
      }
      
      // Call the function to start moving the fish
      moveFish();
      
});