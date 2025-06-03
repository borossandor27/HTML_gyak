document.addEventListener('DOMContentLoaded', () => {
    const axios = window.axios; // Axios betöltése a globális ablakból
    if (!axios) {
        console.error("Axios is not loaded. Please check the script tag in your HTML.");
        return;
    }
    const colorSelector = document.getElementById('color-selector');
    const backgroundButton = document.getElementById('backgroundButton');
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
    // Eseménykezelő a gombhoz
    backgroundButton.addEventListener('click', () => {
        const selectedColor = colorSelector.value; // kiválasztott szín értéke
        console.log("Kiválasztott szín:", selectedColor);
        document.getElementsByTagName('main')[0].style.backgroundColor = selectedColor; // háttérszín beállítása
        const textColor = getContrastTextColor(selectedColor); // kontrasztos szöveg szín meghatározása
        console.log("Szöveg szín:", textColor);
        document.getElementsByTagName('main')[0].style.color = textColor; // szöveg színének beállítása
    });
    function getContrastTextColor(hexColor) {
    // Ellenőrizzük, hogy a hexColor érvényes-e
    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hexColor)) {
        console.error("Érvénytelen hex szín kód:", hexColor);
        return 'black'; // Alapértelmezett szín, ha érvénytelen a bemenet
    }
    // Ha rövidített hex kód (pl. #fff), kibővítjük a teljes formára
    if (hexColor.length === 4) {
        hexColor = `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`;
    }
    // HEX -> RGB bontás
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    // YIQ formula szerinti világosság
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // 128 körül van az ideális határérték
    return brightness > 128 ? 'black' : 'white';
}

});