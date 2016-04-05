
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    dato: DataTypes.DATE,
    body: DataTypes.TEXT('medium'),
    overskrift: DataTypes.STRING(100),
    billede: DataTypes.STRING,
    forside_billede: DataTypes.STRING,
  }, {
    tableName: 'tvnyheder',
    timestamps: false,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  return News;
};
