(() => {
    'use strict'
    let deck = [],
        puntosJugadores = [];

    const tipos = ['C', 'H', 'D', 'S'],
        especiales = ['A', 'J', 'Q', 'K'],
        //Referencias del HTML

        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo'),
        puntosHTML = document.querySelectorAll('small'),
        divCartaJugador = document.querySelector('#jugador-cartas'),
        divCartaComputadora = document.querySelector('#computadora-cartas');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for(let i = 0;i<numJugadores;i++){
            puntosJugadores.push(0);
        }
    }

    //Crea el deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let j of tipos)
                deck.push(i + j);
        }
        for (let i of tipos) {
            for (let j of especiales) {
                deck.push(j + i);
            }
        }
        return _.shuffle(deck);//Revuelve la baraja
    }

    //Permite tomar la carta
    const pedirCarta = () => {
        if (deck.length === 0) throw 'No hay cartas en el deck';
        return deck.pop();
    }
    //Calcular el calor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : valor * 1;
    }



    const acumularPuntos = () => {

    }




    //Turno de la computadora
    const turnoComputadora = (puntosMinimo) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartaComputadora.append(imgCarta);
            if (puntosMinimo >= 21)
                break;
        } while ((puntosComputadora < puntosMinimo) && (puntosMinimo <= 21));

        setTimeout(() => {
            if (puntosJugador === puntosComputadora)
                alert('HAN EMPATADO!!!')
            else if (puntosJugador > 21 || (puntosComputadora < 21 && puntosComputadora > puntosJugador))
                alert('LA COMPUTADORA HA GANADO!!!')
            else if (puntosComputadora > 21 || puntosJugador === 21 && puntosComputadora < puntosJugador)
                alert('HAS GANADO!!!');
        }, 20);
    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartaJugador.append(imgCarta)

        if (puntosJugador > 21) {
            console.warn('Has perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
        else if (puntosJugador === 21) {
            console.warn('21!!!')
            btnPedir.disabled = true;
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
        puntosJugador = 0, puntosComputadora = 0;
        divCartaJugador.innerHTML = '';
        divCartaComputadora.innerHTML = '';
        puntosHTML[0].innerHTML = '0';
        puntosHTML[1].innerHTML = '0';
        console.clear();
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
})();