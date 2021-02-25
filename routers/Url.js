const express = require('express');
const shortId = require('shortid');
const validUrl = require('valid-url');
const config = require('config');

const Url = require('../models/Url');

const router = express.Router();
const baseURL = config.get('baseURL');

router.post('/', async (req, res) => {
  if (!validUrl.isUri(baseURL)) return res.status(500).send();

  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl))
    return res.status(400).send('Given url is invalid');

  try {
    const existingURL = await Url.findOne({ longUrl });

    if (existingURL) return res.send(existingURL);

    const urlCode = shortId.generate();

    const shortUrl = `${baseURL}/${urlCode}`;

    const newUrl = new Url({ urlCode, longUrl, shortUrl });
    await newUrl.save();

    res.send(newUrl);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/:urlCode', async (req, res) => {
  const url = await Url.findOne({ urlCode: req.params.urlCode });

  if (url) {
    res.redirect(url.longUrl);
  } else {
    res.status(400).send('Invalid URL');
  }
});

module.exports = router;
