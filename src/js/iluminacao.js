import * as CENA from './objetos.js'
import * as THREE from './three.module.js'

export function createLight(){
    let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);             //Cria uma luz ambiente
    light.castShadow = false;                                                   //que não gera sombras
    CENA.adicionarObjeto(light);                                                //adiciona na cena
}

//Cria a Luz interna do cockpit das naves
export function createLightCockpit(cor, intensidade, posicao){              
    let light = new THREE.PointLight(cor, intensidade);                         //Cria uma luz do tipo de ponto com a cor e intensidade fornecidas
    light.position.set(posicao.x,posicao.y,posicao.z);                          //Coloca a luz na posição fornecida
    light.castShadow = true;                                                    //A luz cria sombras
    return light;
}

//Cria a Luz para as Asas
export function createLightAsa(cor,intensidade,posicao,direcao){                
    let light = new THREE.DirectionalLight(cor, intensidade);                   //Cria uma luz direcional com cor e intensidade fornecida
    light.position.set(posicao.x,posicao.y,posicao.z);                          //Coloca na posição fornecida
    light.target.position.set(direcao.x,direcao.y,direcao.z);                   //Define a direção que deve iluminar
    light.castShadow = true;                                                    //A luz cria sombras
    return light;
}