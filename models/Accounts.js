const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Accounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "기본키"
    },
    blogLink: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "블로그 링크"
    },
    jobTag: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "직업 태그",
      references: {
        model: 'Jobs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Accounts',
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
        name: "FK_Accounts_jobTag_is_Jobs_id",
        using: "BTREE",
        fields: [
          { name: "jobTag" },
        ]
      },
    ]
  });
};
