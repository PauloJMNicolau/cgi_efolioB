//Cria os Projetil e Explosões
import * as CENA from './objetos.js'
import * as THREE from './three.module.js'

//Cria os Projetil
export function createProjectil(posicao){
    const projectil = new THREE.Group();                                            //Cria um grupo para os laser
    projectil.add(criarProjectil({x:-85, y:250, z:50},{x:0,y:0,z:0}));              //Cria o laser esquerdo
    projectil.add(criarProjectil({x:85, y:250, z:50},{x:0,y:0,z:0}));               //Cria o laser direito
    projectil.position.x= posicao.x;                                                //Define as posições dos laser
    projectil.position.y= posicao.y;
    projectil.position.z= posicao.z;
    projectil.type="Disparo"                                                        //Atribui nome e tipo ao grupo
    projectil.name="Disparo"
    CENA.adicionarObjeto(projectil);                                                //Adiciona na cena
}

//Criar Explosões
export function createExplosion(posicao){
    const explosao = new THREE.Group();                                                                             //Cria um grupo para as explosoes
        explosao.add(createExplosao(100,3, 0xff6f2f, {x:0,y:0,z:50},{x:0,y:0,z:0}))                                 //e cria vários objetos do tipo explosão
        explosao.add(createExplosao(100,3, 0x003d84, {x:0,y:0,z:50},{x:Math.PI/4,y:Math.PI/4,z:0}))                 //com vários tamanhos, cores e rotações
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
        explosao.type="Explosão";                                                                                   //atribui nome e tipo ao grupo
        explosao.name="Explosão";
        explosao.position.x += posicao.x;                                                                           //Define as posições do grupo
        explosao.position.y += posicao.y;
        explosao.position.z += posicao.z;
    CENA.adicionarObjeto(explosao);                                                                                 //Adiciona na cena
}

//Remover Objetos
export function removerProjetil(objeto){
    CENA.removerObjeto(objeto);                                     //Remove o objeto da cena
    for(let i = objeto.children.length-1; i>=0;i--){                //Percorre a lista de objhetos do grupo e remove a geometria
        if(objeto.children[i]){
            objeto.children[i].geometry.dispose();
        }
    }
}

//Escalar a explosão da cena
export function escalarExplosao(objeto){
    for(let i = 0; i < objeto.children.length; i++){                                                            //Percorre os objetos do grupo
        let scale = objeto.children[i].scale;                                                                   //Obtem os valores de escala do objeto atual
        scale.x += 0.05;                                                                                        //e atualiza novos valores
        scale.y += 0.05;
        scale.z += 0.05;
        objeto.children[i].geometry.applyMatrix4(new THREE.Matrix4().makeScale(scale.x, scale.y, scale.z ) );   //Aplica os novos valores ao objeto
    }
}

//Cria os projectil da Nave
function criarProjectil(posicao,rotacao){
    const geometria = new THREE.CylinderGeometry(3,3,30,5,5);                               //Geometria das estrutura do motor
    const material = [                                                                      //Material para a estrutura
        new THREE.MeshLambertMaterial({                                                         //Lateral da estrutura
            color:0xff002e,                                                                         //Cor Base
            side: THREE.FrontSide,                                                                  //Renderiza apenas um lado
        }),
        new THREE.MeshLambertMaterial({                                                         //Topo da estrutura
            color:0xff002e,                                                                         //Cor Base
            side: THREE.FrontSide,                                                                  //Renderiza apenas um lado
        }),
        new THREE.MeshLambertMaterial({                                                         //Base da estrutura
            color:0xff002e,                                                                         //Cor Base
            side: THREE.FrontSide,                                                                  //Renderiza apenas um lado
        })
    ];
    const estrutura = new THREE.Mesh(geometria,material);                                   //Cria o objeto
    estrutura.rotation.x= rotacao.x;                                                        //Roda o objeto
    estrutura.rotation.y= rotacao.y;
    estrutura.rotation.z= rotacao.z;        
    estrutura.position.x= posicao.x;                                                        //Posiciona a estrutura na posição
    estrutura.position.y= posicao.y;
    estrutura.position.z= posicao.z;
    estrutura.castShadow=true;                                                              //Gerar Sombras
    estrutura.receiveShadow=true;                                                           //Receber Sombras
    return estrutura;
}

//Cria Explosão{
function createExplosao(tamanho, detalhe, cor, posicao,rotacao){
    const geometria = new THREE.TetrahedronGeometry(tamanho,detalhe);                           //Geometria das estrutura do motor
    const material =                                                                            //Material para a estrutura
        new THREE.PointsMaterial({                                                              //Lateral da estrutura
            color:cor,                                                                              //Cor Base
            size: 3,                                                                                //Tamanho
            sizeAttenuation: true                                                                   //Atenuação
        });
    const estrutura = new THREE.Points(geometria,material);                                     //Cria o objeto
    estrutura.rotation.x= rotacao.x;                                                            //Roda o objeto
    estrutura.rotation.y= rotacao.y;
    estrutura.rotation.z= rotacao.z;        
    estrutura.position.x= posicao.x;                                                            //Posiciona a estrutura na posição
    estrutura.position.y= posicao.y;
    estrutura.position.z= posicao.z;
    estrutura.castShadow=true;                                                                  //Gerar Sombras
    estrutura.receiveShadow=false;                                                              //Receber Sombras
    estrutura.name="Explosivo"
    return estrutura;
}