
(() => {
    'use strict'

    let deck = [],
        tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'K', 'Q'];

    let puntajeJugadores = [0,0];
    
    const btnPedir = document.querySelector('#btnPedir'),
          btnRetirarse = document.querySelector('#btnRetirarse'),
          btnNuevoJuego = document.querySelector('#btnNuevo');
    
    const puntajes = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas')
    
    const inicializacionJuego = ( numJugadores = 2 ) => {

        deck = deckRandom();
        puntajeJugadores = [];

        for( let i = 0; i < numJugadores; i++ ) {
            puntajeJugadores.push(0);
        }

        puntajes.forEach( elem => elem.innerHTML = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnRetirarse.disabled = false;
    }
    const deckRandom = () => {
        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( tipos of tipos ) {
                deck.push( i + tipos );
            }
        }
        
        for( tipos of tipos ) {
            for( especiales of especiales ) {
                deck.push( especiales + tipos );
            }
        }
        return _.shuffle( deck );
    };

    inicializacionJuego();

    const pedirCarta = () => {
        
        if( deck.length === 0 ) {
            throw 'Ya no hay más cartas en la baraja'
        }
        return deck.pop(); 
    }
    
    const valorCarta = ( carta ) => {
    
        let valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? ( valor === 'A' ) ? 11 : 10
                                  : valor * 1;
    }
    
    // Turno: 0 = computadora y el ultimo sera el jugador
    const acumularPuntos = ( carta, turno ) => {

        puntajeJugadores[turno] += valorCarta( carta );
        puntajes[turno].innerText = puntajeJugadores[turno];
        return puntajeJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    }

    const turnoComputadora = ( puntosMinimos ) => {
        
        let puntajeComputadora = 0;

        do {
            const carta = pedirCarta();
            puntajeComputadora = acumularPuntos(carta, 0);
            crearCarta(carta, 0);

        } while( ( puntajeComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );

        determinarGanador();
    }

    const determinarGanador = () => {
        
        const [ puntajeComputadora, puntosMinimos] = puntajeJugadores;
        
        setTimeout(() => {
            
            if( puntosMinimos === puntajeComputadora ) {
                alert('Es un empate!');
            }else if( puntosMinimos > 21 ) {
                alert('Computadora gana!');
            }else if( puntajeComputadora > 21 ) {
                alert('Jugador gana!');
            }else if( puntosMinimos > puntajeComputadora || puntosMinimos === 21 ) {
                alert('Jugador gana!'); 
            }else if( puntajeComputadora > puntosMinimos || puntajeComputadora === 21 ) {
                alert('Computadora gana!');
            }
    
        }, 80);
    }
    
    btnPedir.addEventListener('click', () => {
        
        const carta = pedirCarta();
        const puntajeJugador = acumularPuntos( carta, 1 );

        crearCarta(carta, 1);

    
        if( puntajeJugador > 21 ) {
            console.warn('Perdiste! Te pasaste de 21');
            btnPedir.disabled = true;
            btnRetirarse.disabled = true;
            turnoComputadora(puntajeJugador);
        }else if ( puntajeJugador === 21 ) {
            console.warn('Conseguiste hacer 21!');
            btnPedir.disabled = true;
            btnRetirarse.disabled = true;
            turnoComputadora(puntajeJugador);
        }
    });
    
    btnRetirarse.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnRetirarse.disabled = true;
        turnoComputadora(puntajeJugadores[1]);
    });
    
    btnNuevoJuego.addEventListener('click', () => {
        console.clear();
        inicializacionJuego();
    });
    
})();


