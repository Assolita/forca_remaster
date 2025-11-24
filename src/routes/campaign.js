// routes/campaign.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const campaignController = require('../controllers/campaignController');

// mesmo padrão de verificarToken de players.js
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

// GET /api/campaign
router.get('/', verificarToken, campaignController.getProgress);

// POST /api/campaign/complete-word
router.post('/complete-word', verificarToken, campaignController.completeWord);

module.exports = router;
