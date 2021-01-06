//Código para criara os diferentes astros
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'


//Cria Asteroides
export function createAstro(tipo, tamanho, segmentos, posicao, rotacao){
    const astro = new THREE.Group();
    switch(tipo){                                                                                   //Cria um astro com base no tipo pedido
        case "Estrela":
            astro.add(createEstrela(tamanho,segmentos,{x:0,y:0,z:50},rotacao));
            astro.type="Estrela";
            astro.name="Estrela";
            break;
        case "Lua":
            astro.add(createAstroideLua(tamanho,segmentos,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
        case "Aquatico":
            astro.add(createPlanetaAnaoAgua(tamanho,segmentos,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
        case "Fogo":
            astro.add(createPlanetaAnaoFogo(tamanho,segmentos,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
        case "Asteroide":
            astro.add(createAstroideIrregular(tamanho,segmentos,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
    }
    astro.position.x = posicao.x;
    astro.position.y = posicao.y;
    astro.position.z = posicao.z
    CENA.adicionarObjeto(astro);
}

//Remover Astros
export function removerAstro(objeto){
    let numero = Math.round(Math.random()*400);
    let negativo = Math.random()*2;
    let tamanho = Math.round(Math.random()*30+10);
    let tipo = Math.round(Math.random()*4);
    let r = Math.round(Math.random()*8+1);
    let rotacao = {x:Math.PI/r,y:Math.PI/r,z:Math.PI/r};
    if(negativo<1){
        numero *= -1;
    }
    let posicao = {x:numero, y:1500, z:50}
    CENA.removerObjeto(objeto);
    for(let i = objeto.children.length-1; i==0;i--){
        objeto.children[i].material.dispose();
    }
    switch(tipo){
        case 0:
            tipo = "Lua";
            createAstro(tipo,tamanho,1,posicao,rotacao);
            break;
        case 1:
            tipo ="Asteroide";
            createAstro(tipo,tamanho,0,posicao,rotacao);
            break;
        case 2:
            tipo = "Fogo";
            createAstro(tipo,tamanho,32,posicao,rotacao);
            break;
        case 3:
            tipo="Aquatico";
            createAstro(tipo,tamanho,32,posicao,rotacao);
            break;
        case 4:
            tipo="Estrela";
            createAstro(tipo,tamanho,32,posicao,rotacao);
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
    const geometria = new THREE.SphereBufferGeometry(raio,segmentos,segmentos);                       //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0xb9a8aa,
        side: THREE.FrontSide,
        map: texture,
        shininess:100,
        emissiveIntensity:0.5,
        emissive: 0xb9a8aa
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

//Muda o tamanho das Estrelas
export function scaleStar(objeto, direcao){
    for(let i = 0; i < objeto.children.length; i++){
        let scale = objeto.children[i].scale;
        if(scale.x+direcao >=0.95 && scale.x+direcao <=1.05){
            scale.x += direcao;
            scale.y += direcao;
            scale.z += direcao;
            objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeScale(scale.x, scale.y, scale.z ) );
        }
    }
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
    const geometria = new THREE.SphereBufferGeometry(raio,segmentos,segmentos);                               //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({
        color: 0x00d7ff,
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

//Cria um planeta anão com textura de Fogo
function createPlanetaAnaoFogo(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/planeta1.jpg');                              //Loader para a textura
    texture.WrapS = THREE.MirroredRepeatWrapping;                                                       //Repetição Horizontal
    texture.WrapT = THREE.MirroredRepeatWrapping;                                                       //Repetição Vertical
    texture.repeat.set(2,1);                                                                            //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                             //Tipo de Filtro da Textura
    const geometria = new THREE.SphereBufferGeometry(raio,segmentos,segmentos);                               //Geometria do objeto
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
    const geometria = new THREE.DodecahedronBufferGeometry(raio,segmentos);                                   //Geometria do objeto
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
    const geometria = new THREE.IcosahedronBufferGeometry(raio,segmentos);                                   //Geometria do objeto
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

//Aplica Rotação aos Asteroides e Planetas
export function rodarAstros(objeto){
    for(let i = 0; i < objeto.children.length; i++){
        objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI/50) );
        objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI/1000) );
    }
}