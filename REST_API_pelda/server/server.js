import express from 'express'; // Importing the express module
import fs from 'fs'; // Importing the file system 
import cors from 'cors'; // Importing the CORS module for handling cross-origin requests
const app = express(); // példányosítjuk az express alkalmazást
app.use(cors()); // CORS middleware használata, hogy engedélyezzük a kereszt-domain kéréseket
app.use(express.json()); // a kapott üzenettörzset JSON formátumra alakítja, ha lehetséges
app.use(express.urlencoded({ extended: true })); // a kapott üzenettörzset URL-kódolt formátumra alakítja, ha lehetséges

let green = '\x1b[32m'; // zöld szín kód
let red = '\x1b[31m'; // piros szín kód
let blue = '\x1b[34m'; // kék szín kód
let yellow = '\x1b[33m'; // sárga szín kód
let defaultColor = '\x1b[0m'; // alapértelmezett szín kód

// Importáljuk a színeket tartalmazó JSON fájlt
let rawdata = fs.readFileSync('colors.json'); // a fájl olvasása szövegként
let colors = JSON.parse(rawdata); // a JSON fájl tartalmának feldolgozása

console.log(`${blue}Colors loaded from colors.json:${defaultColor}`); // üzenet a konzolra, kék színnel

app.get('/', (req, res) => { // GET kérés a gyökér útvonalra
  res.header('Content-Type', 'text/plain'); // válasz fejlécének beállítása
  console.log(`GET request received at /${defaultColor}`); // üzenet a konzolra, zöld színnel
  res.send('Hello World!'); // válasz küldése
});

app.get('/nyar', (req, res) => { // GET kérés a /nyar útvonalra
  console.log(`GET request received at ${green}/nyar${defaultColor}`); // üzenet a konzolra, zöld színnel
  res.header('Content-Type', 'text/plain'); // válasz fejlécének beállítása
  res.send('Nyári szünet!'); // válasz küldése
});

app.get('/tavasz', (req, res) => { // GET kérés a /tavasz útvonalra
  console.log(`GET request received at ${green}/tavasz${defaultColor}`); // üzenet a konzolra, zöld színnel
  res.header('Content-Type', "text/html; charset=UTF-8"); // válasz fejlécének beállítása
  let html = `<h1>Tavaszi szünet!</h1>`; // HTML válasz létrehozása
  res.send(html); // válasz küldése
});

app.get('/colors', (req, res) => { // GET kérés a /colors útvonalra
  console.log(`GET request received at ${green}/colors${defaultColor}`); // üzenet a konzolra, zöld színnel
  res.header('Content-Type', 'application/json'); // válasz fejlécének beállítása JSON formátumra
  res.send(colors); // a színek JSON válaszként küldése
}); // GET kérés a /colors útvonalra

app.post('/colors', (req, res) => { // POST kérés a /colors útvonalra
  console.log(`POST request received at ${green}/colors'${defaultColor}`); // üzenet a konzolra, zöld színnel
  console.log(req.body); // a kapott adat kiírása a konzolra
  colors.push(req.body); // az új szín hozzáadása a színek listájához
  //fs.writeFileSync('colors.json', JSON.stringify(colors, null, 2)); // a frissített színek mentése a fájlba
  res.header('Content-Type', 'application/json'); // válasz fejlécének beállítása JSON formátumra
  res.send(colors); // a frissített színek JSON válaszként küldése
}); // POST kérés a /colors útvonalra

app.use((req, res) => { // minden más útvonalra érkező kérések kezelése
  console.log(`${red}404 Not Found${defaultColor}`); // üzenet a konzolra, piros színnel
  res.status(404).send('404 Not Found'); // 404-es hiba válasz küldése
}); // minden más útvonalra érkező kérések kezelése

app.listen(3000, () => { // szerver indítása a 3000-es porton
  console.log(`Server is running on ${yellow}http://localhost:3000${defaultColor}`); // üzenet a konzolra
}); // szerver figyelése a 3000-es porton
