
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    forkortelse: DataTypes.TEXT('tiny'),
    channel_code: DataTypes.STRING(45),
    active: DataTypes.BOOLEAN,
    navn: DataTypes.STRING(100),
    type: DataTypes.BOOLEAN,
    kategori: DataTypes.STRING,
    farve: DataTypes.STRING(7),
    sortering_paa_start_siden: DataTypes.INTEGER(11),
    sortering_film_idag: DataTypes.INTEGER(5),
    presseside: DataTypes.TEXT('tiny'),
    logo: DataTypes.TEXT('tiny'),
    s_logo: DataTypes.TEXT('tiny'),
    b_logo: DataTypes.TEXT('tiny'),
    country: {
      type: DataTypes.ENUM,
      values: [
        'dk', 'se', 'no', 'fr', 'uk', 'usa', 'de', 'lv',
        'so', 'lt', 'es', 'cz', 'cr', 'hu', 'pl', 'fi',
        'ro', 'ru', 'bg', 'ke', 'ng', 'mo', 'be', 'ch'
      ],
    },
    program_katagori: DataTypes.INTEGER(5),
    sdescription: DataTypes.STRING,
    char_set: DataTypes.STRING(30),
    film_tab: DataTypes.INTEGER(11),
  }, {
    tableName: 'kanaler',
    timestamps: false,
    classMethods: {
      associate: (models) => {
        Channel.hasMany(models.Program, { foreignKey: 'kanal' });
        // associations can be defined here
      },
    },
  });
  return Channel;
};
