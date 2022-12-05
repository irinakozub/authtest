import database from './database.js';
import type from 'sequelize'

const users = database.define('user', {
	name:{
		type: type.STRING
	},
	email: {
		type: type.STRING,
		unique: true,
		required: true
	},
	password: {
		type: type.STRING,
		required: true
	}
})

export default users
