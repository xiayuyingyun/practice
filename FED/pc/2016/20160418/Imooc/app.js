var express = require('express')
var path = require('path')
var moogoose = require('moogoose')
var _= require('underscore')
var Movie = require('./models/movie')
var port = process.env.POST || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.bodyParser())
app.use(express.static(path.join(_dirname, 'bower_components')))
app.locals.moment = require('moment')
app.listen(port)

console.log('views started of port' + port)

// 定义路由，访问地址要与定义的路由规则要匹配

// index page
app.get('/', function(req, res) {
	Movie.fetch(function() {
		if (err) {
			console.log(err)
		}
	})
	res.render('index', {
		title: "imooc 首页",
		movies: movies
	})
})
// detail page
app.get('/movie/:id', function(req, res) {
	var if = req.params.id
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc' + movie.title, 
			movie: movie
		})
	})
	
}) 

// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: "imooc 后台录入页",
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
}) 

//admin update movie
app.get('/admin/update/:id', function(req, res) {
	var if = req.params.id

	if (id) {
		Movie.findById(if, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页',
			})
		})
	}
})
// admin/mpost movie
app.post('/admin/movie/new', function() {
	var _movie

	if (id !== 'underfined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie, moviedObj)
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/ + movie._id')
			})
		})
	}
	else {
		_movie = new Movie({
			doctor: moviedObj.doctor,
			title: moviedObj.title,
			country: moviedObj.country,
			language: moviedObj.language,
			year: moviedObj.year,
			poster: moviedObj.poster,
			summary: moviedObj.summary,
			flash: moviedObj.flash
		})
		_movie.save(function(err, movie) {
			if (err) {
				console.log(err)
			}
			res.redirect('/movie/ + movie._id')
		})
	}
})

// list page
app.get('/admin/list', function(req, res) {
	Movie.fetch(function() {
		if (err) {
			console.log(err)
		}
	})
	res.render('index', {
		title: "imooc 首页",
		movies: movies
	})
	res.render('index', {
		title: "imooc 列表页",
		movies: movies
	})
}) 

// index page
app.get('/', function(req, res) {
	res.render('index', {
		title: "imooc 首页"
	})
}) 