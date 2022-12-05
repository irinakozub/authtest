import User from '../config/Users.js'
import Token from '../config/Tokens.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class TokenService{
	genToken(payload){
		const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '15m'})
		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '5d'})
		return {accessToken, refreshToken}
	}

	async addToken(userId, refreshToken){
		try{
			let candidate = await Token.findOne({where:{resreshToken: refreshToken}, raw: true })
			if(candidate){
				candidate = await Token.update({resreshToken: refreshToken}, {where: {userId: candidate.userId}})
				return candidate.resreshToken
			}
			const tokenData = await Token.create({resreshToken: refreshToken, userId: userId})
			return tokenData.resreshToken
		} catch(e){
			console.log(e)
		}
	}
	
	async removeToken(refreshToken){
		try{
			const tokenData = await Token.destroy({where : {resreshToken: refreshToken}}) //change to reFresh
			return tokenData
		} catch(e){
			console.log(e)
		}
	}

	async getOneToken(token){
		try{
			const tokenData = await Token.findOne({where:{resreshToken: token}, raw: true })
			return tokenData
		} catch(e){
			console.log(e)
		}
	}

	validateAccessToken(token){
		try{
			const userData = jwt.verify(token, process.env.ACCESS_SECRET)
			return userData
		}catch(e){
			return null
		}
	}

	validateRefreshToken(token){
		try{
			const userData = jwt.verify(token, process.env.REFRESH_SECRET)
			return userData
		}catch(e){
			return null
		}
	}

}
export default new TokenService()