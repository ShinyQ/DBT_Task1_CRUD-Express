const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    static associate(models) {
      students.belongsTo(models.classes, {
        as: 'classes',
        foreignKey: 'class_id'
      });
    }
  }
  students.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    nim: DataTypes.STRING,
    class_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'students'
  });

  return students;
};
