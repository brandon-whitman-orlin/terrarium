document.addEventListener('DOMContentLoaded', (event) => {
    const openclose = document.getElementById("openclose");
    const menuItems = document.getElementById("menuItems");

        openclose.addEventListener("click", function() {
        if (openclose.getAttribute("data-state") === "closed") {
            openclose.setAttribute("data-state", "open");
            openclose.innerHTML = "×";
            menuItems.style.left = "calc(0% - 5px)";
        } else {
            openclose.setAttribute("data-state", "closed");
            openclose.innerHTML = "≡";
            menuItems.style.left = "-500%";
        }
    });
});