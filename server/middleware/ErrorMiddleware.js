import ApiError from '../exc/ApiError.js'

export default function ErrorMiddleware(err, req, res, next){
	console.log(err)
	console.log(ApiError)
	//if(ApiError.indexOf(err)!= -1){
	if (err instanceof ApiError){
		return res.status(err.status).json({message: err.message, error: err.errors})
	}
	return res.status(500).json({message: 'Непредвиденная ошибка'})
}