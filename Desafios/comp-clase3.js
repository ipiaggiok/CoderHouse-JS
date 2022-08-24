const titulo = document.querySelector('.titulo');
titulo.innerHTML = "JavaScript | Clase 3";  
const tema = document.querySelector('.tema');
tema.innerHTML = "Desafío Complementario N°1";   

// Insertar codigo a partir de aqui.


/* Cuantos elefantes se balancean sobre la tela de la araña? */

let elefantes = Number(prompt('¿Cuántos elefantes quiere que se balanceen sobre la tela de la araña?'));

    if ( elefantes == 0) {
        console.log('Por favor, ingresar un número mayor a cero');
    } else {
        for ( let i = 1; i <= elefantes; i++) {
            if ( i == 1 ) {
                console.log(`${i} elefante se balanceaba sobre la tela de una araña. Como veía que resistía, fué a llamar a otro elefante..`);
            } else if ( i >= 1 ) {
                console.log(`${i} elefantes se balanceaban sobre la tela de una araña. Como veían que resistía, fueron a llamar a otro elefante..`);
            } else if ( i == elefantes ) {
                break;
            }
        };
        console.log('Fin');
    };    
    


        

