//Criar a nave espacial principal
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'

export function createSpaceship(posicao){
    const nave = new THREE.Group();                                                                             //Cria um grupo para os elementods da nave
    nave.add(createCorpo({x:0,y:150,z:50},{x:0,y:0,z:0}));                                                      //Cria e adiciona um corpo da nave
    nave.add(createCockpit({x:0,y:120,z:60}, {x:Math.PI, y:0, z:0}));                                           //Cria e adiciona um cockpit da nave
    nave.add(createLaterais());                                                                                 //Cria e adiciona as laterais e motores da nave
    nave.add(createAsas());                                                                                     //Cria e adiciona as asas da nave
    nave.add(createArmas());                                                                                    //Cria e adiciona as armas na nave
    nave.add(Luzes.createLightCockpit(0xDB9A37,0.6,{x:0,y:120,z:85}))                                             //Cria Luz de cockpit e adiciona
    nave.name="Nave";                                                                                           //Atribui um nome e tipo ao grupo
    nave.type="Nave";
    nave.position.x= posicao.x;
    nave.position.y= posicao.y;
    nave.position.z= posicao.z;
    CENA.adicionarObjeto(nave);                                                                                  //Adiciona na cena
};

//Criar a Asa e as Luzes da Asa
function createAsas(){
    const asas = new THREE.Group();                                                                             //Cria um grupo para as asas
    asas.add(createAsa({x:70,y:150,z:50}, {x:0,y:0,z:0}));                                                      //Cria a asa Direita e luzes
    asas.add(createLuzAsa(0x197D1B,{x:70,y:100,z:50},{x:Math.PI/2, y:0,z:0}));
    asas.add(Luzes.createLightAsa(0x197D1B,0.2,{x:70,y:100,z:50},{x:70,y:70,z:50}))
    asas.add(createLuzAsa(0x197D1B,{x:85,y:100,z:50},{x:Math.PI/2, y:0,z:0}));
    asas.add(Luzes.createLightAsa(0x197D1B,0.2,{x:85,y:100,z:50},{x:85,y:70,z:50}))
    asas.add(createAsa({x:-70,y:150,z:50}, {x:0,y:0,z:0}));                                                     //Cria a asa Esquerda e luzes
    asas.add(createLuzAsa(0x197D1B,{x:-70,y:100,z:50},{x:Math.PI/2, y:0,z:0}));
    asas.add(Luzes.createLightAsa(0x197D1B,0.2,{x:-70,y:100,z:50},{x:-70,y:70,z:50}))
    asas.add(createLuzAsa(0x197D1B,{x:-85,y:100,z:50},{x:Math.PI/2, y:0,z:0}));
    asas.add(Luzes.createLightAsa(0x197D1B,0.2,{x:-85,y:100,z:50},{x:-85,y:70,z:50}))
    return asas;
}

//Cria a estrutura da asa da nave
function createAsa(posicao, rotacao){
    const textura = new THREE.TextureLoader().load('images/metal1.jpg');                                    //Textura a aplicar
    textura.wrapS = THREE.RepeatWrapping;                                                                   //Define tipo de Repetição de Textura 2 Horizontal
    textura.wrapT = THREE.RepeatWrapping;                                                                   //Define tipo de Repetição de Textura 2 Vertical
    textura.repeat.set(20,10);                                                                              //Quantidade de Repetições
    textura.magFilter = THREE.LinearFilter;                                                                 //Tipo de Filtro da Textura
    const geometria = new THREE.BoxGeometry(50,100,10);                                                     //Geometria das Asas
    const material = [                                                                                      //Material da parte central da nave e asas
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        })
    ];
    const asa = new THREE.Mesh(geometria,material);                                                         //Asa Direita
    asa.position.y=posicao.y;                                                                               //Posiciona elemento na posição 
    asa.position.x=posicao.x;
    asa.position.z=posicao.z;
    asa.rotation.x= rotacao.x;                                                                              //Roda o elemento
    asa.rotation.y= rotacao.y;
    asa.rotation.z= rotacao.z;
    asa.castShadow = true;                                                                                  //Gerar Sombra
    asa.receiveShadow = true;                                                                               //Receber Sombra
    return asa;
}

function createLuzAsa(cor, posicao, rotacao){
    const geometria = new THREE.PlaneGeometry(5,5,2,2);                                                 //Geometria da Luz
    const material = new THREE.MeshPhongMaterial({                                                      //Material da Luz
        color: cor,                                                                                         //Cor de base
        side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
        emissive: cor                                                                                       //Cor de Emissão
    });
    const luz = new THREE.Mesh(geometria,material);                                                     //Cria o objeto
    luz.position.x=posicao.x;                                                                           //Coloca objeto na posicao
    luz.position.y=posicao.y;
    luz.position.z=posicao.z;
    luz.rotation.x=rotacao.x;                                                                           //Roda o objeto
    luz.rotation.y=rotacao.y;
    luz.rotation.z=rotacao.z;
    luz.castShadow=false;                                                                               //Não gerar sombras
    luz.receiveShadow=false;                                                                            //Não receber Sombras
    return luz;
}

//Cria o Corpo da Nave
function createCorpo(posicao,rotacao){
    const textura = new THREE.TextureLoader().load('images/metal1.jpg');                                    //Textura a aplicar
    textura.wrapS = THREE.RepeatWrapping;                                                                   //Define tipo de Repetição de Textura 2 Horizontal
    textura.wrapT = THREE.RepeatWrapping;                                                                   //Define tipo de Repetição de Textura 2 Vertical
    textura.repeat.set(10,10);                                                                              //Quantidade de Repetições
    textura.magFilter = THREE.LinearFilter;                                                                 //Tipo de Filtro da Textura
    const geometria = new THREE.BoxGeometry(100,230,25);                                                   //Geometria da parte central da nave
    const material = [                                                                                      //Material da parte central da nave e asas
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                       //Faces do Cubo                                 
            color: 0xEEE2F5,                                                                                    //Cor base
            side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
            map: textura                                                                                        //Textura a aplicar
        })
    ];
    const corpo = new THREE.Mesh(geometria, material);                                                     //Elemento central da nave
    corpo.position.y=posicao.y;                                                                             //Posiciona elemento na posição 
    corpo.position.x=posicao.x;
    corpo.position.z=posicao.z;
    corpo.rotation.x= rotacao.x;                                                                            //Roda o elemento
    corpo.rotation.y= rotacao.y;
    corpo.rotation.z= rotacao.z;
    corpo.castShadow=true;
    corpo.receiveShadow=true;
    return corpo;
}

//Cria o cockpit da nave
function createCockpit(posicao, rotacao){
    const geometria = new THREE.SphereBufferGeometry(25,6,5,0,Math.PI*2.0,0,Math.PI*0.5);               //Geometria da estrutura do cockpit
    const material = new THREE.MeshPhongMaterial({                                                      //Material da estrutura do cockpit
        color: 0x99CEFF,                                                                                    //Cor base
        shininess: 150,                                                                                     //Intensidade de Brilho
        side: THREE.FrontSide,                                                                              //Renderiza apenas um lado
        transparent: true,                                                                                  //Transparencia
        opacity: 0.4                                                                                        //Opacidade
    });
    const cockpit= new THREE.Mesh(geometria,material);                                                  //Cockpit da Nave
    cockpit.position.y=posicao.y;                                                                       //Posiciona elemento na posição 
    cockpit.position.x=posicao.x;
    cockpit.position.z=posicao.z;
    cockpit.rotation.x= rotacao.x;                                                                      //Roda o elemento
    cockpit.rotation.y= rotacao.y;
    cockpit.rotation.z= rotacao.z;
    cockpit.castShadow = true;                                                                          //Gerar Sombras
    cockpit.receiveShadow=false;                                                                        //Não recebe sombras
    return cockpit;
}

//Cria as armas
function createArmas(){
    const armas = new THREE.Group();                                                            //Cria um grupo para as armas
    armas.add(createArma({x:80,y:185,z:55},{x:0,y:Math.PI,z:0}));                               //Arma Direita
    armas.add(createArma({x:-80,y:185,z:55},{x:0,y:Math.PI,z:0}));                              //Arma Esquerda
    return armas;
}

//Cria a estrutura da arma
function createArma(posicao, rotacao){
    const texture = new THREE.TextureLoader().load('images/metal3.jpg');                        //Loader para a textura
    texture.wrapS = THREE.RepeatWrapping;                                                       //Define tipo de Repetição de Textura 2 Horizontal
    texture.wrapT = THREE.RepeatWrapping;                                                       //Define tipo de Repetição de Textura 2 Vertical
    texture.repeat.set(5,5);                                                                    //Quantidade de repetições
    texture.magFilter = THREE.LinearFilter;                                                     //Tipo de Filtro da Textura
    const geometria = new THREE.CylinderGeometry(3,5,30,8,8);                                   //Cria a estrutura da arma
    const material = [
        new THREE.MeshPhongMaterial({                                                           //Cria o material da arma
            color: 0xcccccc,                                                                        //Cor base
            side: THREE.FrontSide,                                                                  //Renderiza um lado apenas
            map: texture                                                                            //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                           //Cria o material da arma
            color: 0xcccccc,                                                                        //Cor base
            side: THREE.FrontSide,                                                                  //Renderiza um lado apenas
            map: texture                                                                            //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                           //Cria o material da arma
            color: 0xcccccc,                                                                        //Cor base
            side: THREE.FrontSide,                                                                  //Renderiza um lado apenas
            map: texture                                                                            //Textura a aplicar
        })
    ];
    const arma = new THREE.Mesh(geometria,material);                                            //Cria a estrutura da arma
    arma.position.x= posicao.x;                                                                 //Coloca a arma na posição
    arma.position.y= posicao.y;
    arma.position.z= posicao.z;     
    arma.rotation.x= rotacao.x;                                                                 //Roda a arma
    arma.rotation.y= rotacao.y;
    arma.rotation.z= rotacao.z;
    arma.castShadow=true;                                                                       //Gerar Sombras
    arma.receiveShadow=true;                                                                    //Receber Sombras
    return arma;
}

//Cria as Laterais
function createLaterais(){
    const laterais = new THREE.Group();
    laterais.add(createLateralC({x:-50,y:140,z:50},{x:0,y:Math.PI/2,z:0}));                                   //Lateral Esquerda
    laterais.add(createLateralF({x:-50,y:265,z:50},{x:Math.PI/2,y:0,z:0}));
    laterais.add(createMotor({x:-50,y:7,z:50},{x:0,y:Math.PI/2,z:0}));
    laterais.add(createFogo({x:-50,y:0,z:50},{x:0,y:0,z:0},0xF5A935,16));
    laterais.add(createFogo({x:-50,y:0,z:50},{x:0,y:0,z:0},0x00427F,15));
    laterais.add(createLateralC({x:50,y:140,z:50},{x:0,y:Math.PI/2,z:0}));                                    //Lateral Direita
    laterais.add(createLateralF({x:50,y:265,z:50},{x:Math.PI/2,y:0,z:0}));
    laterais.add(createMotor({x:50,y:7,z:50},{x:0,y:Math.PI/2,z:0}));
    laterais.add(createFogo({x:50,y:0,z:50},{x:0,y:0,z:0},0xF5A935,16));
    laterais.add(createFogo({x:50,y:0,z:50},{x:0,y:0,z:0},0x00427F,15));
    return laterais;
}

//Cria a parte Central da Lateral
function createLateralC(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal2.jpg');                            //Loader para a textura
    texture.wrapS = THREE.RepeatWrapping;                                                           //Define tipo de Repetição de Textura 2 Horizontal
    texture.wrapT = THREE.RepeatWrapping;                                                           //Define tipo de Repetição de Textura 2 Vertical
    texture.repeat.set(5,5);                                                                        //Quantidade de repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
    const geometria = new THREE.CylinderGeometry(20,20,250,8,8);                                    //Geometria das estrutura lateral - centro
    const material = new THREE.MeshPhongMaterial({                                                  //Material para a estrutura
        color:0xffffff,                                                                             //Cor Base
        side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
        map: texture
    }); 
    const estrutura = new THREE.Mesh(geometria,material);                                           //Cria o objeto
    estrutura.rotation.x= rotacao.x;                                                                //Roda o objeto
    estrutura.rotation.y= rotacao.y;
    estrutura.rotation.z= rotacao.z;        
    estrutura.position.x= posicao.x;                                                                //Posiciona a estrutura na posição
    estrutura.position.y= posicao.y;
    estrutura.position.z= posicao.z;
    estrutura.castShadow=true;                                                                      //Gerar Sombras
    estrutura.receiveShadow=true;                                                                   //Receber Sombras
    return estrutura;
}

//Cria a Parte da Frente da Lateral
function createLateralF(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal2.jpg');                            //Loader para a textura
    texture.wrapS = THREE.RepeatWrapping;                                                           //Define tipo de Repetição de Textura 2 Horizontal
    texture.wrapT = THREE.RepeatWrapping;                                                           //Define tipo de Repetição de Textura 2 Vertical
    texture.repeat.set(5,5);                                                                        //Quantidade de repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
    const geometria = new THREE.ConeBufferGeometry(20,10,8);                                        //Geometria das estrutura lateral - frente
    const material = new THREE.MeshPhongMaterial({                                                  //Material para a estrutura
        color:0xffffff,                                                                                 //Cor Base
        side: THREE.FrontSide,                                                                          //Renderiza apenas um lado
        map: texture                                                                                    //Textura a aplicar
    }); 
    const estrutura = new THREE.Mesh(geometria,material);                                           //Cria o objeto
    estrutura.rotation.x= rotacao.x;                                                                //Roda o objeto
    estrutura.rotation.y= rotacao.y;
    estrutura.rotation.z= rotacao.z;        
    estrutura.position.x= posicao.x;                                                                //Posiciona a estrutura na posição
    estrutura.position.y= posicao.y;
    estrutura.position.z= posicao.z;
    estrutura.castShadow=true;                                                                      //Gerar Sombras
    estrutura.receiveShadow=true;                                                                   //Receber Sombras
    return estrutura;
}

//Cria o Motor da Nave
function createMotor(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal4.jpg');                            //Loader para a textura
    const geometria = new THREE.CylinderGeometry(20,10,15,8,8);                               //Geometria das estrutura do motor
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(10,10);                                                                      //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
    const material = [                                                                              //Material para a estrutura
        new THREE.MeshPhongMaterial({                                                                   //Lateral da estrutura
            color:0xeee2f6,                                                                                 //Cor Base
            side: THREE.FrontSide,                                                                          //Renderiza apenas um lado
            map: texture                                                                                    //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                   //Topo da estrutura
            color:0xeee2f6,                                                                                 //Cor Base
            side: THREE.FrontSide,                                                                          //Renderiza apenas um lado
            map: texture                                                                                    //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                                   //Base da estrutura
            color:0xf5a935,                                                                                 //Cor Base
            side: THREE.FrontSide,                                                                          //Renderiza apenas um lado
            map: texture,                                                                                   //Textura a aplicar
            emissive: 0xf5a935                                                                              //Cor que emite
        })
    ];
    const estrutura = new THREE.Mesh(geometria,material);                                           //Cria o objeto
    estrutura.rotation.x= rotacao.x;                                                                //Roda o objeto
    estrutura.rotation.y= rotacao.y;
    estrutura.rotation.z= rotacao.z;        
    estrutura.position.x= posicao.x;                                                                //Posiciona a estrutura na posição
    estrutura.position.y= posicao.y;
    estrutura.position.z= posicao.z;
    estrutura.castShadow=true;                                                                      //Gerar Sombras
    estrutura.receiveShadow=true;                                                                   //Receber Sombras
    return estrutura;
}

//Cria o Fogo do Motor
function createFogo(posicao,rotacao, cor, tamanho){
    const geometria = new THREE.SphereBufferGeometry(tamanho,32,32);                            //Geometria da estrutura
    const material = new THREE.PointsMaterial({                                                 //Material a aplicar
        color: cor,                                                                                 //Cor base
        size: 1.5,                                                                                  //Tamanho                                                                              //Textura a aplicar
        sizeAttenuation: true                                                                       //Atenuar      
    });
    const fogo= new THREE.Points(geometria,material);
    fogo.rotation.x= rotacao.x;                                                                //Roda o objeto
    fogo.rotation.y= rotacao.y;
    fogo.rotation.z= rotacao.z;        
    fogo.position.x= posicao.x;                                                                //Posiciona a estrutura na posição
    fogo.position.y= posicao.y;
    fogo.position.z= posicao.z;
    return fogo;
}