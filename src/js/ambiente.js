import * as CENA from './objetos.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'

//Cria o ambiente onde os objetos irão ser visualizados
export function createSpace(){
    const fundo = createSpacePlano({x:0,y:1500,z:0},{x:Math.PI/2,y:0,z:0});                                            //Cria o fundo do ambiente
    const base = createSpacePlano({x:0,y:0,z:0},{x:0,y:0,z:0});                                                //Cria a base do ambiente
    const ladoE = createSpacePlano({x:-1500,y:0,z:0},{x:0,y:Math.PI/2,z:0});                                           //Cria o lado esquerdo do ambiente
    const ladoD = createSpacePlano({x:1500,y:0,z:0},{x:0,y:-(Math.PI/2),z:0});                                           //Cria o lado direito do ambiente
    const topo = createSpacePlano({x:0,y:1500,z:1500},{x:0,y:Math.PI,z:0});                                         //Cria o lado direito do ambiente
    const space = new THREE.Group();                                                                            //Cria um grupo para os elementos criados anteriormente
    space.add(fundo);                                                                                           //e adiciona os elementos ao grupo
    space.add(base);
    space.add(ladoD);
    space.add(ladoE);
    space.add(topo);
    CENA.adicionarObjeto(space);                                                                                            //Adiciona o grupo na cena de modo a ser renderizado    
}

//Cria o Plano que será adicionado na cena
function createSpacePlano(posicao, rotacao){
    const geometria = new THREE.PlaneGeometry(3000,3000,100);                                                   //Cria o plano do ambiente
    const textura = new THREE.TextureLoader().load('images/space2.jpg'); 
    const material = new THREE.MeshBasicMaterial({                                                              //Cria o material com as propriedades
        color: 0xffffff,                                                                                        //cor base
        map: textura,                                                                                           //adiciona a textura definida anteriormentes
        side: THREE.FrontSide                                                                                   //renderiza apenas um lado
    });
    const plano = new THREE.Mesh(geometria, material);                                                          //Cria o objeto
    plano.position.x=posicao.x;                                                                                 //Posiciona o plano de fundo na posição
    plano.position.y= posicao.y;                                                                               
    plano.position.z=posicao.z;     
    plano.rotation.x=rotacao.x;                                                                                 //Roda o plano para a posição
    plano.rotation.y=rotacao.y;
    plano.rotation.z= rotacao.z;
    return plano;
}
