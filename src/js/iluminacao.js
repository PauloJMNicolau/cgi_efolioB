import * as CENA from './objetos.js'
import * as THREE from './three.module.js'

export function createLight(){
    let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);
    light.castShadow = false;
    CENA.adicionarObjeto(light);
}

//Cria a Luz interna do cockpit
export function createLightCockpit(cor, intensidade, posicao){
    let light = new THREE.PointLight(cor, intensidade);
    light.position.set(posicao.x,posicao.y,posicao.z);
    light.castShadow = true;                                                        
    return light;
}

//Cria a Luz para as Asas
export function createLightAsa(cor,intensidade,posicao,direcao){
    let light = new THREE.DirectionalLight(cor, intensidade);
    light.position.set(posicao.x,posicao.y,posicao.z);
    light.target.position.set(direcao.x,direcao.y,direcao.z);
    light.castShadow = true;                                                        
    return light;
}