//Cria os Projetil e Explosões
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'

export function createProjectil(posicao){
    const projectil = new THREE.Group();
    projectil.add(criarProjectil({x:-85, y:250, z:50},{x:0,y:0,z:0}));
    projectil.add(criarProjectil({x:85, y:250, z:50},{x:0,y:0,z:0}));
    projectil.position.x= posicao.x;
    projectil.position.y= posicao.y;
    projectil.position.z= posicao.z;
    projectil.type="Disparo"
    projectil.name="Disparo"
    CENA.adicionarObjeto(projectil);
}

//Criar Explosões
export function createExplosion(posicao){
    const explosao = new THREE.Group();
        explosao.add(createExplosao(100,3, 0xff6f2f, {x:0,y:0,z:50},{x:0,y:0,z:0}))
        explosao.add(createExplosao(100,3, 0x003d84, {x:0,y:0,z:50},{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(100,3, 0xec0000, {x:0,y:0,z:50},{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(100,3, 0xff6f2f, {x:0,y:0,z:50},{x:0,y:0,z:0}))
        explosao.add(createExplosao(100,3, 0x003d84, {x:0,y:0,z:50},{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(100,3, 0xec0000, {x:0,y:0,z:50},{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(90,3, 0x23ffb1, {x:0,y:0,z:50},{x:0,y:0,z:0}))
        explosao.add(createExplosao(90,3, 0xffa823, {x:0,y:0,z:50},{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(90,3, 0xec009b, {x:0,y:0,z:50},{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(90,3, 0x23ffb1, {x:0,y:0,z:50},{x:0,y:0,z:0}))
        explosao.add(createExplosao(90,3, 0xffa823, {x:0,y:0,z:50},{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(90,3, 0xec009b, {x:0,y:0,z:50},{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.add(createExplosao(80,3, 0xff6f2f, {x:0,y:0,z:50},{x:0,y:0,z:0}))
        explosao.add(createExplosao(80,3, 0x003d84, {x:0,y:0,z:50},{x:Math.PI/4,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(80,3, 0xec0000, {x:0,y:0,z:50},{x:Math.PI/4,y:Math.PI/4,z:Math.PI/4}))
        explosao.add(createExplosao(80,3, 0xff6f2f, {x:0,y:0,z:50},{x:0,y:0,z:0}))
        explosao.add(createExplosao(80,3, 0x003d84, {x:0,y:0,z:50},{x:Math.PI/2,y:Math.PI/4,z:0}))
        explosao.add(createExplosao(80,3, 0xec0000, {x:0,y:0,z:50},{x:Math.PI/2,y:Math.PI/4,z:Math.PI/2}))
        explosao.type="Explosão";
        explosao.name="Explosão";
        explosao.position.x += posicao.x;
        explosao.position.y += posicao.y;
        explosao.position.z += posicao.z;
    CENA.adicionarObjeto(explosao);
}

//Remover Objetos
export function removerProjetil(objeto){
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
    const geometria = new THREE.CylinderBufferGeometry(3,3,30,5,5);                                     //Geometria das estrutura do motor
    const material = [                                                                              //Material para a estrutura
        new THREE.MeshLambertMaterial({                                                               //Lateral da estrutura
            color:0xff002e,                                                                            //Cor Base
            side: THREE.FrontSide,                                                                     //Renderiza apenas um lado
            //emissive: 0xff002e                                                                          //Cor que emite
        }),
        new THREE.MeshLambertMaterial({                                                               //Topo da estrutura
            color:0xff002e,                                                                             //Cor Base
            side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
            //emissive: 0xff002e                                                                          //Cor que emite
        }),
        new THREE.MeshLambertMaterial({                                                               //Base da estrutura
            color:0xff002e,                                                                             //Cor Base
            side: THREE.FrontSide,                                                                      //Renderiza apenas um lado
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
    const geometria = new THREE.TetrahedronBufferGeometry(tamanho,detalhe);                               //Geometria das estrutura do motor
    const material =                                                                             //Material para a estrutura
        new THREE.PointsMaterial({                                                               //Lateral da estrutura
            color:cor,                                                                                  //Cor Base
            size: 3,                                                                                 //Tamanho
            sizeAttenuation: false
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