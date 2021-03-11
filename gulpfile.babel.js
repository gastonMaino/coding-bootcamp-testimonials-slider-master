//pug
import pug from "gulp-pug"
const production = false

//css
import postcss from "gulp-postcss"
import cssnano from "cssnano"
import autoprefixer from "autoprefixer"

//javascrip
import gulp from "gulp"
import babel from "gulp-babel"
import terser from "gulp-terser"
import concat from "gulp-concat"

const pluginsCss = [
    cssnano(),
    autoprefixer()
]

//sass
import sass from 'gulp-dart-sass'

//purgeCss
import clean from 'gulp-purgecss'

//clean cache
import cacheBust from 'gulp-cache-bust'

//Optimizacion imagenes
import imagemin from 'gulp-imagemin'

//browser sync
import { init as server, stream, reload } from 'browser-sync'

//plumber
import plumber from 'gulp-plumber'



gulp.task('styles', () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(plumber())
        .pipe(concat('styles.css'))
        .pipe(postcss(pluginsCss))
        .pipe(gulp.dest('./public/css'))
        .pipe(stream())
})



gulp.task('babel', () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest('./public/js'))
})

gulp.task('views', () => {
    return gulp
        .src('./src/views/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: production ? false : true
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public'))
})

gulp.task('sass', () => {
    return gulp
        .src('./src/scss/styles.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss(pluginsCss))
        .pipe(gulp.dest('./public/css'))
        .pipe(stream())
})

gulp.task('clean', () => {
    return gulp
        .src('./public/css/styles.css')
        .pipe(plumber())
        .pipe(clean({
            content: './public/*.html'
        }))
        .pipe(gulp.dest('./public/css'))
})

gulp.task('imgmin', () => {
    return gulp
        .src('./src/assets/images/**/*')
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./public/assets/images'))
})

gulp.task('default', () => {
    server({
        server: './public'
    })
    gulp.watch('./src/css/*.css', gulp.series('styles'))
    gulp.watch('./src/views/**/*.pug', gulp.series('views')).on('change', reload)
    //gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload)
})