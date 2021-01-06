import * as THREE from './three.module.js'

//Objeto Canvas do HTML
let canvasMini= document.getElementById("topo");

//Objeto da Cena
export let cena = {
    scene: createScene(),
    cameraMini:createCameraMini(),
    cameraPrincipal: createCameraPrincipal(),
    rendererMini: createRendererMini(),
    rendererPrincipal: createRendererPrincipal()
};

export function inicializarCena(){
    adicionarObjeto(cena.cameraMini);
    adicionarObjeto(cena.cameraPrincipal);
}

//Adiciona um objeto na cena
export function adicionarObjeto(objeto){
    cena.scene.add(objeto);
}

//Remover Objeto da cena
export function removerObjeto(objeto){
    cena.scene.remove(objeto);
}

//Move a Camera da Miniatura
export function moverCameraMini(direcao){
    cena.cameraMini.position.x+= direcao;
    cena.cameraMini.lookAt.x += direcao;
    atualizarCameras();
}

//Retorna o Objeto Explosão na cena
export function getExplosao(){
    return cena.scene.getObjectByName("Explosão");
}

export function getNave(){
    return cena.scene.getObjectByName("Nave");
}

//Atualiza os Renders da página
export function atualizarRenderer(render){
    if (render == "Principal")
        cena.rendererPrincipal.render(cena.scene,cena.cameraPrincipal);
    else if(render == "Miniatura")
        cena.rendererMini.render(cena.scene, cena.cameraMini);
}

//Atualiza a Camera
export function atualizarCameras(){
    cena.cameraMini.updateProjectionMatrix();
    cena.cameraPrincipal.updateProjectionMatrix();
}

//Obter os objetos de Disparos
export function obterDisparos(){
    let disparos=[];
    for(let i = 0; i< cena.scene.children.length; i++){
        const objeto = cena.scene.children[i];
        if(objeto.name=="Disparo"){
            disparos.push(objeto);
        }
    }
    return disparos;
}

//Criar a cena no ecrã
function createScene(){
    return new THREE.Scene();
}

//Cria a camera Principal
function createCameraPrincipal(){
    const camera = new THREE.PerspectiveCamera(60,1,0.1,7000);                                            //Cria a camera de perspectiva
    camera.position.x=0;                                                                                //Define as posições x,y,z onde a câmara irá ser colocada
    camera.position.y=-800;
    camera.position.z=1000;

    camera.lookAt(new THREE.Vector3(0,1500,50));
    return camera;
}

//Cria a Camera Da Miniatura
function createCameraMini(){
    const camera =  new THREE.OrthographicCamera(                                                         //Cria a câmara da secção miniatura do ecrã
        canvasMini.clientWidth / -2,                                                                    //Define as propriedades da câmara com base
        canvasMini.clientWidth/ 2,                                                                      //nas medidas do canvas
        canvasMini.clientHeight / 2,
        canvasMini.clientHeight / -2,
        1,
        3000
    );
    camera.aspepect= canvasMini.clientWidth / canvasMini.clientHeight;
    camera.position.x=0;                                                                                //Define a posição x,y,z onde a câmara vai ser colocada
    camera.position.y=270;
    camera.position.z=120;
    camera.rotation.x=Math.PI/2;                                                                         //Define o local que a câmara deverá visualizar
    return camera;
}

//Cria o Renderer para a Miniatura
function createRendererMini(){
    let render = new THREE.WebGLRenderer({                                                              //Cria o renderer com base no canvas no HTML
        canvas: canvasMini
    });
    render.shadowMap.enabled = true;
    render.setSize(canvasMini.clientWidth,canvasMini.clientHeight);                                     //Coloca as medidas do renderer com base nas do canvas
    return render;
}

//Cria o Renderer para o ecrã principal
function createRendererPrincipal(){
    let render = new THREE.WebGLRenderer();                                                             //Cria o renderer que irá ser utilizado no ecrã inteiro
    render.setSize(window.innerWidth, window.innerHeight);                                              //com as medidas do browser
    render.shadowMap.enabled = true;                                                                  //Permite renderizar Sombras
    document.body.appendChild(render.domElement);                                                       //Adiciona o renderer no DOM do HTML
    return render;
}
