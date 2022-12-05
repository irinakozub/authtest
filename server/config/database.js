import Sequelize from "sequelize"
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: process.env.DB_HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

/*
try{
  sequelize.sync({logging: console.log, force: true}).then(() => {
    console.log(`Database & tables updated!`)})
} catch(e){
  console.log(e)
}*/

export default sequelize