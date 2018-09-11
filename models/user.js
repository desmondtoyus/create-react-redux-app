var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
var  User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [7, 100]
      }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 100]
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 100]
        }
      },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
        len: [7, 14]
      }
    },
    role: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true
        }
      },
      last_login: {
          allowNull: true,
        type: DataTypes.INTEGER
      },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "disabled", "pending", "inactive", "deleted"]
    }
    
  },

  {
hooks: {
  beforeCreate: user => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
          },
  beforeUpdate: user =>{ 
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
      }
  }
  })
  User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Rating, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        }),
        User.hasMany(models.Offering, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          }),
          User.hasMany(models.Comment, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          }),
          User.hasMany(models.Reply, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          }),
          User.belongsToMany(models.Reply, {
            through: {
              model: models.Comment,
              unique: false
            },
            constraints: false
          });
  }
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

return User;

}
