
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
    cameraPrincipal = new THREE.PerspectiveCamera(60,1,0.1,6000);                                           //Cria a camera de perspectiva
    cameraPrincipal.position.x =0;                                                                          //Define as posições x,y,z onde a câmara irá ser colocada
    cameraPrincipal.position.y=-500;
    cameraPrincipal.position.z=500;
    cameraPrincipal.lookAt(new THREE.Vector3(0,2000,0));
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
        2500
    );
    cameraMini.position.x=0;                                                                                //Define a posição x,y,z onde a câmara vai ser colocada
    cameraMini.position.y=1500;
    cameraMini.position.z=1500;
    cameraMini.lookAt(new THREE.Vector3(0,1500,1));                                                         //Define o local que a câmara deverá visualizar
    rendererMini = new THREE.WebGLRenderer({                                                                //Cria o renderer com base no canvas no HTML
        canvas: canvasMini
    });
    rendererMini.setSize(canvasMini.clientWidth,canvasMini.clientHeight);                                   //Coloca as medidas do renderer com base nas do canvas
}

//Cria o ambiente onde os objetos irão ser visualizados
function createSpace(){
    const geometria = new THREE.PlaneGeometry(3000,3000,100);
    const textura = new THREE.TextureLoader().load('images/space2.jpg'); 
    const material = new THREE.MeshBasicMaterial({                                                              //Cria o material com as propriedades
        color: 0xffffff,                                                                                        //cor base
        map: textura,                                                                                           //adiciona a textura definida anteriormentes
        side: THREE.FrontSide                                                                                   //renderiza apenas um lado
    });
    const fundo = new THREE.Mesh(geometria, material);                                                          //Cria o fundo do ambiente
    const base = new THREE.Mesh(geometria,material);                                                            //Cria a base do ambiente
    const ladoE = new THREE.Mesh(geometria,material);                                                           //Cria o lado esquerdo do ambiente
    const ladoD = new THREE.Mesh(geometria,material);                                                           //Cria o lado direito do ambiente
    const topo = new THREE.Mesh(geometria,material);                                                            //Cria o lado direito do ambiente
    fundo.position.y= 1500;                                                                                     //Posiciona o plano de fundo na posição correta
    fundo.rotation.x= 90                                                                                        //Roda o plano de fundo em 90 graus de modo a ficar na vertical
    base.position.y=0;                                                                                          //Posiciona o plano de base
    base.position.z=0;
    ladoE.rotation.y=90;                                                                                        //Roda o plano do lado esquerdo de forma a ficar na vertical
    ladoE.position.x=-1500;                                                                                     //Posiciona o plano do lado esquerdo na posição correta
    ladoD.rotation.y=-90;                                                                                       //Roda o plano do lado direito de forma a ficar na vertical
    ladoD.position.x=1500;                                                                                      //Posiciona o plano do lado direito na posição correta
    topo.position.y=1500;                                                                                       //Posiciona o plano do topo na posição correta
    topo.position.z=1500;
    topo.rotation.y=(Math.PI);                                                                                  //Roda o plano do topo 180 graus de modo a ser visualizado
    const space = new THREE.Group();                                                                            //Cria um grupo para os elementos criados anteriormente
    space.add(fundo);                                                                                           //e adiciona os elementos ao grupo
    space.add(base);
    space.add(ladoD);
    space.add(ladoE);
    space.add(topo);
    cena.add(space);                                                                                            //Adiciona o grupo na cena de modo a ser renderizado    
}

//Criar a nave espacial principal
function createSpaceship(){
    const texturaMetal1 = new THREE.TextureLoader().load('images/metal4.jpg');                                  //Textura de Metal 1
    const texturaMetal2 = new THREE.TextureLoader().load('images/metal2.jpg');                                  //Textura de Metal 2
    const texturaMetal3 = new THREE.TextureLoader().load('images/metal3.jpg');                                  //Textura de Metal 3
    const texturaMetal4 = new THREE.TextureLoader().load('images/metal4.jpg');                                  //Textura de Metal 4
    texturaMetal2.wrapS = THREE.RepeatWrapping;                                                                 //Define tipo de Repetição de Textura 2 Horizontal
    texturaMetal2.wrapT = THREE.RepeatWrapping;                                                                 //Define tipo de Repetição de Textura 2 Vertical
    texturaMetal2.repeat.set(30,30);                                                                            //Define quantidade de repetições
    const geometriaCorpoLateral = new THREE.CylinderGeometry(20,20,250,8,8);                                    //Geometria das estruturas laterais da nave (parte Central)
    const materialCorpoLateral = new THREE.MeshPhongMaterial({                                                  //Material das estruturas laterais da nave 
        color:0xffffff,
        side: THREE.FrontSide,
        map: texturaMetal2
    });
    //Partes Laterais
    const corpoLateralE = new THREE.Mesh(geometriaCorpoLateral,materialCorpoLateral);                                  //Estrutura Lateral Esquerda da Nave (parte Central)
    const corpoLateralD = new THREE.Mesh(geometriaCorpoLateral,materialCorpoLateral);                                  //Estrutura Lateral Direita da Nave (parte Central)
    corpoLateralE.rotation.y = 90;                                                                              //Roda o elemento 90 graus
    corpoLateralE.position.x =-50;                                                                              //Posiciona o elemento no lado esquerdo
    corpoLateralE.position.y =140;
    corpoLateralE.position.z=50;                      
    corpoLateralD.rotation.y =90;                                                                               //Roda o elemento 90 graus
    corpoLateralD.position.x= 50;                                                                               //Posiciona o elemento no lado direito
    corpoLateralD.position.y=140;
    corpoLateralD.position.z=50;
    const geometriaCorpoLateralF = new THREE.ConeGeometry(20,10,8);                                             //Geometria das estruturas laterais da nave (parte da frente)
    const corpoLateralFE = new THREE.Mesh(geometriaCorpoLateralF,materialCorpoLateral);                         //Estrutura Lateral Esquerda da Nave (parte da frente)
    const corpoLateralFD = new THREE.Mesh(geometriaCorpoLateralF,materialCorpoLateral);                         //Estrutura lateral direita da nave (parte da frente)
    corpoLateralFE.position.x=-50;                                                                              //Posiciona elemento na esqueda
    corpoLateralFE.position.y=265;
    corpoLateralFE.position.z=50;
    corpoLateralFE.rotation.x=90;                                                                               //Roda o elemento 90 graus
    corpoLateralFD.position.x=50;                                                                               //Posiciona elemento na direita
    corpoLateralFD.position.y=265;
    corpoLateralFD.position.z=50;
    corpoLateralFD.rotation.x=90                                                                                //Roda o elemento 90 graus
    //Motor da Nave
    texturaMetal4.wrapS = THREE.RepeatWrapping;                                                                 //Define tipo de Repetição de Textura 2 Horizontal
    texturaMetal4.wrapT = THREE.RepeatWrapping;                                                                 //Define tipo de Repetição de Textura 2 Vertical
    texturaMetal4.repeat.set(20,10);                                                                            //Define quantidade de repetições
    const geometriaMotor = new THREE.CylinderGeometry(20,10,15,8,8);                                            //Geometria da estrutura do motor da nave
    const materialMotor = new THREE.MeshPhongMaterial({                                                         //Material da estrutura do motor
        color: 0xEEE2F6,
        side: THREE.FrontSide,
        map: texturaMetal4
    });
    const motorE = new THREE.Mesh(geometriaMotor, materialMotor);                                               //Motor Esquerdo da nave
    const motorD = new THREE.Mesh(geometriaMotor, materialMotor);                                               //Motor Direito da Nave
    motorE.rotation.y=90;                                                                                       //Roda 90 graus 
    motorE.position.x=-50;                                                                                      //Posiciona elemento na esquerda
    motorE.position.y=7;
    motorE.position.z=50;
    motorD.rotation.y=90;                                                                                       //Roda 90 graus
    motorD.position.x=50;                                                                                       //Posiciona elemento na direita
    motorD.position.y=7;
    motorD.position.z=50;
    //Parte Central
    texturaMetal1.wrapS = THREE.MirroredRepeatWrapping;                                                         //Define tipo de Repetição de Textura 2 Horizontal
    texturaMetal1.wrapT = THREE.RepeatWrapping;                                                                 //Define tipo de Repetição de Textura 2 Vertical
    texturaMetal1.repeat.set(10,10);  
    const geometruiaCentro = new THREE.BoxGeometry(100,230,25);                                                 //Geometria da parte central da nave
    const materialCentroAsas = [                                                                                //Material da parte central da nave e asas
        new THREE.MeshPhongMaterial({                                                    
            color: 0xEEE2F5,
            side: THREE.FrontSide,
            map: texturaMetal1
        }),
        new THREE.MeshPhongMaterial({                                                    
            color: 0xEEE2F5,
            side: THREE.FrontSide,
            map: texturaMetal1
        }),
        new THREE.MeshPhongMaterial({                                                    
            color: 0xEEE2F5,
            side: THREE.FrontSide,
            map: texturaMetal1
        }),
        new THREE.MeshPhongMaterial({                                                    
            color: 0xEEE2F5,
            side: THREE.FrontSide,
            map: texturaMetal1
        }),
        new THREE.MeshPhongMaterial({                                                    
            color: 0xEEE2F5,
            side: THREE.FrontSide,
            map: texturaMetal1
        }),
        new THREE.MeshPhongMaterial({                                                    
            color: 0xEEE2F5,
            side: THREE.FrontSide,
            map: texturaMetal1
        })
    ];
    const centro = new THREE.Mesh(geometruiaCentro, materialCentroAsas);                                        //Elemento central da nave
    centro.position.y = 150;                                                                                    //Posiciona elemento na posição 
    centro.position.x=0;
    centro.position.z=40;
    //Asas
    texturaMetal3.wrapS = THREE.RepeatWrapping;                                                                 //Define tipo de Repetição de Textura 2 Horizontal
    texturaMetal3.wrapT = THREE.RepeatWrapping;                                                                 //Define tipo de Repetição de Textura 2 Vertical
    texturaMetal3.repeat.set(20,10);  
    const geometriaAsas = new THREE.BoxGeometry(50,100,25);                                                     //Geometria das Asas
    const asaE = new THREE.Mesh(geometriaAsas,materialCentroAsas);                                              //Asa Esquerda
    const asaD = new THREE.Mesh(geometriaAsas,materialCentroAsas);                                              //Asa Direita
    asaE.position.x=-70;                                                                                        //Posiciona elemento no local correto
    asaE.position.y=150;
    asaE.position.z=40;
    asaD.position.x=70;                                                                                         //Posiciona elemento no local correto
    asaD.position.y=150;
    asaD.position.z=40;
    //Cockpit
    const geometriaCockpit = new THREE.SphereGeometry(25,6,5,0,Math.PI*2.0,0,Math.PI*0.5);                      //Geometria da estrutura do cockpit
    const materialCockpit = new THREE.MeshPhongMaterial({                                                       //Material da estrutura do cockpit
        color: 0x99CEFF,
        shininess: 150,                    
        side: THREE.FrontSide
    });
    const cockpit= new THREE.Mesh(geometriaCockpit,materialCockpit);                                            //Cockpit da Nave
    cockpit.rotation.x=90;                                                                                      //Roda o elemento 90 graus
    cockpit.position.x=0;                                                                                       //Posiciona nave no local
    cockpit.position.y=120;
    cockpit.position.z=70;
    //Armas
    const geometriaArmas = new THREE.CylinderGeometry(2,5,30,8,8);
    const materialArmas = new THREE.MeshPhongMaterial({
        color: 0x045525,
        side: THREE.FrontSide
    });
    const armaE = new THREE.Mesh(geometriaArmas,materialArmas);
    const armaD = new THREE.Mesh(geometriaArmas,materialArmas);
    armaE.rotation.y = 90;
    armaE.position.x=-80;
    armaE.position.y=200;
    armaE.position.z=50;
    armaD.rotation.y=90;
    armaD.position.x=80;
    armaD.position.y=200;
    armaD.position.z=50;
    //Nave Total
    const nave = new THREE.Group();                                                                             //Cria um grupo para os elementods da nave
    nave.add(corpoLateralE);                                                                                    //e adiciona os elementos ao grupo
    nave.add(corpoLateralD);
    nave.add(corpoLateralFE);
    nave.add(corpoLateralFD);
    nave.add(motorE);
    nave.add(motorD);
    nave.add(centro);
    nave.add(asaE);
    nave.add(asaD);
    nave.add(cockpit);
    nave.add(armaE);
    nave.add(armaD);
    nave.position.z=100;                                                                                        //Posiciona todo o grupo de elementos mais alto que a base do ambiente
    cena.add(nave);                                                                                             //Adiciona o grupo na cena
}

function animate() {
    requestAnimationFrame( animate );
    rendererPrincipal.render(cena, cameraPrincipal);
 rendererMini.render(cena, cameraMini)
}

function createLight(){
    let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    cena.add(light);
}

function init(){
    createScene();
    createSpace();
    createLight();
    createSpaceship();
    animate();
}

init();