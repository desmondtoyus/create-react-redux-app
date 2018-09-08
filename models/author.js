module.exports = function(sequelize, DataTypes) {
    var Author = sequelize.define("Authors", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    Author.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Author.hasMany(models.Posts, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Author;
  };
  