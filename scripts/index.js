
class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id
        this.title = title,
        this.description = description,
        this.imgUrl = imgUrl
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0
    }

    // Método getAllActivities => Debe retornar un arreglo con todas las actividades.
    getAllActivities() {
        return this.activities
    }

    // Método createActivity => Debe instanciar una actividad con los datos correspondientes y almacenarla en su arreglo.
    createActivity(title, description, imgUrl) {
        const id = ++this.id
        const activity = new Activity(id, title, description, imgUrl)
        this.activities.push(activity)
        return activity
    }

    // EXTRA CREDIT. Método deleteActivity => Debe recibir un id y filtrar el arreglo para eliminar la actividad correspondiente.
    deleteActivity(id) {
        this.activities = this.activities.filter((activity) => activity.id !== id);
    }
}

const repository = new Repository()


//////**  EVENTOS  **///////

// Implementar una función que tomará UNA instancia de Activity y la convertirá en elemento HTML. Recibira por parámetro un objeto instancia de Activity.
function construirActividad(activity) {
    
    // Extraer sus propiedades en variables utilizando destructuring.
    const {id, title ,description, imgUrl} = activity

    // Crear los elementos HTML que formarán parte de la tarjeta. Ej: <h3> para el título, <p> para la descripción, <img> para la imagen.
    const img = document.createElement("img")
    const h3 = document.createElement("h3")
    const p = document.createElement("p")
    const button = document.createElement("button")

    // Evento para poder borrar la tarjeta seleccionada
    button.addEventListener("click", () => {
        eliminarTarjeta(id)
    })

    // Asignar los valores a las propiedades correspondientes a cada uno de los elementos. Ej: a la propiedad innerHTML del elemento del título, asignar el valor correspondiente. 
    // A la propiedad src del elemento de la imagen, asignar el valor correspondiente.
    img.src = imgUrl
    h3.innerHTML = title
    p.innerHTML = description
    button.innerHTML = 'Eliminar'

    // Agregar a los elementos las clases CSS correspondientes que hayas implementado para darles estilos.
    img.className = 'imagen-nuevaActividad'
    h3.className = 'titulo-nuevaActividad'
    p.className = 'descripcion-nuevaActividad'
    button.className = 'btn-nuevaActividad'

    // Crear un elemento <div> que será la tarjeta donde incluiremos todos los demás elementos.
    const div = document.createElement("div")

    // Asigno un id al div contenedor
    div.id = id
    
    // “Appendear” al nuevo <div> los elementos creados anteriormente.
    div.append(img, h3, p, button)

    // Asignar al <div> la clase CSS que tengas implementada para darle estilos.
    div.className = 'tarjeta-nuevaActividad'

    // Retornar el <div> finalizado con todos los elementos correspondientes dentro.
    return div

}


// Implementar una función que se encargará de “convertir” TODAS las instancias de Activity en elementos HTML para agregarlos al contenedor correspondiente.
function convertirActividades() {

    // Seleccionar el contenedor donde queremos agregar las actividades.
    const contenedorActividades = document.getElementById('contenedor-nuevasActividades')
    console.log(contenedorActividades);

    // Vaciar el contenido actual del contenedor. Se puede hacer manipulando la propiedad innerHTML.
    contenedorActividades.innerHTML = ''

    // Obtener el listado completo de actividades mediante el método correspondiente de una instancia de Repository.
    const listadoActividades = repository.getAllActivities()
    console.log(listadoActividades);

    // Si no hay actividades disponibles se vuelve a mostrar el msj y se oculta el div.
    if (listadoActividades.length == '') {
        // Ocultar el mensaje que dice que no hay actividades.
        document.getElementById("sinActividades").classList.remove("ocultar")

        // Mostrar el contenedor con las nuevas actividades.
        document.getElementById("contenedor-nuevasActividades").classList.add("oculto")
    }

    // “Mapear” el listado de actividades para convertirlos todos en elementos HTML. Para ello utilizar el método “map”, aprovechando como callback la función que hicimos en el punto anterior. 
    // Guardar el resultado del mapeo en una nueva variable.
    const actividadesConvertidas = listadoActividades.map((actividad) => 
        construirActividad(actividad)
    )
    console.log(actividadesConvertidas);
    
    // “Appendear” todos los elementos HTML del nuevo array dentro del contenedor seleccionado. Para ello puedes utilizar el método forEach.
    actividadesConvertidas.forEach(actividad => 
        contenedorActividades.appendChild(actividad)
    );

}


// Implementar la función handler que se ejecutará al disparar el evento del botón.
const handler = () => {

    // Seleccionar los inputs de title, description e imgUrl.
    const tituloInput = document.getElementById('tituloActividad')
    const descripcionInput = document.getElementById('descripcionActividad')
    const imgUrlInput = document.getElementById('linkImg')
    
    // Tomar los valores ingresados en los inputs y guardarlos en variables.
    const titulo = tituloInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const imgUrl = imgUrlInput.value.trim();

    // Validar que estos valores estén completos.
    if (!titulo  || !descripcion  || !imgUrl ) {
        alert('Debe completar todos los campos.');
        return
    } 

    // Ocultar el mensaje que dice que no hay actividades.
    document.getElementById("sinActividades").classList.add("ocultar")

    // Mostrar el contenedor con las nuevas actividades.
    document.getElementById("contenedor-nuevasActividades").classList.remove("oculto")

    // Llamar al método correspondiente de la instancia de Repository para crear una nueva actividad.
    repository.createActivity(titulo, descripcion, imgUrl)
    
    // Invocar la función que implementamos en el punto anterior para “refrescar” el contenedor de actividades.
    convertirActividades()

    // Limpiar los campos de entrada después de agregar una nueva actividad.
    tituloInput.value = '';
    descripcionInput.value = '';
    imgUrlInput.value = '';

}


// 1. Seleccionar el botón que disparará el evento de agregar actividad y agregar un Event Listener. El evento, al dispararse, debe ejecutar la función que creamos en el punto anterior.
const btnAgregar = document.getElementById('boton-agregarActividad')
btnAgregar.addEventListener("click", (e) => {
    e.preventDefault()
    handler() 
});


// 2. Implementar la funcionalidad de eliminar tarjetas del contenedor al hacer click sobre ellas o sobre algún nuevo botón que podamos agregar a las mismas. 
function eliminarTarjeta(id) {
    repository.deleteActivity(id)
    convertirActividades()
}
