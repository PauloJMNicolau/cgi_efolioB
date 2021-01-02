import * as Spaceship from './spaceship.js'
import * as Ambiente from './ambiente.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'
import * as CENA from './objetos.js'

function animate() {
    requestAnimationFrame( animate );
    CENA.atualizarRenderer("Principal");
    CENA.atualizarRenderer("Miniatura");
}



function init(){
    Ambiente.createSpace();
    //Luzes.createLight();
    Spaceship.createSpaceship();
    animate();
}

init();