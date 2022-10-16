const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'test' });
  next();
});

function filter_common_words(input) {
  return input.map(word => {
    return ![
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
          ].includes(word);
  })
}


// speech-to-text from user
router.get('/transcribe', (req, res, next) => {
  console.log(`params: ${req.params}`);

  // call api here with audio we got from frontend
  result = req.params['sample_input'].split(' ');


  res.status(200).json({ data: filter_common_words(result) });
  next();
});

// text-to-speech the result
router.get('/synthesize', (req, res, next) => {
  console.log(`params: ${req.params}`);

  res.status(200).json({ data: 'insert spoken file here'});
  next();
});

// find related words
router.get('/reverse-lookup', (req, res, next) => {
  console.log(`params: ${req.params}`);

  // ask word api for best related words
  // and decide the best ones to return to the user
  result = ['intuition', 'instinct', 'observant'];

  res.status(200).json({ data: result});
  next();
});




module.exports = router;
