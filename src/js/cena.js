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
        await sleep(5);                                               //Pausa a animação
    }while(i< 1);   
    Projectil.removerProjetil(explosao);                                 //Elimina a explosão
}

//Cria os Inimigos
async function criarInimigo(){
    for(let i=0; i<2; i++){
        let numero = Math.round(Math.random()*400);
        let negativo = Math.random()*2;
        if(negativo<1){
            numero *= -1;
        }
        let posicao = {x:numero, y:1500, z: 50}
        Inimigos.createNave(posicao);
        await sleep(2000)
    }
    animate();
}

//Cria os Astros
function criarAstro(){
    let numero = Math.round(Math.random()*400);
    let negativo = Math.random()*2;
    if(negativo<1){
        numero *= -1;
    }
    let posicao = {x:numero, y:1500, z: 50};
    let tamanho = Math.round(Math.random()*30+10);
    let tipo = Math.round(Math.random()*4);
    let r = Math.round(Math.random()*8+1);
    let rotacao = {x:Math.PI/r,y:Math.PI/r,z:Math.PI/r};
    switch(tipo){
        case 0:
            tipo = "Lua";
            Astro.createAstro(tipo,tamanho,1,posicao,rotacao);
            break;
        case 1:
            tipo ="Asteroide";
            Astro.createAstro(tipo,tamanho,0,posicao,rotacao);
            break;
        case 2:
            tipo = "Fogo";
            Astro.createAstro(tipo,tamanho,32,posicao,rotacao);
            break;
        case 3:
            tipo="Aquatico";
            Astro.createAstro(tipo,tamanho,32,posicao,rotacao);
            break;
        case 4:
            tipo="Estrela";
            Astro.createAstro(tipo,tamanho,32,posicao,rotacao);
            break;
    }
    animate();
}

//Move a Nave
function moverNave(direcao){
    const nave = CENA.getNave();
    if(nave.position.x+direcao < 400 && nave.position.x+direcao > -400){
        nave.position.x += direcao;
        CENA.moverCameraMini(direcao);
    }
}

//Cria o Projectil da Nave
function disparar(){
    const nave = CENA.getNave();
    let posicao = nave.position;
    Projectil.createProjectil(posicao);
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
        objeto.position.y+=30;
        if(objeto.position.y > 1000){    
            Projectil.removerProjetil(objeto);
        }
    }
}

//Mover Inimigo
function moverInimigo(){
    const inimigos=CENA.obterInimigos();
    for(let i = 0; i< inimigos.length; i++){
        let objeto = inimigos[i];
        objeto.position.y-=10;
        if(objeto.position.y<0){    
            Inimigos.removerInimigo(objeto);
        }
    }
}

//Mover Inimigo
function moverAstro(){
    const astros=CENA.obterAstros();
    for(let i = 0; i< astros.length; i++){
        let objeto = astros[i];
        objeto.position.y-=10;
        if(objeto.name=="Estrela"){
            let direcao = Math.round(Math.random())
            if(direcao==1){
                Astro.scaleStar(objeto,0.01);
            } else{
                Astro.scaleStar(objeto,-0.01);
            }
        }
        Astro.rodarAstros(objeto);
        if(objeto.position.y<0){    
            Astro.removerAstro(objeto);
        }
    }
}

//Detectar Colisão
function detectarColisao(){
    let colisao = CENA.colisores
    let disparos = CENA.obterDisparos();
    for(let i = 0; i < colisao.length; i++){
        let objeto = colisao[i];
        if(disparos.length >0){
            for(let e = 0; e < disparos.length; e++){
                let disparo = disparos[e];
                for(let o =0; o < disparo.children.length; o++){
                    let disp = disparo.children[o];
                    let cobj = new THREE.Box3().setFromObject(objeto);
                    let cdisp = new THREE.Box3().setFromObject(disp);
                    if(cobj.intersectsBox(cdisp)==true){
                        let posicao = objeto.position;
                        criarExplosao(posicao);
                        switch(objeto.type){
                            case "Inimigo":
                                Inimigos.removerInimigo(objeto);
                                break;
                            case "Estrela":
                                Astro.removerAstro(objeto);
                                break;
                            case "Astro":
                                Astro.removerAstro(objeto);
                                break;
                        }
                        CENA.removerObjeto(disparo);
                        let ponto = document.getElementById("Pontos").innerHTML;
                        document.getElementById("Pontos").innerHTML = Number(ponto) +1;
                    }
                }
            }
        }
    }
}

//Função Inicial do Programa
function init(){
    CENA.inicializarCena();
    Ambiente.createSpace();
    Luzes.createLight();
    Spaceship.createSpaceship({x:0,y:0,z:50});
    let colisao = setInterval(detectarColisao,100);
    criarInimigo();
    criarAstro();
    let moveInimigo = setInterval(moverInimigo,100);
    let moveAstro = setInterval(moverAstro,100);
    let tempo = setInterval(moverDisparos,100);
    let atualizar = setInterval(animate,100);
    animate();
}

//Função para atualizar proporções das cameras no redimensionamento do browser.
window.addEventListener("resize", updateCamera);
function updateCamera(event){
    CENA.setCameraPrincipal();                                                                      //Definir o novo Tamanho do Renderer e Cameras
    CENA.setCameraMini();
    animate();
}

init();