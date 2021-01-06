//Cria os Projetil e Explosões
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'

export function createProjectil(posicao){
    const projectil = new THREE.Group();
    projectil.add(criarProjectil({x:posicao.x-85, y:posicao.y+250, z:posicao.z},{x:0,y:0,z:0}));
    projectil.add(criarProjectil({x:posicao.x+85, y:posicao.y+250, z:posicao.z},{x:0,y:0,z:0}));
    projectil.type="Disparo"
    projectil.name="Disparo"
    CENA.adicionarObjeto(projectil);
}

export function createExplosion(posicao){
    const explosao = new THREE.Group();
        explosao.add(createExplosao(100,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(100,3, 0x003d84, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(100,3, 0xec0000, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(100,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(100,3, 0x003d84, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(100,3, 0xec0000, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(90,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(90,3, 0xffa823, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(90,3, 0xec009b, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(90,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(90,3, 0xffa823, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(90,3, 0xec009b, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(80,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(80,3, 0x003d84, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(80,3, 0xec0000, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(80,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(80,3, 0x003d84, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(80,3, 0xec0000, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(70,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(70,3, 0xffa823, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(70,3, 0xec009b, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(70,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(70,3, 0xffa823, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(70,3, 0xec009b, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(60,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(60,3, 0x003d84, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(60,3, 0xec0000, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(60,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(60,3, 0x003d84, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(60,3, 0xec0000, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(50,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(50,3, 0xffa823, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(50,3, 0xec009b, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(50,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(50,3, 0xffa823, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(50,3, 0xec009b, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(40,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(40,3, 0x003d84, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(40,3, 0xec0000, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(40,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(40,3, 0x003d84, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(40,3, 0xec0000, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(30,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(30,3, 0xffa823, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(30,3, 0xec009b, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(30,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(30,3, 0xffa823, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(30,3, 0xec009b, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(20,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(20,3, 0x003d84, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(20,3, 0xec0000, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(20,3, 0xff6f2f, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(20,3, 0x003d84, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(20,3, 0xec0000, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(10,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(10,3, 0xffa823, posicao,{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(10,3, 0xec009b, posicao,{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(10,3, 0x23ffb1, posicao,{x:0,y:0,z:0}))
        explosao.add(createExplosao(10,3, 0xffa823, posicao,{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(10,3, 0xec009b, posicao,{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.type="Explosão";
        explosao.name="Explosão";
    CENA.adicionarObjeto(explosao);
}

//Apagar a explosão da cena
export function apagarExplosao(objeto){
    CENA.removerObjeto(objeto);
    for(let i = objeto.children.length-1; i==0;i--){
        objeto.children[i].material.dispose();
    }
}

export function removerDisparo(objeto){
    CENA.removerObjeto(objeto);
    for(let i = objeto.children.length-1; i==0;i--){
        objeto.children[i].material.dispose();
    }
}

//Escalar a explosão da cena
export function escalarExplosao(objeto){
    for(let i = 0; i < objeto.children.length; i++){
        let scale = objeto.children[i].scale;
        scale.x += 0.05;
        scale.y += 0.05;
        scale.z += 0.05;
        objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeScale(scale.x, scale.y, scale.z ) );
    }
}

//Cria os projectil da Nave
function criarProjectil(posicao,rotacao){
    const texture = new THREE.TextureLoader().load('images/laser.jpg');                             //Loader para a textura
    const geometria = new THREE.CylinderGeometry(3,3,50,20,20);                                     //Geometria das estrutura do motor
    texture.WrapS = THREE.RepeatWrapping;                                                           //Repetição Horizontal
    texture.WrapT = THREE.RepeatWrapping;                                                           //Repetição Vertical
    texture.repeat.set(30,30);                                                                      //Quantidade de Repetições
    texture.magFilter = THREE.LinearFilter;                                                         //Tipo de Filtro da Textura
    const material = [                                                                              //Material para a estrutura
        new THREE.MeshPhongMaterial({                                                               //Lateral da estrutura
            color:0xff002e,                                                                            //Cor Base
            side: THREE.FrontSide,                                                                     //Renderiza apenas um lado
            map: texture,                                                                              //Textura a aplicar
            emissive: 0xff002e                                                                          //Cor que emite
        }),
        new THREE.MeshPhongMaterial({                                                               //Topo da estrutura
            color:0xff002e,                                                                             //Cor Base
            side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
            map: texture,                                                                               //Textura a aplicar
            emissive: 0xff002e                                                                          //Cor que emite
        }),
        new THREE.MeshPhongMaterial({                                                               //Base da estrutura
            color:0xff002e,                                                                             //Cor Base
            side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
            map: texture,                                                                               //Textura a aplicar
            emissive: 0xff002e                                                                          //Cor que emite
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

//Cria Explosão{
function createExplosao(tamanho, detalhe, cor, posicao,rotacao){
    const geometria = new THREE.TetrahedronGeometry(tamanho,detalhe);                               //Geometria das estrutura do motor
    const material =                                                                             //Material para a estrutura
        new THREE.PointsMaterial({                                                               //Lateral da estrutura
            color:cor,                                                                                  //Cor Base
            size: 10,                                                                                 //Tamanho
            sizeAttenuation: true
        });
    const estrutura = new THREE.Points(geometria,material);                                           //Cria o objeto
    estrutura.rotation.x= rotacao.x;                                                                //Roda o objeto
    estrutura.rotation.y= rotacao.y;
    estrutura.rotation.z= rotacao.z;        
    estrutura.position.x= posicao.x;                                                                //Posiciona a estrutura na posição
    estrutura.position.y= posicao.y;
    estrutura.position.z= posicao.z;
    estrutura.castShadow=true;                                                                      //Gerar Sombras
    estrutura.receiveShadow=false;                                                                   //Receber Sombras
    estrutura.name="Explosivo"
    return estrutura;
}