const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TechStacks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "기본키"
    },
    userID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "유저id",
      references: {
        model: 'Accounts',
        key: 'id'
      }
    },
    techName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "techName"
    }
  }, {
    sequelize,
    tableName: 'TechStacks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_TechStacks_userID_is_Accounts_id",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
};
