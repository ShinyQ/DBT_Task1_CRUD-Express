'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },    
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    nim: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
  }, {
    tableName:"students"
  });
  student.associate = function(models) {
      student.belongsTo(models.class,{
          as:"class",
          foreignKey:"class_id"
      });
  };
  return student;
};