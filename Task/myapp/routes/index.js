const express = require('express');
const router = express.Router();

const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
    input: fs.createReadStream('best.txt')
});

let line_no = 0;
let json =[];

// event is emitted after each line
rl.on('line', function(line) {
    line_no++;
    json.push(line);
    console.log(line);
});

// end
rl.on('close', function(line) {
    console.log('Total lines : ' + line_no);
   
});
// fs.writeFileSync('output.json', JSON.stringify(data, null, 2) + '\n')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/json', function(req, res, next) {
let a=[];
let object = {};
    
for(let i=0;i<json.length;i++){
  a.push(json[i].split('='));
}

a.forEach((element)=> {
  object[element[0]] = element[1];
});
console.log('my object'+ object);

var jsonContent = JSON.stringify(object);
console.log(jsonContent);

fs.writeFile("output.json",jsonContent, 'utf8', function (err) {
  if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }

  console.log("JSON file has been saved.");
});

res.send(object);
});


module.exports = router;
