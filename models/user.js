var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('Users', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        freezeTableName: true,
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
    });

    return User;
}