'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
		id:
    {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
		firstName:
    {
      type: Sequelize.STRING,
		  allowNull: false,
			validate:
      {
				notNull:
        {
					msg: 'First name cannot be null.'
				},
				notEmpty:
        {
				  	msg: 'A first name is required.'
				}
			}
    },
    lastName:
    {
			type: Sequelize.STRING,
			allowNull: false,
			validate:
      {
				notNull:
        {
					msg: 'Last name cannot be null.'
				},
				notEmpty:
        {
				  	msg: 'A last name is required.'
				}
			}
		},
		emailAddress:
    {
			type: Sequelize.STRING,
			allowNull: false,
			unique:
      {
				args: true,
				msg: 'Email already in use.'
			},
			validate:
      {
				notNull:
        {
					msg: 'Email address cannot be null.'
				},
				notEmpty:
        {
				  	msg: 'An email address is required.'
				},
				isEmail:
        {
					msg: 'A valid email is required.'
				},
			}
		},
		password:
    {
			type: Sequelize.STRING,
			allowNull: false,
			validate:
      {
				notNull:
        {
					msg: 'Password cannot be null.'
				},
				notEmpty:
        {
				  	msg: 'A password is required.'
				}
			}
		},
	}, { sequelize });

	User.associate = (models) => {
		User.hasMany(models.Course, {
			as: "courses",
			foreignKey: {
			  name: 'userId'
			}
		})
	};

    return User;
};
