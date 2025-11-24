// src/models/CampaignProgress.js
const { Model, DataTypes } = require('sequelize');

class CampaignProgress extends Model {
  static initModel(sequelize) {
    CampaignProgress.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // opção B: índice numérico da palavra (1, 2, 3)
      word_index: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      sequelize,
      tableName: 'campaign_progress',
      modelName: 'CampaignProgress',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['usuario_id', 'person_id', 'word_index']
        }
      ]
    });

    return CampaignProgress;
  }
}

module.exports = CampaignProgress;
