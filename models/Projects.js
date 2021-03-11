const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Projects', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "기본키"
    },
    managerID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "프로젝트 매니저 id",
      references: {
        model: 'Accounts',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "프로젝트 이름"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "프로젝트 내용"
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "프로젝트 등록일"
    },
    delete: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "프로젝트 삭제유무"
    },
    stateID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "프로젝트 상태",
      references: {
        model: 'StateTags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Projects',
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
        name: "FK_Projects_managerID_is_Accounts_id",
        using: "BTREE",
        fields: [
          { name: "managerID" },
        ]
      },
      {
        name: "FK_Projects_stateID_is_StateTags_id",
        using: "BTREE",
        fields: [
          { name: "stateID" },
        ]
      },
    ]
  });
};
