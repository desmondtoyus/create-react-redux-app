module.exports = function(sequelize, DataTypes) {
    var Reply = sequelize.define("Reply", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [3, 225]
      },
      smiley:{
        type: DataTypes.ENUM,
        allowNull: true,
        values: ['happy', 'satisfiied', 'indifferent', 'sorrry', 'dont-care']
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "removed"]
      }

    });
  
    Reply.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Reply.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      Reply.belongsTo(models.Rating, {
        foreignKey: {
          allowNull: false
        }
      }),
      Reply.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: true
        }
      })
    };
  
    return Reply;
  };
  