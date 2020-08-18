/**
 * C = Trebol
 * D = Diamantes
 * H = Corazones
 * S = Picas
 */
let deck = [];
const tipos = ['C', 'H', 'D', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0, puntosComputadora = 0;
//Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small');
const divCartaJugador = document.querySelector('#jugador-cartas')
const divCartaComputadora = document.querySelector('#computadora-cartas')
//crea el deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let j of tipos)
            deck.push(i + j);
    }
    for (let i of tipos) {
        for (let j of especiales) {
            deck.push(j + i);
        }
    }
    deck = _.shuffle(deck);//Revuelve la baraja
    console.log(deck);
    return deck;
}
crearDeck();
//Permite tomar la carta
const pedirCarta = () => {
    if (deck.length === 0) throw 'No hay cartas en el deck';
    let carta = deck.pop();
    console.log(deck);
    console.log(carta);//Carta debe ser de la baraja
    return carta;
}
//Calcular el calor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    console.log(valor);
    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : valor * 1;
    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10;
    // }
    // else {
    //     puntos = valor * 1;
    // }
    // return puntos;
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

btnNuevo.addEventListener('click',()=>{
    deck = [];
    crearDeck();
    puntosJugador=0,puntosComputadora=0;
    divCartaJugador.innerHTML='';
    divCartaComputadora.innerHTML='';
    puntosHTML[0].innerHTML ='0';
    puntosHTML[1].innerHTML ='0';
    console.clear();
    btnPedir.disabled=false;
    btnDetener.disabled=false;
});