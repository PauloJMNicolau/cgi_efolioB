//Código para criara os diferentes astros
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'

//Cria Astros com base num tipo fornecido
export function createAstro(tipo, tamanho, posicao, rotacao){
    const astro = new THREE.Group();                                                                //Cria um grupo para o astro
    switch(tipo){                                                                                   //Cria um astro com base no tipo pedido
        case "Estrela":
            astro.add(createEstrela(tamanho,20,{x:0,y:0,z:50},rotacao));
            astro.type="Estrela";
            astro.name="Estrela";
            break;
        case "Lua":
            astro.add(createAstroideLua(tamanho,1,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
        case "Aquatico":
            astro.add(createPlanetaAnaoAgua(tamanho,15,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
        case "Fogo":
            astro.add(createPlanetaAnaoFogo(tamanho,15,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
        case "Asteroide":
            astro.add(createAstroideIrregular(tamanho,0,{x:0,y:0,z:50},rotacao));
            astro.type="Astro";
            astro.name="Astro";
            break;
    }
    astro.position.x = posicao.x;                                                                   //Posiciona o objeto na posição fornecida
    astro.position.y = posicao.y;
    astro.position.z = posicao.z
    CENA.adicionarObjeto(astro);
}

//Move os Astros para fora do cenario
export function removerAstro(objeto){
    let numero = CENA.gerarPosicao()                                        //Gerar uma nova posição x
    let posicao = {x:numero, y:1500, z:50}                                  //Define a posição final
    objeto.position.x=posicao.x;                                            //Posiciona o objeto na nova posição
    objeto.position.y=posicao.y;
    objeto.position.z=posicao.z;
}

/* **************
*   Estrela     *
*************** */

//Cria uma Estrela
function createEstrela(raio, segmentos, posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/chama.jpg');                         //Loader para a textura
    texture.WrapS = THREE.MirroredRepeatWrapping;                                               //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                       //Repetição Vertical
    texture.repeat.set(1,1);                                                                    //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                     //Tipo de Filtro da Textura
    const geometria = new THREE.SphereGeometry(raio,segmentos,segmentos);                       //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({                                              //Material a aplicar
        color: 0xb9a8aa,                                                                            //Cor base
        side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
        map: texture,                                                                               //Aplica textura
        shininess:100,                                                                              //brilho
        emissiveIntensity:0.5,                                                                      //Intensidade de Emissão de cor
        emissive: 0xb9a8aa                                                                          //Cor de emissão
    });
    const estrela = new THREE.Mesh(geometria,material);
    estrela.rotation.x= rotacao.x;                                                              //Roda o objeto
    estrela.rotation.y= rotacao.y;
    estrela.rotation.z= rotacao.z;        
    estrela.position.x= posicao.x;                                                              //Posiciona a estrutura na posição
    estrela.position.y= posicao.y;
    estrela.position.z= posicao.z;
    estrela.castShadow=true;                                                                    //Gerar Sombras
    estrela.receiveShadow=true;                                                                 //Receber Sombras
    return estrela;
}

//Muda o tamanho das Estrelas
export function scaleStar(objeto, direcao){
    for(let i = 0; i < objeto.children.length; i++){                                                                //Percorre lista de objetos 
        let scale = objeto.children[i].scale;                                                                       //obtem objeto atual
        if(scale.x+direcao >=0.95 && scale.x+direcao <=1.05){                                                       //Aplica nova escala entre o limite 0.95 e 1.05
            scale.x += direcao;                                                                                     //Define o novo valor da escala com base no valor
            scale.y += direcao;                                                                                     //recebido como parametro (aumenta ou reduz)
            scale.z += direcao;
            objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeScale(scale.x, scale.y, scale.z ) );   //Aplica a nova escala ao objeto
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
    const geometria = new THREE.SphereGeometry(raio,segmentos,segmentos);                               //Geometria do objeto
    const material = new THREE.MeshPhongMaterial({                                                      //Material a aplicar
        color: 0x00d7ff,                                                                                    //Cor base
        side: THREE.FrontSide,                                                                              //Renderiza um lado
        map: texture,                                                                                       //Aplica textura
        shininess:0                                                                                         //brilho
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
    const geometria = new THREE.IcosahedronGeometry(raio,segmentos);                                    //Geometria do objeto
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
        objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI/50) );       //aplica a rotação no eixo z
        objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI/1000) );     //Aplica a rotação no eixo y
    }
}