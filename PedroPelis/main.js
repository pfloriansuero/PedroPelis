// Libreria Muuri calcular los movimientos que haran las imagenes al filtrar
const grid = new Muuri('.grid',{
    layout: {
        rounding: false
    }
});

// Opacidad del contenido al cargar la pagina
window.addEventListener('load',()=>{
    grid.refreshItems().layout
    
    document.getElementById('grid').classList.add('imagenes-cargadas')

    //selecciona todas las etiquetas (id) de los elementos 'a'
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento)=>{
        elemento.addEventListener('click',(evento)=>{
            //quita las interaciones por default al hacer click
            evento.preventDefault();
            //quita la clase activo para que aparezca en negrita
            enlaces.forEach((enlace)=> enlace.classList.remove('activo'))
            evento.target.classList.add('activo')

            //Obtenemos la categoria y la almacenamos en la variable
            const categoria = evento.target.innerHTML.toLowerCase();

            //Si la categoria que obtengo es = todos muestrame todas las imagenes
            categoria === 'todos' ? grid.filter('[data-categoria]'):

            //Filtrame la categoria dependiendo la que se alla almacenado en la variable 'categoria'
            grid.filter(`[data-categoria="${categoria}"]`);

        })
    })

    //Agregamos el listener de la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento)=>{
        //Obtiene los valores a partir de lo que escribamos
        const busqueda = evento.target.value;
        //filtrara mientras escribimos las palabras con coincidiencias de las etiquetas (en el codigo index.html)
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda))
    })

    // Agregamos el listener para las imagenes
    const overlay = document.getElementById('overlay');

    // Obtenemos las rutas de todas las imagenes y despues dus descripciones
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {
        const ruta = elemento.getAttribute('src');
        const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

        // La ventana emergente saldra de acuerdo a la ruta y descipcion de la imagen seleccionada
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;

        })
    })

    // Listener del boton de cerrar
    document.querySelector('#btn-cerrar').addEventListener('click', ()=>{
        overlay.classList.remove('activo')
    })
})


// Gestionando el modo oscuro
const contenedor_boton = document.querySelector(".container-principal");
const toggle = document.getElementById('toggle');
const modoOscuro = document.getElementById('p1') 
const modoClaro = document.getElementById('p2') 

toggle.onclick = function(){
    toggle.classList.toggle('active');
    contenedor_boton.classList.toggle('active');
    modoOscuro.classList.toggle('ocultar')
    modoClaro.classList.toggle('ocultar')
};