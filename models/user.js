var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('Users', {
        annotation_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.DATE,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.DATE,
            field: 'last_name'
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        freezeTableName: true,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });

    return User;
}