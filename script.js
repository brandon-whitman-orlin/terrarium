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