module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [3, 225]
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "removed"]
      }

    });
  
    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      Comment.belongsTo(models.Offering, {
        foreignKey: {
          allowNull: false
        }
      }),
      Comment.belongsTo(models.Rating, {
        foreignKey: {
          allowNull: false
        }
      }),

      Comment.hasMany(models.Reply, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: true
        }
      })
    };
  
    return Comment;
  };
  