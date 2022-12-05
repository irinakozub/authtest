import database from './database.js';
import type from 'sequelize'

const roles = database.define('role', {
	value: {
		type: type.STRING, 
		unique: true
	}
})

export default roles