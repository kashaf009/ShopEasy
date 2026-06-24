const fs = require('fs');

const processFile = (file, prefix) => {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.forEach((item, index) => {
    item.id = `${prefix}${index + 1}`;
  });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

processFile('./public/data/mobile.json', 'mob_');
processFile('./public/data/Laptop.json', 'lap_');
processFile('./public/data/newArrival.json', 'new_');
console.log('Done fixing IDs');
