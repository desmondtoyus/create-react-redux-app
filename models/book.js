module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Books", {
      // Giving the Author model a name of type STRING
      isbn: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    });
  

  
    return Book;
  };