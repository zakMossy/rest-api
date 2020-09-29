'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init({
		id:
    {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
    },
    title:
    {
			type: Sequelize.STRING,
			allowNull: false,
			validate:
      {
				notNull:
        {
					msg: 'Title cannot be null.'
				},
				notEmpty:
        {
				  msg: 'A title is required.'
				}
			}
		},
		description:
    {
			type: Sequelize.TEXT,
			allowNull: false,
			validate:
      {
				notNull:
        {
					msg: 'Description cannot be null.'
				},
				notEmpty:
        {
				  msg: 'A description is required.'
				}
			}
		},
		estimatedTime:
    {
      type: Sequelize.STRING,
		},
		materialsNeeded:
    {
      type: Sequelize.STRING,
    },
	}, { sequelize });

	Course.associate = (models) => {
		Course.belongsTo(models.User, {
			as: "user",
			foreignKey: {
				name: 'userId',
				allowNull: false,
				validate: {
					notNull: {
						msg: 'User Id cannot be null.'
					}
				}
			}
		})
	};

    return Course;
};
