//Código para criara os diferentes astros
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'

//Cria Estrelas
export function createEstrela(){

}

/* **************
*   Estrela     *
*************** */




/* **************
*   Asteroide   *
*************** */


//Cria Asteroides
export function createAsteroide(tipo){
    CENA.cena.scene.add(createPlanetaAnaoAgua(50,32,{x:0,y:120,z:50},{x:0,y:0,z:0}));
}

//Cria um planete anão
function createPlanetaAnaoAgua(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/astro1.png');                              //Loader para a textura
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.MirroredRepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(2,1);                                                                      //Quantidade de Repetições
    const geometria = new THREE.SphereGeometry(raio,segmentos,segmentos);                               //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0x00d7ff,
        side: THREE.FrontSide,
        map: texture,
        shininess:50
    });
    const planeta = new THREE.Mesh(geometria,material);
    planeta.rotation.x= rotacao.x;                                                                      //Roda o objeto
    planeta.rotation.y= rotacao.y;
    planeta.rotation.z= rotacao.z;        
    planeta.position.x= posicao.x;                                                                      //Posiciona a estrutura na posição
    planeta.position.y= posicao.y;
    planeta.position.z= posicao.z;
    planeta.castShadow=true;                                                                            //Gerar Sombras
    planeta.receiveShadow=true;                                                                         //Receber Sombras
    return planeta;
}