let cena;                                                           //Variavel para a cena
let canvasInterior = document.getElementById("interior");           //Variavel com o objeto onde será inserido o interior da nave
let cameraPrincipal;                                                //Variavel para a camera da cena principal
let cameraInterior;                                                 //Variavel para a camera da vista interior da nave
let rendererPrincipal;                                              //Variavel para renderer da camera principal
let rendererInterior;                                               //Variavel para renderer da camera da vista interior da nave

function createScene(){
    cena = new THREE.Scene();
    createViewportPrincipal();
    createViewportInterior();
}

//Viewport Principal do cenário
function createViewportPrincipal(){
    cameraPrincipal = new THREE.OrthographicCamera(
        window.innerWidth / - 2,
        window.innerWidth / 2, 
        window.innerHeight / 2,
        window.innerHeight / - 2,
        1,
        3000
    );
    cameraPrincipal.position.x=0;
    cameraPrincipal.position.y=0;
    cameraPrincipal.position.z= 3000;
    rendererPrincipal = new THREE.WebGLRenderer();
    rendererPrincipal.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendererPrincipal.domElement);
}

//Viewport Secundário do cenário
function createViewportInterior(){
    cameraInterior = new THREE.PerspectiveCamera(50,1,0.1,1000);
    cameraInterior.position.x=0;
    cameraInterior.position.y=0;
    cameraInterior.position.z= 1000;
    rendererInterior = new THREE.WebGLRenderer({
        canvasInterior
    });
    rendererInterior.setSize(canvasInterior.clientWidth,canvasInterior.clientHeight);
}

function createSpace(){
    let geometry = new THREE.PlaneGeometry(3000,3000,100);                                      //Criar a geometria para o plano de fundo
    let texture = new THREE.TextureLoader().load('images/space2.jpg');                          //Criar a textura para adicionar ao plano de fundo
    texture.wrapS = THREE.RepeatWrapping;                                                       //Define o tipo de repetição horizontal
    texture.wrapT = THREE.MirroredRepeatWrapping;                                               //Define o tipo de repetição vertical
    texture.repeat.set(10,10);                                                                  //Define a quantidade de repetições
    let material = new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
        color: 0xffffff,                                                                        //cor base
        map: texture,                                                                           //adiciona a textura definida anteriormentes
        side: THREE.FrontSide                                                                   //renderiza apenas um lado
    });
    let fundo = new THREE.Mesh( geometry, material );                                           //Cria o plano de fundo
    fundo.position.x=0;                                                                         //Coloca o plano centrado nos eixos [xyz]
    fundo.position.y=0;
    fundo.position.z=0;
    cena.add(fundo);                                                                            //Adiciona na cena
}

function createSpaceShip(){
    let geometry = new THREE.BoxGeometry(200,200,10,100,100,100);                               //Criar a geometria para a nave
    let texture = new THREE.TextureLoader().load('images/spaceshipPrincipal.png');              //Cria a Textura para adicionar ao objeto
    let material = new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
        color:0xffffff,                                                                         //cor base
        map: texture,                                                                           //adiciona a textura definida anteriormente
        side: THREE.FrontSide,                                                                  //renderiza apenas um lado
        transparent: true                                                                       //adiciona transparência
    });
    let nave = new THREE.Mesh(geometry, material);                                              //cria o objeto
    nave.position.x=0;                                                                          //posiciona o objeto no centro horizontal do ecrã 
    nave.position.y= -400;                                                                      //posiciona o objeto no fundo do ecrã
    nave.position.z =10;                                                                        //posiciona o objeto por cima do plano de fundo
    cena.add(nave);                                                                             //Adiciona na cena
}

//Cria As naves Inimigas
function createSpaceShipEnemy(){
    let geometry = new THREE.BoxGeometry(200,200,10,100,100,100);                               //Criar a geometria para a nave
    let number = Math.round(Math.random()*5)+1;                                                   //Calcula um numero aleatório para escolher um tipo de inimigo
    let texture = new THREE.TextureLoader().load('images/enemy'+number+'.png');                 //Cria a Textura para adicionar ao objeto
    texture.center.set(0.5,0.5);
    texture.rotation= THREE.MathUtils.degToRad(180);
    let material = new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
        color:0xffffff,                                                                         //cor base
        map: texture,                                                                           //adiciona a textura definida anteriormente
        side: THREE.FrontSide,                                                                  //renderiza apenas um lado
        transparent: true                                                                       //adiciona transparência
    });
    let nave = new THREE.Mesh(geometry, material);                                              //cria o objeto
    number = Math.round(Math.random()*400)
    nave.position.x=750;                                                                          //posiciona o objeto no centro horizontal do ecrã
    nave.position.y=400                                                                         //posiciona o objeto numa posição aleatória do topo do ecrã
    nave.position.z =10;                                                                        //posiciona o objeto por cima do plano de fundo
    cena.add(nave);                                                                             //Adiciona na cena
}

//Cria Asteroide de forma aleatória
function createAsteroid(){
    let number = Math.round(Math.random()*2);                                                   //Calcula um numero aleatório para escolher um tipo de asteroid
    let geometry;                                                                               //Criar a geometria para o asteroid de forma aleatória
    switch(number){
        case 0:
            geometry = new THREE.DodecahedronGeometry(30,2)                                     
            break;
        case 1:
            geometry = new THREE.OctahedronGeometry(30,2);
            break;
        case 2:
            geometry = new THREE.TetrahedronGeometry(30,2);
            break;
    }                                          
    number = Math.round(Math.random()*2)+1;                                                     //Calcula novo numero para a textura do asteroid
    let texture = new THREE.TextureLoader().load('images/astro'+number+'.png');                 //Cria a Textura para adicionar ao objeto
    texture.wrapS=THREE.MirroredRepeatWrapping;                                                 //Define o tipo de repetição Horizontal
    texture.wrapT=THREE.MirroredRepeatWrapping;                                                 //Define o tipo de repetição vertical
    texture.repeat.set(3,3);                                                                    //Define a quantidade de repetições
    let material = new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
        color:0xffffff,                                                                         //cor base
        map: texture,                                                                           //adiciona a textura definida anteriormente
        side: THREE.FrontSide,                                                                  //renderiza apenas um lado
        transparent: true                                                                       //adiciona transparência
    });
    let nave = new THREE.Mesh(geometry, material);                                              //cria o objeto
    number = Math.round(Math.random()*400)
    nave.position.x=0;                                                                          //posiciona o objeto no centro horizontal do ecrã
    nave.position.y=400                                                                         //posiciona o objeto numa posição aleatória do topo do ecrã
    nave.position.z =10;                                                                        //posiciona o objeto por cima do plano de fundo
    cena.add(nave);                                                                             //Adiciona na cena
}

//Criar linhas de asteroides
function createAsteroidLines(){

}

function createLight(){
    let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    cena.add(light);
}

function animate() {
    requestAnimationFrame( animate );
    rendererPrincipal.render(cena, cameraPrincipal);
 rendererInterior.render(cena, cameraInterior)
}


createScene();
createSpace();
createSpaceShip();
createSpaceShipEnemy();
createAsteroid();
createLight();
animate();