//Código para criara os diferentes astros
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'


//Cria Asteroides
export function createAstro(tipo, tamanho, segmentos, posicao, rotacao){
    switch(tipo){                                                                                   //Cria um astro com base no tipo pedido
        case "Estrela":
            CENA.cena.scene.add(createEstrela(tamanho,segmentos,posicao,rotacao));
            break;
        case "Lua":
            CENA.cena.scene.add(createAstroideLua(tamanho,segmentos,posicao,rotacao));
            break;
        case "Aquatico":
            CENA.cena.scene.add(createPlanetaAnaoAgua(tamanho,segmentos,posicao,rotacao));
            break;
        case "Fogo":
            CENA.cena.scene.add(createPlanetaAnaoFogo(tamanho,segmentos,posicao,rotacao));
            break;
        case "Asteroide":
            CENA.cena.scene.add(createAstroideIrregular(tamanho,segmentos,posicao,rotacao));
            break;
    }
    
}

/* **************
*   Estrela     *
*************** */

//Cria uma Estrela
function createEstrela(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/chama.jpg');                                //Loader para a textura
    texture.WrapS = THREE.MirroredRepeatWrapping;                                                       //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                               //Repetição Vertical
    texture.repeat.set(1,1);                                                                            //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                             //Tipo de Filtro da Textura
    const geometria = new THREE.SphereGeometry(raio,segmentos,segmentos);                       //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0xb9a8aa,
        side: THREE.FrontSide,
        map: texture,
        shininess:100
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


/* ***********************
*   Asteroide / Planeta  *
*********************** */

//Cria um planeta anão com textura de agua
function createPlanetaAnaoAgua(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/planeta2.jpg');                              //Loader para a textura
    texture.WrapS = THREE.RepeatWrapping;                                                               //Repetição Horizontal
    texture.WrapT = THREE.MirroredRepeatWrapping;                                                       //Repetição Vertical
    texture.repeat.set(5,3);                                                                            //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                             //Tipo do filtro da textura
    const geometria = new THREE.SphereGeometry(raio,segmentos,segmentos);                               //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0x00d7ff,
        side: THREE.FrontSide,
        map: texture,
        shininess:150
    });
    const estrela = new THREE.Mesh(geometria,material);
    estrela.rotation.x= rotacao.x;                                                                      //Roda o objeto
    estrela.rotation.y= rotacao.y;
    estrela.rotation.z= rotacao.z;        
    estrela.position.x= posicao.x;                                                                      //Posiciona a estrutura na posição
    estrela.position.y= posicao.y;
    estrela.position.z= posicao.z;
    estrela.castShadow=true;                                                                            //Gerar Sombras
    estrela.receiveShadow=true;                                                                         //Receber Sombras
    return estrela;
}

//Cria um planeta anão com textura de Fogo
function createPlanetaAnaoFogo(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/planeta1.jpg');                              //Loader para a textura
    texture.WrapS = THREE.MirroredRepeatWrapping;                                                       //Repetição Horizontal
    texture.WrapT = THREE.MirroredRepeatWrapping;                                                       //Repetição Vertical
    texture.repeat.set(2,1);                                                                            //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                             //Tipo de Filtro da Textura
    const geometria = new THREE.SphereGeometry(raio,segmentos,segmentos);                               //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0xff001a,
        side: THREE.FrontSide,
        map: texture,
        shininess:0
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

//Cria um asteroide com textura de pedra lunar
function createAstroideLua(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/astro1.png');                                //Loader para a textura
    texture.WrapS = THREE.MirroredRepeatWrapping;                                                       //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                               //Repetição Vertical
    texture.repeat.set(1,1);                                                                            //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                             //Tipo de Filtro da Textura
    const geometria = new THREE.DodecahedronGeometry(raio,segmentos);                                   //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0xb9a8aa,
        side: THREE.FrontSide,
        map: texture,
        shininess:100
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

//Cria um asteroide com textura de pedra marciana
function createAstroideIrregular(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/astro2.png');                                //Loader para a textura
    texture.WrapS = THREE.MirroredRepeatWrapping;                                                       //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                               //Repetição Vertical
    texture.repeat.set(1,1);                                                                            //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                             //Tipo de Filtro da Textura
    const geometria = new THREE.IcosahedronGeometry(raio,segmentos);                                   //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0xb9a8aa,
        side: THREE.FrontSide,
        map: texture,
        shininess:100
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