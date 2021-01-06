import * as Spaceship from './spaceship.js'
import * as Ambiente from './ambiente.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'
import * as Inimigos from './inimigos.js'
import * as CENA from './objetos.js'
import * as Astro from './astros.js'
import * as Projectil from './projectil.js'

function animate() {
    CENA.atualizarCameras();
    CENA.atualizarRenderer("Principal");
    CENA.atualizarRenderer("Miniatura");
    requestAnimationFrame( animate );
   
}

//Pausa a execução
function sleep(tempo){
    return new Promise(resolve => setTimeout(resolve,tempo));
}

//Cria a explosão na posição fornecida
async function criarExplosao(posicao){
    Projectil.createExplosion(posicao);                                 //Cria a explosão
    let explosao = CENA.getExplosao();                                  //Obtem o objeto da explosão para modificar
    let i = 0.05;                                                       //Variável de controlo
    explosao.scale.set(i,i,i);                                          //Escala a explosão no minimo
    do{                                                                 //Faz a animação do escalamento da explosão
        Projectil.escalarExplosao(explosao);;                           //Aplica a nova escala
        i+=0.05;                                                        //Incrementa o valor de controlo
        animate();                                                      //Atualiza o ecrã
        await sleep(100);                                               //Pausa a animação
    }while(i< 1);   
    Projectil.apagarExplosao(explosao);                                 //Elimina a explosão
}

function criarInimigo(){
    //do{
        let numero = Math.random()*400;
        let negativo = Math.random()*2;
        if(negativo<1){
            numero *= -1;
        }
        let posicao = {x:numero, y:500, z: 50}
        Inimigos.createNave(posicao);
        animate();
        console.log(posicao);
    //    await sleep(10000);
    //}while(true);
}

//Move a Nave
function moverNave(direcao){
    const nave = CENA.getNave();
    nave.position.x += direcao;
    CENA.moverCameraMini(direcao);
    animate();
}

//Cria o Projectil da Nave
function disparar(){
    const nave = CENA.getNave();
    let posicao = nave.position;
    Projectil.createProjectil(posicao);
    animate();
}

//Função para aceitar os eventos da tecla para mudar a vista
document.addEventListener("keydown", teclaPresionada, false);                                       //Verifica se tecla foi presionada
function teclaPresionada(event){
    let key = event.which;
    switch (key){
        case 37:                                                                                    //Mover para a esquerda
            moverNave(-10);
            break;
        case 38:                                                                                    //Disparar
            disparar();
            break
        case 39:                                                                                    //Mover para a Direita
            moverNave(10);
            break;
    }
}

//Mover os disparos 
function moverDisparos(){
    const disparos = CENA.obterDisparos();
    for(let i = 0; i< disparos.length; i++){
        let objeto = disparos[i];
        objeto.position.y+=10;
        if(objeto.position.y > 1500){    
            Projectil.removerDisparo(objeto);
        }
    }
}

function init(){
    CENA.inicializarCena();
    Ambiente.createSpace();
    Luzes.createLight();
    Spaceship.createSpaceship();
    criarInimigo();
    let inimigo = setInterval(criarInimigo,5000);
    let tempo = setInterval(moverDisparos,100);
    animate();
}

init();