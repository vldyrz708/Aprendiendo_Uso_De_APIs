    let pagina = 1; // Página inicial, comenzamos en la primera página

    // Obtén los botones del DOM utilizando sus IDs
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');

    // Valida que los botones existan en el DOM antes de añadir los eventos
    if (btnAnterior && btnSiguiente) {
        // Evento para el botón "Siguiente"
        btnSiguiente.addEventListener('click', () => {
            // Solo permite ir a la siguiente página si no estamos en la página 1000
            if (pagina < 1000) {
                pagina += 1; // Incrementa la página
                cargarPeliculas(); // Llama a la función para cargar las películas de la nueva página
            }
        });

        // Evento para el botón "Anterior"
        btnAnterior.addEventListener('click', () => {
            // Solo permite retroceder si no estamos en la página 1
            if (pagina > 1) {
                pagina -= 1; // Decrementa la página
                cargarPeliculas(); // Llama a la función para cargar las películas de la nueva página
            }
        });
    }

    // Función para cargar las películas desde la API
    const cargarPeliculas = async () => {
        try {
            // Realiza la solicitud a la API para obtener las películas populares
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a2c1977aafe46a408ff68d1d158e8023&language=es-MX&page=${pagina}`);
            
            // Verifica si la respuesta fue exitosa (código HTTP 200)
            if (respuesta.ok) {
                // Convierte la respuesta de la API a formato JSON
                const datos = await respuesta.json();
                let peliculas = ''; // Variable para almacenar el HTML generado de las películas

                // Recorre el array de películas que viene en la respuesta
                datos.results.forEach(pelicula => {
                    // Genera el HTML para cada película y lo agrega a la variable 'peliculas'
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                            <h3 class="titulo">${pelicula.title}</h3>
                        </div>
                    `;
                });

                // Inserta el HTML generado en el contenedor de la página para mostrar las películas
                document.getElementById('contenedor').innerHTML = peliculas;
            } else {
                // Maneja diferentes códigos de error de la API
                if (respuesta.status === 401) {
                    console.error('Error: API Key incorrecta'); // Si el código es 401, la clave API es incorrecta
                } else if (respuesta.status === 404) {
                    console.error('Error: Página no encontrada'); // Si el código es 404, la página no se encuentra
                } else {
                    console.error('Error: Hubo un problema desconocido'); // Otros errores no esperados
                }
            }
        } catch (error) {
            // Si ocurre un error durante la solicitud o procesamiento, lo captura y muestra en consola
            console.error('Error de red o al procesar la solicitud:', error);
        }
    };

    // Llama a la función inicial para cargar las películas al cargar la página
    cargarPeliculas();


    /*
    - 1. async:
        Función: La palabra clave async se usa para declarar una función asíncrona, lo que significa que puede contener operaciones que no bloquean 
        la ejecución del programa mientras esperan una respuesta (como hacer peticiones a una API o leer archivos).
        Comportamiento: Las funciones async siempre devuelven una promesa (Promise). Esto permite que puedas usar await dentro de ellas para esperar 
        a que ciertas operaciones asíncronas terminen antes de continuar con el siguiente paso del código.

    - 2. await:
        Función: await se utiliza dentro de una función asíncrona (async) para pausar la ejecución hasta que una promesa se resuelva (es decir, que termine 
        su proceso).
        Comportamiento: Si se coloca antes de una promesa (como una solicitud fetch), await hace que el código espere a que la promesa se resuelva (es decir, 
        se obtenga la respuesta de la API, por ejemplo) antes de continuar con la ejecución del resto del código. Sin await, la promesa se ejecutaría de forma 
        asíncrona y no se esperaría su resolución.

    - 3. fetch:
        Función: fetch es una API de JavaScript para hacer solicitudes HTTP (como GET, POST, etc.), es decir, para interactuar con servidores externos y obtener 
        o enviar datos.
        Comportamiento: fetch devuelve una promesa que se resuelve con la respuesta de la solicitud HTTP, lo que permite manejar el resultado de manera asíncrona 
        (sin bloquear el flujo de ejecución). Se puede usar await para esperar la respuesta de fetch y trabajar con ella una vez que esté disponible.
    */