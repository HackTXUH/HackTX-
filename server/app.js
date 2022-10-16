const express = require('express')
const router = require('./routes')
const app = express();
const port = 8000

//wordArray = ["portable","computer"]
var apiUrl = "https://api.datamuse.com/words?ml="

/*const express = require('express');
const logger = require('morgan');

const router = require('./routes');

const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'production'
const config = require('./config')[env];

if (env !== 'production') {
  // eslint-disable-next-line no-console
  console.log(config);
}

// eslint-disable-next-line no-console
console.log(`Current environment is ${env}`);

const app = express();*/

/**
 * Get port from environment and store in Express.
 */

/*const port = normalizePort(config.app.port);
app.set('port', port);

if (env === 'production') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/api/v1/', router);*/

/**
 * Normalize a port into a number, string, or false.
 */

/*function normalizePort(val) {
  const portNum = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum;
  }

  return false;
}*/

function filter_common_words(input) {
  return (input.filter(word => {
    return (![
            'what',
            'and',
            'is',
            'or',
            'the',
            'of',
            'why',
            'where',
            'how',
            'it',
            'there',
            'their',
            'a',
            'to',
            'when',
            'does',

          ].includes(word))
  }))
  
}

function parseURL(wordArray){
  wordArray.forEach(word => {
    apiUrl = apiUrl + word + "+"
  });
  console.log(apiUrl)
  newURL = apiUrl
  apiUrl = "https://api.datamuse.com/words?ml="
  return newURL;
}

/* GET home page. */
app.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'test' });
  next();
});

// speech-to-text from user
app.get('/transcribe', (req, res, next) => {
  /*console.log(`params: ${req.params}`);

  // call api here with audio we got from frontend
  result = req.params['sample_input'].split(' ');
*/
  result = ["what","is","a","portable","computer"]
  res.status(200).json({ data: filter_common_words(result) });
  wordArray = filter_common_words(result);
  next();
});

app.get('/reverseLookup', (req, res, next) => {
  console.log(wordArray);
  url = parseURL(wordArray);
  router.make_API_call(url)
  .then(response => {
      res.json(response)
  })
  .catch(error => {76                                
      res.send(error)
  })
  //next();                                                                   
});  

// text-to-speech the result
app.get('/synthesize', (req, res, next) => {
  console.log(`params: ${req.params}`);

  res.status(200).json({ data: 'insert spoken file here'});
  next();
});   

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;





                      