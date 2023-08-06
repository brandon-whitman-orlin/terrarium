document.addEventListener('DOMContentLoaded', (event) => {
    const openclose = document.getElementById("openclose");
    const menuItems = document.getElementById("menuItems");

        openclose.addEventListener("click", function() {
        if (openclose.getAttribute("data-state") === "closed") {
            openclose.setAttribute("data-state", "open");
            menuItems.style.left = "0%";
        } else {
            openclose.setAttribute("data-state", "closed");
            menuItems.style.left = "-200%";
        }
    });
});