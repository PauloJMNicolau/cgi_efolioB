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
    cameraPrincipal = new THREE.PerspectiveCamera(70,1,0.1,3000);
    cameraPrincipal.position.x=0;
    cameraPrincipal.position.y=400;
    cameraPrincipal.position.z= 2000;
    rendererPrincipal = new THREE.WebGLRenderer();
    rendererPrincipal.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendererPrincipal.domElement);
}

//Viewport Secundário do cenário
function createViewportInterior(){
    cameraInterior =  new THREE.OrthographicCamera(
        canvasInterior.innerWidth / - 2,
        canvasInterior.innerWidth / 2, 
        canvasInterior.innerHeight / 2,
        canvasInterior.innerHeight / - 2,
        1,
        3000
    );
    cameraInterior.position.x=0;
    cameraInterior.position.y=200;
    cameraInterior.position.z= 500;
    cameraInterior.lookAt(new THREE.Vector3(0,0,0))
    rendererInterior = new THREE.WebGLRenderer({
        canvas: canvasInterior
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

function createSpaceShipPincipal(){
    let geoCenter = new THREE.SphereGeometry(30,32,32);
    let textureCenter = new THREE.TextureLoader().load('images/vidro.jpg');
    textureCenter.wrapS = THREE.MirroredRepeatWrapping,
    textureCenter.wrapT = THREE.MirroredRepeatWrapping,
    textureCenter.repeat.set(5,5);
    let matCenter = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        //opacity: 1,
        map: textureCenter,
        shininess: 200 
    });
    let centerSpaceship = new THREE.Mesh(geoCenter, matCenter);
    let geoExtSpaceship = new THREE.TorusGeometry(50,20,20,20);
    let textureExt = new THREE.TextureLoader().load('images/metal1.jpg');
    textureExt.wrapS = THREE.RepeatWrapping,
    textureExt.wrapT = THREE.RepeatWrapping,
    textureExt.repeat.set(1,2);
    let matExtSpaceship = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: textureExt,
        opacity: 0.2,
        shininess: 150 
    });
    let extSpaceship = new THREE.Mesh(geoExtSpaceship,matExtSpaceship);
    let geoCanonSpaceship = new THREE.CylinderGeometry(10,15,100,32,32);
    let textureCanon = new THREE.TextureLoader().load('images/metal2.jpg');
    let matCanonSpaceship = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: textureCanon
        });
    let canonL = new THREE.Mesh(geoCanonSpaceship,matCanonSpaceship);
    canonL.position.x = -45;
    canonL.position.y = 50;
    let canonR = new THREE.Mesh(geoCanonSpaceship,matCanonSpaceship);
    canonR.position.x = 45;
    canonR.position.y = 50;
    let nave = new THREE.Group();
    nave.add(centerSpaceship);
    nave.add(extSpaceship);
    nave.add(canonL);
    nave.add(canonR);
    nave.position.x=0;
    nave.position.y= -400;
    nave.position.z= 150;
    cena.add(nave);
}

function createSpaceShip(){
    let geometry = new THREE.BoxGeometry(200,200,20,100,100,100);                               //Criar a geometria para a nave
    let texture = new THREE.TextureLoader();//.load('images/spaceshipPrincipal.png');              //Cria a Textura para adicionar ao objeto
    /*/let texture = new THREE.CubeTextureLoader().load([
        'images/spaceshipPrincipal.png',
        'images/interior.png',
        'images/interior.png',
        'images/interior.png',
        'images/interior.png',
        'images/interior.png'
    ]);*/
    let material = [
        new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
            color:0xffffff,                                                                         //cor base
            map: texture.load('images/interior.png'),                                                                           //adiciona a textura definida anteriormente
            side: THREE.DoubleSide,                                                                  //renderiza apenas um lado
            transparent: true                                                                       //adiciona transparência
        }),
        
        new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
            color:0xffffff,                                                                         //cor base
            map: texture.load('images/interior.png'),                                                                           //adiciona a textura definida anteriormente
            side: THREE.DoubleSide,                                                                  //renderiza apenas um lado
            transparent: true                                                                       //adiciona transparência
        }),
        new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
            color:0xffffff,                                                                         //cor base
            map: texture.load('images/interior.png'),                                                                           //adiciona a textura definida anteriormente
            side: THREE.DoubleSide,                                                                  //renderiza apenas um lado
            transparent: true                                                                       //adiciona transparência
        }),
        new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
            color:0xffffff,                                                                         //cor base
            map: texture.load('images/interior.png'),                                                                           //adiciona a textura definida anteriormente
            side: THREE.DoubleSide,                                                                  //renderiza apenas um lado
            transparent: true                                                                       //adiciona transparência
        }),
        new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
            color:0xffffff,                                                                         //cor base
            map: texture.load('images/spaceshipPrincipal.png'),                                                                           //adiciona a textura definida anteriormente
            side: THREE.DoubleSide,                                                                  //renderiza apenas um lado
            transparent: true                                                                       //adiciona transparência
        }),
        new THREE.MeshBasicMaterial({                                                //Cria o material com as propriedades
            color:0xffffff,                                                                         //cor base
            map: texture.load('images/interior.png'),                                                                           //adiciona a textura definida anteriormente
            side: THREE.DoubleSide,                                                                  //renderiza apenas um lado
            transparent: true                                                                       //adiciona transparência
        })
    ];
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
function createAsteroid(x,y){
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
    nave.position.x=x;                                                                          //posiciona o objeto no centro horizontal do ecrã
    nave.position.y=y                                                                         //posiciona o objeto numa posição aleatória do topo do ecrã
    nave.position.z =10;                                                                        //posiciona o objeto por cima do plano de fundo
    cena.add(nave);                                                                             //Adiciona na cena
}

//Criar linhas de asteroides
function createAsteroidLines(){
    for(let x = 500; x > -500; x=x-100){
        createAsteroid(-900,x);
        createAsteroid(900,x);
    }
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
createSpaceShipPincipal();
createSpaceShip();
createSpaceShipEnemy();
//createAsteroidLines();
createLight();
animate();