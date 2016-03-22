var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    lodash = require('lodash'),
    plumber = require('gulp-plumber'),
    opn = require('opn'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require("gulp-rename"),
    zip = require('gulp-zip'),
    copy = require("gulp-copy"),
    autorem = require('autorem'),
    browserSync = require('browser-sync'),
    cssMqpacker = require('css-mqpacker'),
    cssgrace = require('cssgrace'),
    del = require('del'),
    autoprefixer = require('autoprefixer'),
    eslint = require('gulp-eslint'),
    cache = require('gulp-cache'),
    gulpif = require('gulp-if'),
    gulpPostcss = require('gulp-postcss'),
    postcss = require('postcss'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    spritesmith = require('gulp.spritesmith'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminOptipng = require('imagemin-optipng'),
    postcssShort = require('postcss-short'),
    postcssSorting = require('postcss-sorting'),
    sprites = require('postcss-sprites').default,
    updateRule = require('postcss-sprites').updateRule,
    seajs = require('gulp-seajs'),
    jade = require('gulp-jade'),
    reload = browserSync.reload;

var Base = function() {
    this.url = process.cwd();
    return {
        isPC: this.isPC('/pc/')
    }
}
Base.prototype.isPC = function(path) {
    var reg = RegExp(path),
        isExist = reg.test(this.url);
    if (isExist)
        return true;
    return false;
};
var WDO = new Base();


// jade
gulp.task('jade', function() {
    return gulp.src('./jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

//重命名project.md 文件
gulp.task('rename', function() {
    return gulp.src("./*.md")
        .pipe(rename("README.md"))
        .pipe(gulp.dest("./"));
});


gulp.task('styles', function() {
    if (WDO.isPC) {
        var processors = [
            sprites({
                stylesheetPath: './css',
                spritePath: './images/',
                basePath: './images' + '/icon',
                spritesmith: {
                    padding: 20
                },
                hooks: {
                    onUpdateRule: function(rule, token, image) {
                        var backgroundSizeX = (image.spriteWidth / image.coords.width) * 100;
                        var backgroundSizeY = (image.spriteHeight / image.coords.height) * 100;
                        var backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100;
                        var backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100;

                        backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX;
                        backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY;
                        backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX;
                        backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY;

                        var backgroundImage = postcss.decl({
                            prop: 'background-image',
                            value: 'url(' + image.spriteUrl + ')'
                        });

                        var backgroundSize = postcss.decl({
                            prop: 'background-size',
                            value: backgroundSizeX + '% ' + backgroundSizeY + '%'
                        });

                        var backgroundPosition = postcss.decl({
                            prop: 'background-position',
                            value: backgroundPositionX + '% ' + backgroundPositionY + '%'
                        });

                        var minSpriteWidth = postcss.decl({
                            prop: 'width',
                            value: image.coords.width + 'px'
                        });

                        var minSpriteHeight = postcss.decl({
                            prop: 'height',
                            value: image.coords.height + 'px'
                        });

                        rule.insertAfter(token, backgroundImage);
                        rule.insertAfter(backgroundImage, backgroundPosition);
                        rule.insertAfter(backgroundPosition, backgroundSize);
                        rule.insertAfter(minSpriteWidth, minSpriteWidth);
                        rule.insertAfter(minSpriteHeight, minSpriteHeight);
                    }
                },

                filterBy: function(image) {
                    if (!/\icon/.test(image.url))
                        return Promise.reject();
                    return Promise.resolve();
                }
            }),
            cssMqpacker({
                sort: function(a, b) {
                    return a.localeCompare(b);
                }
            }),
            autoprefixer({
                browsers: [
                    'last 9 versions'
                ]
            }),
            postcssSorting({
                "sort-order": "yandex"
            }),
            postcssShort,
            cssgrace
        ];
    } else {
        var processors = [
            sprites({
                stylesheetPath: './css',
                spritePath: './images/',
                basePath: './images' + '/icon',
                spritesmith: {
                    padding: 20
                },
                hooks: {
                    onUpdateRule: function(rule, token, image) {
                        var backgroundSizeX = (image.spriteWidth / image.coords.width) * 100;
                        var backgroundSizeY = (image.spriteHeight / image.coords.height) * 100;
                        var backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100;
                        var backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100;

                        backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX;
                        backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY;
                        backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX;
                        backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY;

                        var backgroundImage = postcss.decl({
                            prop: 'background-image',
                            value: 'url(' + image.spriteUrl + ')'
                        });

                        var backgroundSize = postcss.decl({
                            prop: 'background-size',
                            value: backgroundSizeX + '% ' + backgroundSizeY + '%'
                        });

                        var backgroundPosition = postcss.decl({
                            prop: 'background-position',
                            value: backgroundPositionX + '% ' + backgroundPositionY + '%'
                        });

                        var minSpriteWidth = postcss.decl({
                            prop: 'width',
                            value: image.coords.width + 'px'
                        });

                        var minSpriteHeight = postcss.decl({
                            prop: 'height',
                            value: image.coords.height + 'px'
                        });

                        rule.insertAfter(token, backgroundImage);
                        rule.insertAfter(backgroundImage, backgroundPosition);
                        rule.insertAfter(backgroundPosition, backgroundSize);
                        rule.insertAfter(minSpriteWidth, minSpriteWidth);
                        rule.insertAfter(minSpriteHeight, minSpriteHeight);
                    }
                },

                filterBy: function(image) {
                    if (!/\icon/.test(image.url))
                        return Promise.reject();
                    return Promise.resolve();
                }
            }),
            cssMqpacker({
                sort: function(a, b) {
                    return a.localeCompare(b);
                }
            }),
            autoprefixer({
                browsers: [
                    'last 9 versions'
                ]
            }),
            postcssSorting({
                "sort-order": "yandex"
            }),
            postcssShort,
            autorem({
                legacy: false,
                baseFontSize: 32
            })
        ];
    }
    return gulp.src('sass/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(gulpPostcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(reload({ stream: true }));
});

//开启本地 Web 服务器功能
gulp.task('serve', ['styles'], function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['./'],
            directory: true
        },
        open: true
    });

    gulp.watch([
        './*.html',
        './images/**/*',
    ], ['copy']).on('change', reload);

    gulp.watch('./sass/**/*.scss', ['styles', 'copy']);
    gulp.watch('./jade/**/*.jade', ['jade'], 'copy');
    gulp.watch('./js/**/*.js', ['scripts', 'copy']);
});


gulp.task('scripts', () => {
    return gulp.src('./js/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write('.'))
        .pipe(seajs('mainID'))
        .pipe(gulp.dest('./js'))
        .pipe(reload({ stream: true }));
});

// //多余文件删除
gulp.task('clean', function() {
    return gulp.src('./sass/.sass-cache', './**/.DS_Store')
        .pipe(clean({ force: true }))
        .pipe(gulp.dest('./clean'));
});


//压缩图片 - tinypng
gulp.task('imgmin', function() {
    var jpgmin = imageminJpegRecompress({
            accurate: true,
            quality: "high",
            method: "smallfry",
            min: 70,
            loops: 2,
            progressive: false,
            subsample: "default"
        }),
        pngmin = imageminOptipng({
            optimizationLevel: 4
        });
    gulp.src('images/*')
        .pipe(imagemin({
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest('dest/images'));
});

// //将相关项目文件复制到dest 文件夹下
gulp.task('copy', function() {
    gulp.src('./*.html')
        .pipe(gulp.dest('./dest'));
    gulp.src('./css/**/*')
        .pipe(gulp.dest('./dest/css'));
    gulp.src('./images/**/*.{jpg, png, gif, svg}')
        .pipe(gulp.dest('./dest/images'));
    gulp.src('./js/**/*')
        .pipe(gulp.dest('./dest/js'));
});


//默认任务
gulp.task('default', ['serve'], function() {
    return gulp.src('./dest/**/*').pipe(size({ title: 'File size', gzip: true }));
});

// //项目完成提交任务
gulp.task('minimg', ['imgmin'], function() {
    return gulp.src('dest/images/*').pipe(size({ title: 'min Images', gzip: true }));
});

// //项目完成提交任务
gulp.task('build2', ['rename', ], function() {

});

//打包主体build 文件夹并按照时间重命名
gulp.task('zip', function() {
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }
    var d = new Date();
    var year = d.getFullYear();
    var month = checkTime(d.getMonth() + 1);
    var day = checkTime(d.getDate());
    var hour = checkTime(d.getHours());
    var minute = checkTime(d.getMinutes());

    return gulp.src(['./dest/**/*.*'])
        .pipe(zip(year + month + day + hour + minute + '.zip'))
        .pipe(gulp.dest('./zip'));
});