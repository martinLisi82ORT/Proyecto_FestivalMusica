document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija(); //Funcion para que quede la barra fija
    crearGaleria(); //Funcion  que crea la galeria
    scrollNav(); //Funcion para redireccion mas lenta
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function () {
        // console.log(sobreFestival.getBoundingClientRect()) //Ubicacion del elemento
        if (sobreFestival.getBoundingClientRect().bottom < 0) { //Condicional donde colocar la barra
            // console.log('Ya pasamos el elemento')
            barra.classList.add('fijo'); //Se agrega la barra
            body.classList.add('body-scroll');
        } else {
            // console.log('Aun no....')
            barra.classList.remove('fijo'); //Se quita la barra
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            // console.log(e.target.attributes.href.value);
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        })
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes'); //Donde se va a inyectar la galeria
    // galeria.textContent = 'Vamos a crear la galeria';

    for (let i = 1; i <= 12; i++) { //Muestra las imagenes en un for
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
            alt="Imagen galeria">
        `;
        imagen.onclick = function () { //Crea elemento y le asigna un evento
            mostrarImagen(i) //Se le pasa un elemnto
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    // console.log('Mostrando....' + id)
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
        alt="Imagen galeria">
    `;

    //Crea overlay con la imagen
    const overlay = document.createElement('DIV'); //Se crea un DIV
    overlay.appendChild(imagen); //Se agrega la imagen seleccionada
    overlay.classList.add('overlay'); //Se le crea una clase para luego darle estilos

    //Opcion cerrar el modal haciendo click fuera de la imagen
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body'); //Elimina el fijar-body
        overlay.remove();
    };

    //Boton para cerrar el Modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X'; //Da a entender que lo puede cerrar
    cerrarModal.classList.add('btn-cerrar'); //Crear clase
    cerrarModal.onclick = function () { //Activa el boton X para salir
        const body = document.querySelector('body');
        body.classList.remove('fijar-body'); //Elimina el fijar-body
        overlay.remove();
    };
    overlay.appendChild(cerrarModal); //Se agrega al overlay

    //Para añadirlo al HTMP y mostrar la variable en pantalla:    
    const body = document.querySelector('body'); //Se selecciona donde se quiere mostrar
    body.appendChild(overlay); //Se agrega en el <body> y se muestra la imagen
    body.classList.add('fijar-body'); //Fija el body cuando se selecciona una imagen
}