
module.exports = function(sequelize, DataTypes) {
var  Offering = sequelize.define("Offering", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 100]
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 100]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      images: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },

      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [7, 100]
        }
      },
      business_status: {
        type: DataTypes.ENUM,
        values: ["active", "closed"]
      },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "disabled", "pending", "inactive", "deleted"]
    }
  });

  Offering.associate = function(models) {
    Offering.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),

    Offering.hasMany(models.Rating, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        }),
        
    Offering.hasMany(models.Comment, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          })
        }
        return Offering;
}
