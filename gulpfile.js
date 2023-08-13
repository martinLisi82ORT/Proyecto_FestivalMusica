
// function tarea( done ) {

//     console.log('Desde la primer tarea');

//     done();
// }

// exports.tarea = tarea;

const { src, dest, watch, parallel } = require('gulp'); // Extrae "src", "dest" y "watch" de la Api de gulp

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); //Asegura que CSS funcione en cualquier navegador
const cssnano = require('cssnano'); //Comprime el codigo CSS
const postcss = require('gulp-postcss'); //Hace transformaciones por intermedio de autoprefixer y cssnano
const sourcemaps = require('gulp-sourcemaps');


// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// JacaScript
const terser = require('gulp-terser-js');

function css(done) {
    // console.log('Compilando SASS....')

    //src('src/scss/app.scss') // Identifica el archivo .SCSS a compilar
    src('src/scss/**/*.scss') // Identifica todos archivo .SCSS a compilar
        .pipe(sourcemaps.init()) //Inicializa el sourcemaps
        .pipe(plumber()) // En caso de errores hace que no se corte a compilacion
        .pipe(sass()) // Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.')) //Ubicacion donde se va a guardar (. para que sea la misma ubicacion que la hoja de estilo de CSS)
        .pipe(dest('build/css')) // Almacenarlo
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}

//Transporta el archivo .js desde "src" a la carpeta "build"
function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}


function dev(done) {
    // watch('src/scss/app.scss', css);
    // watch toma dos parametros: 
    // 1) que archivo o carpeta va a estar escucando por cambios
    // 2) que funcion va a estar asociada 
    watch('src/scss/**/*.scss', css); // busca todos los archivos para que aplique los cambios
    watch('src/js/**/*.js', javascript); // busca todos los archivos para que aplique los cambios

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); // se llama a "gulp dev" y esa funcion ya tiene asociada a "css" escuchandola por cambios

