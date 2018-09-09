module.exports = function(sequelize, DataTypes) {
    var Rating = sequelize.define("Rating", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [3, 225]
      },
      smiley:{
        type: DataTypes.ENUM,
        allowNull: true,
        values: ["happy", "satisfiied", "indifferent", "unsatisfied", "terrible"]
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["active", "removed"]
      }

    });
  
    Rating.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Rating.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      Rating.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: true
        }
      }),
      Rating.hasMany(models.Reply, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: true
        }
      })
    };
  
    return Rating;
  };
  