const app = require('express')();

const port = process.env.PORT || '6969';

app.get('/', (req, res) => {
  res.send('Kash eats Lemons.');
});

app.listen('6969', () => {
  console.log("Tripping Out On Port 6969.");
});
