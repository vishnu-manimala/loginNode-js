const express = require('express');
const app = express();

app.get('/evenNumbers', (req, res) => {
  const arr = req.query.arr.split(',').map(Number); //parse array from query params and convert to array of numbers
  const evenArr = arr.filter(num => num % 2 === 0); //filter even numbers
  res.send(evenArr);
});

app.listen(4000, () => {
  console.log('Server started on port 6000');
});
