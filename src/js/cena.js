//Modulo Principal da aplicação
import * as Spaceship from './spaceship.js'
import * as Ambiente from './ambiente.js'
import * as THREE from './three.module.js'
import * as Luzes from './iluminacao.js'
import * as Inimigos from './inimigos.js'
import * as CENA from './objetos.js'
import * as Astro from './astros.js'
import * as Projectil from './projectil.js'

//Atualiza o ecrã de jogo
function animate() {
    CENA.atualizarCameras();                                            //Atualiza as Camaras
    CENA.atualizarRenderer("Principal");                                //Atualiza o Render Principal
    CENA.atualizarRenderer("Miniatura");                                //Atualiza o Render da Miniatura
}

//Pausa a execução da função durante o tempo especificado
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
        animate()
        await sleep(5);                                                 //Pausa a animação
    }while(i< 1);   
    Projectil.removerProjetil(explosao);                                //Elimina a explosão
}

//Cria os Inimigos
async function criarInimigo(){
    for(let i=0; i<5; i++){
        let numero = CENA.gerarPosicao();                               //Gerar Posição Aleatória
        let posicao = {x:numero, y:1500, z: 50}                         //Define a posição final
        Inimigos.createNave(posicao);                                   //Cria a nave Inimiga
        await sleep(4000)                                               //Aguarda um tempo até gerar proximo elemento                                               
    }
}

//Seleciona um tipo de astro
function selecionarTipo(){
    let tipo = Math.round(Math.random()*4);                             //Seleciona um tipo
    switch(tipo){
        case 0:
            tipo = "Lua";
            break;
        case 1:
            tipo ="Asteroide";
            break;
        case 2:
            tipo = "Fogo";
            break;
        case 3:
            tipo="Aquatico";
            break;
        case 4:
            tipo="Estrela";
            break;
    }
    return tipo;
}

//Cria os Astros
async function criarAstro(){
    for(let i=0; i< 10; i++){
        let numero = CENA.gerarPosicao();                                   //Gerar Posição aleatória               
        let posicao = {x:numero, y:1500, z: 50};                            //Define a posição final
        let tamanho = Math.round(Math.random()*30+10);                      //Seleciona um tamanho aleatório
        let tipo = selecionarTipo();                                        //Seleciona um tipo aleatório
        let r = Math.round(Math.random()*8+1);                              //Seleciona um valor aleatório para calcular rotação
        let rotacao = {x:Math.PI/r,y:Math.PI/r,z:Math.PI/r};                //Define Rotação
        Astro.createAstro(tipo,tamanho,posicao,rotacao);                    //Cria Objeto
        await sleep(10000);                                                 //Aguarda um tempo para criar o proximo
    }
}

//Move a Nave
function moverNave(direcao){
    const nave = CENA.getNave();                                            //Obter o objeto da Nave
    if(nave.position.x+direcao < 400 && nave.position.x+direcao > -400){    //Permite mover objeto entre as posições -400 e 400 do sistema de coordenas 
        nave.position.x += direcao;                                         //Atualiza a posição da camara da Miniatura para acompanhar o movimento da camara
        CENA.moverCameraMini(direcao);
    }
}

//Cria o Projectil da Nave
function disparar(){
    const nave = CENA.getNave();                                            //Obtem o objeto da nave
    let posicao = nave.position;                                            //Obter a posição da nave
    Projectil.createProjectil(posicao);                                     //Cria os lasers
}

//Função para aceitar os eventos da tecla para mudar a vista
document.addEventListener("keydown", teclaPresionada, false);                                       //Verifica se tecla foi presionada
function teclaPresionada(event){
    let key = event.which;
    switch (key){
        case 37:                                                                                    //Mover para a esquerda (Seta Esquerda)
            moverNave(-10);
            break;
        case 38:                                                                                    //Disparar (Seta Cima)
            disparar();
            break
        case 39:                                                                                    //Mover para a Direita (Seta Direita)
            moverNave(10);
            break;
    }
}

//Mover os disparos 
function moverDisparos(){
    const disparos = CENA.obterDisparos();                                  //Obter os objetos dos lasers
    for(let i = 0; i< disparos.length; i++){                                //Percorre o array de objetos
        let objeto = disparos[i];                                           //Obtem o objeto da posição atual
        objeto.position.y+=30;                                              //e atualiza a posição do eixo y
        if(objeto.position.y > 1000){                                       //Caso objeto chegue á posição y = 1000
            Projectil.removerProjetil(objeto);                              //remove o objeto
        }
    }
}

//Mover Inimigo
function moverInimigo(){
    const inimigos=CENA.obterInimigos();                                    //Obtem objetos do tipo Inimigo
    for(let i = 0; i< inimigos.length; i++){                                //Percorre array dos objetos
        let objeto = inimigos[i];                                           //Obtem objeto da posição atual
        objeto.position.y-=10;                                              //Atualiza para a nova posição no eixo dos y
        if(objeto.position.y<250){                                          //Se chegar ao limite inferior (y<250)
            Inimigos.removerInimigo(objeto);                                //Vai remover objeto da posição (movendo para posição inicial)
            let ponto = document.getElementById("Vidas").innerHTML;         //Vai obter valor das vidas restantes
            if(Number(ponto)-1 ==0)                                         //Verifica se vidas Terminaram
                createGameOver();                                           //e em caso positivo mostra "Game Over" ao utilizador
            if(Number(ponto)-1>=0)
                document.getElementById("Vidas").innerHTML = Number(ponto)-1;   //Reduz o valor das vidas restantes
        }
    }
}

//Mover Inimigo
function moverAstro(){
    const astros=CENA.obterAstros();                                        //Obtem lista de objetos do tipo Astro e Estrela
    for(let i = 0; i< astros.length; i++){                                  //Percorre lista de Objetos
        let objeto = astros[i];                                             //Obtem o objeto atual
        objeto.position.y-=10;                                              //Atualiza a posição para o novo y
        if(objeto.name=="Estrela"){                                         //Verifica se astro é do tipo estrela
            let direcao = Math.round(Math.random())                         //Calcula um valor aleatório para verificar qual a direção que irá modificar objeto
            if(direcao==1){
                Astro.scaleStar(objeto,0.01);                               //Aumenta a escala da estrela
            } else{
                Astro.scaleStar(objeto,-0.01);                              //Reduz a escala da estrela
            }
        }
        Astro.rodarAstros(objeto);                                          //Atualiza rotação do objeto
        if(objeto.position.y<250){                                          //Verifica se astro chegou ao valor limite (y<250)
            Astro.removerAstro(objeto);                                     //Remove o objeto para a posição inicial
            let ponto = document.getElementById("Vidas").innerHTML;         //Obtem o valor das vidas restantes
            if(Number(ponto)-1 ==0)                                         //Verifica se existem mais vidas
                createGameOver();                                           //Mostra "Game Over" ao utilizador
            if(Number(ponto)-1>=0)
                document.getElementById("Vidas").innerHTML = Number(ponto)-1;   //Reduz o valor das vidas restantes
        }
    }
}

//Detectar Colisão
function detectarColisao(){
    //let cobj;
    //let cdisp;
    let colisao = CENA.colisores                                                            //Obtem objetos que podem colidir
    let disparos = CENA.obterDisparos();                                                    //Obtem objetos de lasers
    for(let i = 0; i < colisao.length; i++){                                                //Percorre a lista de objetos colisores
        let objeto = colisao[i];                                                            //e obtem posição atual
        if(disparos.length >0){                                                             //verifica se existem disparos
            for(let e = 0; e < disparos.length; e++){                                       //Percorre a lista de disparos
                let disparo = disparos[e];                                                  //e obtem grupo de laser atual
                for(let o =0; o < disparo.children.length; o++){                            //Percorre o grupo do laser
                    let disp = disparo.children[o];                                         //e obtem o laser da posição
                    let cobj = new THREE.Box3().setFromObject(objeto);                      //Cria um objeto de colisão temporário (Astro/Inimigo)
                    let cdisp = new THREE.Box3().setFromObject(disp);                       //Cria um objeto de colisão temporário (Laser)
                    if(cobj.intersectsBox(cdisp)==true){                                    //Verifica se objetos colidem
                        let posicao = objeto.position;                                      //Obtem posição do objeto que colidiu
                        criarExplosao(posicao);                                             //Cria explosão
                        switch(objeto.type){
                            case "Inimigo":
                                Inimigos.removerInimigo(objeto);                            //Move objeto para o inicio
                                break;
                            case "Estrela":
                                Astro.removerAstro(objeto);                                 //Move objeto para o inicio
                                break;
                            case "Astro":
                                Astro.removerAstro(objeto);                                 //Move o objeto para o inicio
                                break;
                        }
                        CENA.removerObjeto(disparo);                                        //Remove o laser da cena
                        let ponto = document.getElementById("Pontos").innerHTML;            //Obtem o valor atual de pontos
                        document.getElementById("Pontos").innerHTML = Number(ponto) +1;     //e incrementa
                    }
                    cobj.makeEmpty();                                                       //Esvazia os objetos de comparação de interseção
                    cdisp.makeEmpty();
                }
            }
        }
    }
}

//Função Inicial do Programa
function init(){
    CENA.inicializarCena();                                                                     //Inicia as definições da cena
    Ambiente.createSpace();                                                                     //Cria o ambiente de jogo
    Luzes.createLight();                                                                        //Cria a luz ambiente
    Spaceship.createSpaceship({x:0,y:0,z:50});                                                  //Cria a nave principal
    let colisao = setInterval(detectarColisao,100);                                             //Define um temporizador para detectar as colisões
    criarInimigo();                                                                             //Cria os Inimigos
    criarAstro();                                                                               //Cria os Astros
    let moveInimigo = setInterval(moverInimigo,100);                                            //Define um temporizador para mover os inimigos
    let moveAstro = setInterval(moverAstro,100);                                                //Define um temporizador para mover os astro
    let tempo = setInterval(moverDisparos,100);                                                 //Define um temporizador para mover os laser
    let atualizar = setInterval(animate,10);                                                    //Define um temporizador para atualizar os render
    animate();                                                                                  //atualiza o render
}

//Função para atualizar proporções das cameras no redimensionamento do browser.
window.addEventListener("resize", updateCamera);
function updateCamera(event){
    CENA.setCameraPrincipal();                                                                      //Definir o novo Tamanho dos Renderer e Cameras
    CENA.setCameraMini();                                                                           
}

//Função para mostrar Game Over no ecrã
function createGameOver(){
    document.removeEventListener("keydown",teclaPresionada, false);                                 //Bloqueia os eventos do teclado
    document.getElementById("gameover").style.visibility = "visible";                               //Mostra div de Game Over
}

init();