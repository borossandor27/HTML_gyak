document.addEventListener('DOMContentLoaded', () => {
    const axios = window.axios; // Axios betöltése a globális ablakból
    if (!axios) {
        console.error("Axios is not loaded. Please check the script tag in your HTML.");
        return;
    }
    const colorSelector = document.getElementById('color-selector');
    console.log('Client script loaded');
    // Ellenőrzés a console.log-gal
    console.log("Axios objektum:", axios);

    // Próbáljunk meg lekérni egy nyilvános API-ról adatot
    let url = 'http://localhost:3000/colors'
    axios.get(url)
        .then(function (response) {
            // Sikeres válasz
            console.log("Sikeres Axios kérés:", response.data);
            document.getElementById('preloading').style.display = 'none'; // Elrejtjük a betöltő elemet
            document.getElementById('container').style.display = 'block'; // Megjelenítjük a tartalmat
            // Feltöltjük a színválasztó elemet a válasz adataival
            response.data.forEach(color => {
                const option = document.createElement('option');
                option.value = color.value; // érték a színkód
                option.textContent = color.color; // a szín neve
                colorSelector.appendChild(option);
            });
        })
        .catch(function (error) {
            // Hiba a kérés során
            console.error("Hiba az Axios kérésben:", error);
            document.getElementById('message').innerText = "Hiba a kérés során. Nézd meg a konzolt!";
        });
});