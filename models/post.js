module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Post.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Post.belongsTo(models.Authors, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };
  