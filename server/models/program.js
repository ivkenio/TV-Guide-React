
module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    program_id: DataTypes.INTEGER(9),
    schedule_id: DataTypes.INTEGER(10),
    images_retrieved: DataTypes.BOOLEAN,
    has_images: DataTypes.BOOLEAN,
    kanal: DataTypes.INTEGER(3),
    navn: DataTypes.STRING(100),
    dato: DataTypes.DATEONLY,
    tid: DataTypes.TIME,
    slut: DataTypes.TIME,
    genre: DataTypes.STRING(100),
    image_url: DataTypes.STRING,
    forklaring: DataTypes.TEXT,
  }, {
    tableName: 'programmer',
    timestamps: false,
    classMethods: {
      associate: (models) => {
        Program.belongsTo(models.Channel, { foreignKey: 'kanal' });
      },
    },
  });
  return Program;
};
