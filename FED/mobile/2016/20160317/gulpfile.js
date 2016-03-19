var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    opn = require('opn'),
    cleanf = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require("gulp-rename"),
    copy = require("gulp-copy"),
    autorem = require('autorem'),
    browserSync = require('browser-sync'),
    cssMqpacker = require('css-mqpacker'),
    atImport = require("postcss-import")
opacity = require('postcss-opacity'),
    messages = require('postcss-messages'),
    del = require('del'),
    autoprefixer = require('autoprefixer'),
    cache = require('gulp-cache'),
    gulpPostcss = require('gulp-postcss'),
    postcss = require('postcss'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminOptipng = require('imagemin-optipng'),
    postcssShort = require('postcss-short'),
    postcssSorting = require('postcss-sorting'),
    sprites = require('postcss-sprites').default,
    updateRule = require('postcss-sprites').updateRule,
    reload = browserSync.reload,
    postcssNested = require('postcss-nested'),
    crip = require('postcss-crip'),
    clean = require('postcss-clean'),
    ip = require('ip'),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip'),
    seajs = require('gulp-seajs'),
    jade = require('gulp-jade'),
    ipn = ip.address();



var Base = function() {
    this.url = process.cwd();
    return {
        isPC: this.isPC('mobile')
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

//重命名project.md 文件
gulp.task('rename', function() {
    return gulp.src("./*.md")
        .pipe(rename("README.md"))
        .pipe(gulp.dest("./"));
});

gulp.task('styles', function() {
    if (!WDO.isPC) {
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
                            value: backgroundSizeX.toFixed(3) + '% ' + backgroundSizeY.toFixed(3) + '%'
                        });

                        var backgroundPosition = postcss.decl({
                            prop: 'background-position',
                            value: backgroundPositionX.toFixed(3) + '% ' + backgroundPositionY.toFixed(3) + '%'
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

            postcssNested,
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
            opacity,
            crip,
            clean,
            messages
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
                            value: backgroundSizeX.toFixed(3) + '% ' + backgroundSizeY.toFixed(3) + '%'
                        });

                        var backgroundPosition = postcss.decl({
                            prop: 'background-position',
                            value: backgroundPositionX.toFixed(3) + '% ' + backgroundPositionY.toFixed(3) + '%'
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
            postcssNested,
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
                baseFontSize: 100
            }),
            crip,
            clean,
            messages
        ];
    }
    return gulp.src(['postcss/**/*.css'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulpPostcss(processors))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(reload({ stream: true }));
});

// jade
gulp.task('jade', function() {
    return gulp.src('./jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});
//开启本地 Web 服务器功能
gulp.task('serve', ['styles', 'jade'], function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['./'],
            directory: true
        },
        open: 'external'
    });

    gulp.watch([
        './*.html',
        './images/**/*',
        './jade/**/*.jade',
    ], ['copy']).on('change', reload);

    gulp.watch('./postcss/**/*.css', ['styles', 'copy']);
    gulp.watch('./jade/**/*.jade', ['jade']);
    gulp.watch('./js/**/*.js', ['scripts', 'copy']);
});

// 防止图片压缩后无法恢复，做了备份
gulp.task('backups', function() {
    gulp.src(['./images/**/*'])
        .pipe(gulp.dest('./images/_imgbackups'));
});

gulp.task('scripts', function() {
    return gulp.src('./js/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write('.'))
        .pipe(seajs('mainID'))
        .pipe(gulp.dest('./js'))
        .pipe(reload({ stream: true }));
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

// //多余文件删除
gulp.task('clean', function() {
    return gulp.src('./images/_imgbackups')
        .pipe(clean({ force: true }))
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
gulp.task('default', ['serve']);

// 原始图片备份
gulp.task('bak', ['backups'], function() {
    console.log('您的原始图片已经备份至，当前文件夹‘_imgbackups’目录下！！')
});
// 图片压缩
gulp.task('min', ['imgmin'], function() {
    console.log('您的原始图片已经备份至，当前文件夹‘_imgbackups’目录下！！')
    return gulp.src('dest/images/*').pipe(size({ title: 'min Images', gzip: true }));
});
// 确定无误之后可以删除备份文件
gulp.task('clean1', ['clean'], function() {
    console.log('您已删除原始图片！！路径为：' + './images/_imgbackups')
});
