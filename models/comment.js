module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
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
      
      Comment.belongsTo(models.Reply, {
        foreignKey: {
          allowNull: false
        }
      })
    };


 
  
    return Comment;
  };
  