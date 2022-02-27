const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    static associate(models) {
      classes.hasMany(models.students, {
        as: 'students',
        foreignKey: 'class_id'
      });
    }
  }
  classes.init({
    name: DataTypes.STRING,
    batch: DataTypes.INTEGER,
    group_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classes'
  });

  return classes;
};
