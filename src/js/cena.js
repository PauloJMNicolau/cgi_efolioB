
//Objeto da Cena
let cena = {};
let rendererPrincipal= {};
let rendererMini = {};
let cameraPrincipal= {};
let cameraMini= {};
let canvasMini= document.getElementById("topo");

//Criar a cena no ecrã
function createScene(){
    cena = new THREE.Scene();
    createViewportPrincipal();
    createViewPortMini();
}

//Cria viewport da zona principal do ecrã
function createViewportPrincipal(){
    cameraPrincipal = new THREE.PerspectiveCamera(60,1,0.1,3000);                                           //Cria a camera de perspectiva
    cameraPrincipal.position.x =0;                                                                          //Define as posições x,y,z onde a câmara irá ser colocada
    cameraPrincipal.position.y=0;
    cameraPrincipal.position.z=0;
    rendererPrincipal = new THREE.WebGLRenderer();                                                          //Cria o renderer que irá ser utilizado no ecrã inteiro
    rendererPrincipal.setSize(window.innerWidth, window.innerHeight);                                       //com as medidas do browser
    document.body.appendChild(rendererPrincipal.domElement);                                                //Adiciona o renderer no DOM do HTML
}

//Cria viewport da zona do ecrã de miniatura
function createViewPortMini(){
    cameraMini =  new THREE.OrthographicCamera(                                                             //Cria a câmara da secção miniatura do ecrã
        canvasMini.innerWidth / - 2,                                                                        //Define as propriedades da câmara com base
        canvasMini.innerWidth / 2,                                                                          //nas medidas do canvas
        canvasMini.innerHeight / 2,
        canvasMini.innerHeight / - 2,
        1,
        2000
    );
    cameraMini.position.x=0;                                                                                //Define a posição x,y,z onde a câmara vai ser colocada
    cameraMini.position.y=1000;
    cameraMini.position.z=1000;
    cameraMini.lookAt(new THREE.Vector3(0,1000,0));                                                         //Define o local que a câmara deverá visualizar
    rendererMini = new THREE.WebGLRenderer({                                                                //Cria o renderer com base no canvas no HTML
        canvas: canvasMini
    });
    rendererMini.setSize(canvasMini.clientWidth,canvasMini.clientHeight);                                   //Coloca as medidas do renderer com base nas do canvas
}

//Cria o ambiente onde os objetos irão ser visualizados
function createSpace(){
    const geometria = new THREE.PlaneGeometry(2000,2000,100);
    const textura = new THREE.TextureLoader().load('images/space2.jpg'); 
    const material = new THREE.MeshBasicMaterial({                                                              //Cria o material com as propriedades
        color: 0xffffff,                                                                                        //cor base
        map: textura,                                                                                           //adiciona a textura definida anteriormentes
        side: THREE.DoubleSide                                                                                   //renderiza apenas um lado
    });
    const fundo = new THREE.Mesh(geometria, material);                                                          //Cria o fundo do ambiente
    //const base = new THREE.Mesh(geometria,material);                                                            //Cria a base do ambiente
    //const ladoE = new THREE.Mesh(geometria,material);                                                           //Cria o lado esquerdo do ambiente
    //const ladoD = new THREE.Mesh(geometria,material);                                                           //Cria o lado direito do ambiente
    fundo.position.y= 0;
    const space = new THREE.Group();
    space.add(fundo);
    //space.add(base);
    //space.add(ladoD);
    //space.add(ladoE);
    cena.add(space);
}

function init(){
    createScene();
    createSpace();
}

init();