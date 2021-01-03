//Código para criar os inimigos
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'

//Cria a Nave Inimiga
export function createNave(){
    const nave = new THREE.Group();                                                                     //Cria um grupo para os elementods da nave
    nave.add(createCorpo());                                                                            //Cria e adiciona um corpo da nave
    nave.add(createAsa({x:0,y:80,z:50},{x:0,y:Math.PI,z:Math.PI}))
    CENA.cena.scene.add(nave);                                                                          //Adiciona na cena
}

//Cria a asa do Inimigo
function createAsa(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal2.jpg');                            //Loader para a textura
    const geometria = new THREE.ConeGeometry(40,30,4);                                              //Geometria da Asa
    const material = new THREE.MeshPhongMaterial({                                                  //Material da Estrutura
        color: 0xffffff,                                                                                //Cor base
        side: THREE.FrontSide,                                                                          //Ren deriza apenas um lado
        map: texture                                                                                    //Textura a aplicar
    });
    const asa = new THREE.Mesh(geometria,material);                                                 //Cria o objeto
    asa.rotation.x= rotacao.x;                                                                      //Roda o objeto
    asa.rotation.y= rotacao.y;
    asa.rotation.z= rotacao.z;        
    asa.position.x= posicao.x;                                                                      //Posiciona a estrutura na posição
    asa.position.y= posicao.y;
    asa.position.z= posicao.z;
    asa.castShadow=true;                                                                            //Gerar Sombras
    asa.receiveShadow=true;                                                                         //Receber Sombras
    return asa;
}

//Cria o corpo da Nave Inimiga
function createCorpo(){
    const corpo = new THREE.Group();
    corpo.add(createCorpoF({x:0,y:0,z:50},{x:Math.PI,y:0, z:0}));
    corpo.add(createCorpoC({x:0,y:55,z:50},{x:Math.PI,y:0,z:0}));
    corpo.add(createMotor({x:0,y:110,z:50},{x:Math.PI,y:0,z:0}));
    corpo.add(createFogo({x:0,y:125,z:50},{x:0,y:0,z:0},0xF5A935,16));
    corpo.add(createFogo({x:0,y:125,z:50},{x:0,y:0,z:0},0x00427F,15));
    corpo.add(Luzes.createLightCockpit(0x006aff,1,{x:0,y:0,z:50}));
    return corpo;
}

//Criar a parte da frente da nave
function createCorpoF(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal2.jpg');                            //Loader para a textura
    const geometria = new THREE.ConeGeometry(20,10,8);                                              //Geometria das estrutura lateral - frente
    const material = new THREE.MeshPhongMaterial({                                                  //Material para a estrutura
        color:0xffffff,                                                                                 //Cor Base
        side: THREE.FrontSide,                                                                          //Renderiza apenas um lado
        map: texture,                                                                                   //Textura a aplicar
        transparent: true,                                                                              //Transpacencia
        opacity:0.5                                                                                     //Opacidade
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

//Criar a parte central da nave
function createCorpoC(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal2.jpg');                            //Loader para a textura
    const geometria = new THREE.CylinderGeometry(20,20,100,8,8);                                    //Geometria das estrutura lateral - centro
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

//Criar o motor da nave
function createMotor(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal4.jpg');                            //Loader para a textura
    const geometria = new THREE.CylinderGeometry(20,10,15,8,8);                                     //Geometria das estrutura do motor
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(10,10);                                                                      //Quantidade de Repetições
    const material = [                                                                              //Material para a estrutura
        new THREE.MeshPhongMaterial({                                                               //Lateral da estrutura
            color:0xeee2f6,                                                                            //Cor Base
            side: THREE.FrontSide,                                                                     //Renderiza apenas um lado
            map: texture                                                                               //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                               //Topo da estrutura
            color:0xeee2f6,                                                                             //Cor Base
            side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
            map: texture                                                                                //Textura a aplicar
        }),
        new THREE.MeshPhongMaterial({                                                               //Base da estrutura
            color:0xf5a935,                                                                             //Cor Base
            side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
            map: texture,                                                                               //Textura a aplicar
            emissive: 0xf5a935                                                                          //Cor que emite
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
    const textura = new THREE.TextureLoader().load('images/chama.jpg');                         //Textura a aplicar
    const geometria = new THREE.SphereBufferGeometry(tamanho,32,32);                                 //Geometria da estrutura
    const material = new THREE.PointsMaterial({                                                 //Material a aplicar
        color: cor,                                                                            //Cor base
        size: 1.5,                                                                                  //Tamanho
        map: textura,                                                                               //Textura a aplicar
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