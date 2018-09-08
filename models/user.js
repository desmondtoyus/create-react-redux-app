var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('Users', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
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

    User.prototype.comparePassword = function (password) {
        console.log('COMPARE PASSWORD = ', bcrypt.compareSync(password, this.password))
        return bcrypt.compareSync(password, this.password);
        // return true;
      }
    // User.prototype.getFullname = function() {
    //     console.log()
    //     // return [this.username, this.username].join(' ');
    //   };

    return User;
}