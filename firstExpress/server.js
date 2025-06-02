import express from 'express'; // Importing the express module
const app = express(); // példányosítjuk az express alkalmazást
//app.use(express.json()); // a kapott üzenettörzset JSON formátumra alakítja, ha lehetséges
//app.use(express.urlencoded({ extended: true })); // a kapott üzenettörzset URL-kódolt formátumra alakítja, ha lehetséges

// method: GET, POST, PUT, DELETE
app.get('/', (req, res) => { // GET kérés a gyökér útvonalra
  res.send('Hello World!'); // válasz küldése
});

app.get('/nyar', (req, res) => { // GET kérés a /nyar útvonalra
  res.send('Nyári szünet!'); // válasz küldése
});

app.get('/tavasz', (req, res) => { // GET kérés a /tavasz útvonalra
  res.send('Tavaszi szünet!'); // válasz küldése
});

app.listen(3000, () => { // szerver indítása a 3000-es porton
  console.log('Server is running on http://localhost:3000'); // üzenet a konzolra
}); // szerver figyelése a 3000-es porton
