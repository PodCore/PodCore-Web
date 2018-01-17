const app = require('express')();

const port = process.env.PORT || '6969';

app.get('/', (req, res) => {
  res.send('Kash eats Lemons.');
});

app.listen(port, () => {
  console.log("Tripping Out On Port 6969.");
});
