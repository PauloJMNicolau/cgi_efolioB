//Objetos e funções comuns aos restantes modulos
import * as THREE from './three.module.js'

//Objeto Canvas do HTML
let canvasMini= document.getElementById("topo");

//Array de Objetos que podem colidir
export let colisores = new Array();

//Objeto da Cena
export let cena = {
    scene: createScene(),                                               //Cena
    cameraMini:createCameraMini(),                                      //Camara da Miniatura
    cameraPrincipal: createCameraPrincipal(),                           //Camara principal
    rendererMini: createRendererMini(),                                 //Render da Miniatura
    rendererPrincipal: createRendererPrincipal()                        //Render Principal
};

//Gerar Posição Aleatória
export function gerarPosicao(){
    let numero = Math.round(Math.random()*400);                         //Gerar uma Posição x aleatória
    let negativo = Math.random()*2;                                     //Gerar um valor aleatório para determinar se a posição será negativa
    if(negativo<1){                                                     //Se valor for menor que 1
        numero *= -1;                                                   //posição será negativa
    }
    return numero;
}

//Iniciar cena
export function inicializarCena(){
    adicionarObjeto(cena.cameraMini);                                   //Adiciona camara da miniatura na cena
    adicionarObjeto(cena.cameraPrincipal);                              //Adiciona camara principal na cena
}

//Adiciona um objeto na cena
export function adicionarObjeto(objeto){
    cena.scene.add(objeto);                                             //Adiciona na cena          
    switch(objeto.name){                                                //Adiciona no array de objetos que podem colidir se for de um dos tipos
        case "Astro":
        case "Estrela":
        case "Inimigo":
            colisores.push(objeto);
    }
}

//Remover Objeto da cena
export function removerObjeto(objeto){
    cena.scene.remove(objeto);                                          //Remove da cena
    switch(objeto.name){                                                //Remove do array de objetos quie colidem se for de um dos tipos
        case "Astro":
        case "Estrela":
        case "Inimigo":
            colisores.pop(objeto);
    }
}

//Move a Camera da Miniatura
export function moverCameraMini(direcao){
    cena.cameraMini.position.x+= direcao;                               //Atualiza a posição da camara
    cena.cameraMini.lookAt.x += direcao;                                //Atualiza o cenário visualizado palea camara
    atualizarCameras();                                                 //Atualiza camaras
}

//Retorna o Objeto Explosão na cena
export function getExplosao(){
    return cena.scene.getObjectByName("Explosão");
}

//Retorna o objeto Nave na cena
export function getNave(){
    return cena.scene.getObjectByName("Nave");
}

//Atualiza os Renders da página
export function atualizarRenderer(render){
    if (render == "Principal"){
        cena.rendererPrincipal.setPixelRatio(window.devicePixelRatio);
        cena.rendererPrincipal.render(cena.scene,cena.cameraPrincipal);
    }else if(render == "Miniatura"){
        cena.rendererMini.setPixelRatio(window.devicePixelRatio);
        cena.rendererMini.render(cena.scene, cena.cameraMini);
    }
}

//Atualiza a Camera
export function atualizarCameras(){
    cena.cameraMini.updateProjectionMatrix();
    cena.cameraPrincipal.updateProjectionMatrix();
}

//Obter os objetos de Disparos
export function obterDisparos(){
    let disparos=[];
    for(let i = 0; i< cena.scene.children.length; i++){                 //Percorre objetos na cena 
        const objeto = cena.scene.children[i];                          //e verifica se são do tipo dos laser
        if(objeto.name=="Disparo"){
            disparos.push(objeto);                                      //e adiciona na lista a retornar
        }
    }
    return disparos;
}

//Obter os objetos de Astros
export function obterAstros(){
    let astros=[];
    for(let i = 0; i< cena.scene.children.length; i++){                     //Percorre a lista de objetos na cena
        const objeto = cena.scene.children[i];                              //e verifica se são dos tipos astros (Estrela/Astro)
        if(objeto.name=="Astro" || objeto.name=="Estrela"){                 //e adiciona na lista a retornar
            astros.push(objeto);
        }
    }
    return astros;
}

//Obter os objetos de Inimigos
export function obterInimigos(){
    let inimigos=[];
    for(let i = 0; i< cena.scene.children.length; i++){                         //Percorre a lista de objetos na cena
        const objeto = cena.scene.children[i];                                  //e se for do tipo Inimigo
        if(objeto.name=="Inimigo"){                                             //adiciona na lista a retornar
            inimigos.push(objeto);
        }
    }
    return inimigos;
}

//Criar a cena no ecrã
function createScene(){
    return new THREE.Scene();
}

//Cria a camera Principal
function createCameraPrincipal(){
    const camera = new THREE.PerspectiveCamera(60,1,0.1,7000);                                          //Cria a camera de perspectiva
    camera.position.x=0;                                                                                //Define as posições x,y,z onde a câmara irá ser colocada
    camera.position.y=-800;
    camera.position.z=1000;
    camera.lookAt(new THREE.Vector3(0,1500,50));                                                        //Define a posição a visualizar
    return camera;
}

//Cria a Camera Da Miniatura
function createCameraMini(){
    const camera =  new THREE.OrthographicCamera(                                                       //Cria a câmara da secção miniatura do ecrã
        canvasMini.clientWidth / -2,                                                                    //Define as propriedades da câmara com base
        canvasMini.clientWidth/ 2,                                                                      //nas medidas do canvas
        canvasMini.clientHeight / 2,
        canvasMini.clientHeight / -2,
        1,
        3000
    );
    camera.aspepect= canvasMini.clientWidth / canvasMini.clientHeight;                                  //Define o aspect ratio da camara
    camera.position.x=0;                                                                                //Define a posição x,y,z onde a câmara vai ser colocada
    camera.position.y=270;
    camera.position.z=120;
    camera.rotation.x=Math.PI/2;                                                                         //Define o local que a câmara deverá visualizar
    return camera;
}

//Cria o Renderer para a Miniatura
function createRendererMini(){
    let render = new THREE.WebGLRenderer({                                                              //Cria o renderer com base no canvas no HTML
        canvas: canvasMini,
        powerPreference: "high-performance"                                                             //Tipo de performance do renderer
    });
    render.shadowMap.enabled = true;
    render.setSize(canvasMini.clientWidth,canvasMini.clientHeight);                                     //Coloca as medidas do renderer com base nas do canvas
    return render;
}

//Cria o Renderer para o ecrã principal
function createRendererPrincipal(){
    let render = new THREE.WebGLRenderer({                                                              //Cria o renderer que irá ser utilizado no ecrã inteiro
        powerPreference: "high-performance"                                                             //Tipo de performance do renderer
    });                                                                                           
    render.setSize(window.innerWidth, window.innerHeight);                                              //com as medidas do browser
    render.shadowMap.enabled = true;                                                                    //Permite renderizar Sombras
    document.body.appendChild(render.domElement);                                                       //Adiciona o renderer no DOM do HTML
    return render;
}

//Atualiza as definições da camara da Miniatura 
export function setCameraMini(){
    cena.rendererMini.setSize(canvasMini.clientWidth,canvasMini.clientHeight);
    cena.cameraMini.left=canvasMini.clientWidth / -2,                                               //Define as propriedades da câmara com base
    cena.cameraMini.right=canvasMini.clientWidth/ 2,                                                //nas medidas do canvas
    cena.cameraMini.top=canvasMini.clientHeight / 2,
    cena.cameraMini.bottom=canvasMini.clientHeight / -2,
    cena.cameraMini.aspect = window.innerWidth / window.innerHeight;                                //Corrige o aspect ratio para as novas proporções
}

//Atualiza as definições da camara principal
export function setCameraPrincipal(){
    cena.rendererPrincipal.setSize(window.innerWidth,window.innerHeight);
    cena.rendererPrincipal.aspect = window.innerWidth / window.innerHeight;
}