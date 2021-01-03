import * as Spaceship from './spaceship.js'
import * as Ambiente from './ambiente.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'
import * as Inimigos from './inimigos.js'
import * as CENA from './objetos.js'
import * as Astro from './astros.js'

function animate() {
    requestAnimationFrame( animate );
    CENA.atualizarCameras();
    CENA.atualizarRenderer("Principal");
    CENA.atualizarRenderer("Miniatura");
   
}



function init(){
    CENA.inicializarCena();
    Ambiente.createSpace();
    Luzes.createLight();
    //Spaceship.createSpaceship();
    //Inimigos.createNave();
    Astro.createAsteroide(1);
    animate();
}

init();