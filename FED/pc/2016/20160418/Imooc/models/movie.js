var mongoose = require('mongoose')
var MovieSchema = new require('../schemas/movie')
var Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie