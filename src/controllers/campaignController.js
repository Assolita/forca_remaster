// controllers/campaignController.js
const { models } = require('../models');

async function getProgress(req, res, next) {
  try {
    const userId = req.user.id;
    const rows = await models.CampaignProgress.findAll({
      where: { usuario_id: userId }
    });

    const completedWords = rows.map(r => ({
      personId: r.person_id,
      wordIndex: r.word_index
    }));

    res.json({ completedWords });
  } catch (err) { next(err); }
}

async function completeWord(req, res, next) {
  try {
    const userId = req.user.id;
    const { personId, wordIndex } = req.body;

    if (!personId || !wordIndex) {
      return res.status(400).json({ message: 'personId e wordIndex são obrigatórios.' });
    }

    const [row, created] = await models.CampaignProgress.findOrCreate({
      where: {
        usuario_id: userId,
        person_id: personId,
        word_index: wordIndex
      },
      defaults: {
        completed: true
      }
    });

    if (!created && row.completed === false) {
      row.completed = true;
      await row.save();
    }

    // verifica se o integrante já completou as 3 palavras
    const allRowsForPerson = await models.CampaignProgress.findAll({
      where: { usuario_id: userId, person_id: personId }
    });

    const uniqueWordIndexes = new Set(allRowsForPerson.map(r => r.word_index));
    const personCompleted = uniqueWordIndexes.size >= 3;

    res.json({
      success: true,
      personCompleted
    });
  } catch (err) { next(err); }
}

module.exports = {
  getProgress,
  completeWord
};
