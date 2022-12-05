import database from './database.js';
import type from 'sequelize'

const tokens = database.define('token', {
	resreshToken:{
		type: type.STRING,
		required: true
	},
	userId:{
		type: type.INTEGER,
		allowNull: false
	}
})

export default tokens
