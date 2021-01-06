//Código para criar os inimigos
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'
/* 
const geometryAsa = new THREE.BufferGeometry().fromGeometry(new THREE.ConeBufferGeometry(40,30,4));
const geometryCorpoF = new THREE.BufferGeometry().fromGeometry(new THREE.ConeBufferGeometry(20,10,8));
const geometryCorpoC = new THREE.BufferGeometry().fromGeometry(new THREE.CylinderBufferGeometry(20,20,100,8,8));
const geometryMotor = new THREE.BufferGeometry().fromGeometry(new THREE.CylinderBufferGeometry(20,10,15,8,8)); 
*/
//Cria a Nave Inimiga
export function createNave(posicao){
    const nave = new THREE.Group();                                                                     //Cria um grupo para os elementods da nave
    nave.add(createCorpo({x:0, y:0, z:50}));                                                                            //Cria e adiciona um corpo da nave
    nave.add(createAsa({x:0, y:80, z:50},{x:0,y:Math.PI,z:Math.PI}))
    nave.position.x= posicao.x;
    nave.position.y= posicao.y;
    nave.position.z= posicao.z;
    nave.name="Inimigo";
    nave.type="Inimigo";
    CENA.adicionarObjeto(nave);                                                                        //Adiciona na cena
}

export function removerInimigo(objeto){
    let numero = Math.round(Math.random()*400);
    let negativo = Math.random()*2;
    if(negativo<1){
        numero *= -1;
    }
    let posicao = {x:numero, y:1500, z:50}
    objeto.position.x=posicao.x;
    objeto.position.y=posicao.y;
    objeto.position.z=posicao.z;
}

//Cria a asa do Inimigo
function createAsa(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal2.jpg');                            //Loader para a textura
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(10,10);                                                                      //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
    //const geometria = geometryAsa.clone()
    const geometria = new THREE.ConeBufferGeometry(40,30,4);                                              //Geometria da Asa
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
function createCorpo(posicao){
    const corpo = new THREE.Group();
    corpo.add(createCorpoF(posicao,{x:Math.PI,y:0, z:0}));
    corpo.add(createCorpoC({x:posicao.x,y:posicao.y+55,z:posicao.z},{x:Math.PI,y:0,z:0}));
    corpo.add(createMotor({x:posicao.x,y:posicao.y+110,z:posicao.z},{x:Math.PI,y:0,z:0}));
    corpo.add(createFogo({x:posicao.x,y:posicao.y+125,z:posicao.z},{x:0,y:0,z:0},0xF5A935,16));
    corpo.add(createFogo({x:posicao.x,y:posicao.y+125,z:posicao.z},{x:0,y:0,z:0},0x00427F,15));
    corpo.add(Luzes.createLightCockpit(0x006aff,1,{x:posicao.x,y:posicao.y,z:posicao.z}));
    return corpo;
}

//Criar a parte da frente da nave
function createCorpoF(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/metal2.jpg');                            //Loader para a textura
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(10,10);                                                                      //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
    //const geometria = geometryCorpoF.clone();
    const geometria = new THREE.ConeBufferGeometry(20,10,8);                                              //Geometria das estrutura lateral - frente
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
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(10,10);                                                                      //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
    //const geometria = geometryCorpoC.clone();
    const geometria = new THREE.CylinderBufferGeometry(20,20,100,8,8);                                    //Geometria das estrutura lateral - centro
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
    //const geometria = geometryMotor.clone();
    const geometria = new THREE.CylinderBufferGeometry(20,10,15,8,8);                                     //Geometria das estrutura do motor
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(10,10);                                                                      //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
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
    const geometria = new THREE.SphereBufferGeometry(tamanho,32,32);                            //Geometria da estrutura
    const material = new THREE.PointsMaterial({                                                 //Material a aplicar
        color: cor,                                                                            //Cor base
        size: 1.5,                                                                                  //Tamanho
        sizeAttenuation: false                                                                       //Atenuar      
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