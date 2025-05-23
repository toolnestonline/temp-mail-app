const express = require('express');
const router = express.Router();
const { generateEmail, getInbox } = require('../services/mailHandler');

router.post('/generate', (req, res) => {
    const email = generateEmail();
    res.json({ email });
});

router.get('/inbox/:email', async (req, res) => {
    const inbox = await getInbox(req.params.email);
    res.json(inbox);
});

module.exports = router;