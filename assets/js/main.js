function randomNumber (start, end) { return Phaser.Math.Between(start, end) }
function random (array) { return array[Math.floor(Math.random() * array.length)] }



//Carrega recurssos visuais e sonoros do jogo
function preload () {
	//				identidade sprite 		caminho imagem						mapeamento json
	this.load.atlas('hamtaro_atlas', 'assets/sprites/hamtaro/hamham.png', 'assets/sprites/maps/hamtaro.json')
    this.load.atlas('comida_atlas', 'assets/sprites/assest/food.png', 'assets/sprites/maps/food.json')

}

//Elementos do jogo sao configurados
//Aqui fica a logica do jogo
function create () {

    // Adiciona um texto para informar o score a jogadora
    pontuacao = this.add.text(10, 10, 'SCORE: 0', { 
        fontFamily: 'Arial', 
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    })

    //Cria o Hamtaro na tela (a partir da identidade do sprite do Hamtato_atlas)
   	//								  pos x pos y
    hamtaro = this.physics.add.sprite(150, 150, 'hamtaro_atlas')
    //Cria o sprite de comida
    comida = this.physics.add.sprite(190, 190, 'comida_atlas', 'sprite92')

    // Informa que o hamtaro e a comida são passíveis de colisão
    this.physics.add.collider(hamtaro, comida)    


    //Caputar teclas do teclado; acoes do teclado
    //Salva a tecla na variavel cursors
    cursors = this.input.keyboard.createCursorKeys()

    // Cria as animações
    this.anims.create({ 
        key: 'direita', //Nome da animacao
        frames: this.anims.generateFrameNames('hamtaro_atlas', { //Definir os frames
            prefix: 'hamtaro_', 
            start: 1,
            end: 3            
        }),
        repeat: -1,
        duration: 300
    });

    this.anims.create({ 
        key: 'esquerda', //Nome da animacao
        frames: this.anims.generateFrameNames('hamtaro_atlas', { //Definir os frames
            prefix: 'hamtaro_', 
            start: 4,
            end: 6            
        }),
        repeat: -1,
        duration: 300
    });	

	this.anims.create({ 
        key: 'cima', //Nome da animacao
        frames: this.anims.generateFrameNames('hamtaro_atlas', { //Definir os frames
            prefix: 'hamtaro_', 
            start: 7,
            end: 8            
        }),
        repeat: -1,
        duration: 300
    });
	
	this.anims.create({ 
        key: 'baixo', //Nome da animacao
        frames: this.anims.generateFrameNames('hamtaro_atlas', { //Definir os frames
            prefix: 'hamtaro_', 
            start: 9,
            end: 10            
        }),
        repeat: -1,
        duration: 300
    });

	this.anims.create({ 
        key: 'parado', //Nome da animacao
        frames: this.anims.generateFrameNames('hamtaro_atlas', { //Definir os frames
            prefix: 'hamtaro_', 
            start: 11,
            end: 12            
        }),
        repeat: -1,
        duration: 300
    });

	this.score = 0

    // Cria o evento que acontecerá quando o hamtaro colidir com uma comida
    //Ou seja se colidir vai fazer essas 3 funcionalidades principais
    this.physics.add.overlap(hamtaro, comida, function(){
    	// Sim, tem uma funcao sendo passada como parametro. So existe nesse momento que chamo como parametro
    	// O nome disso e anonymous function

    	//Escolhe aleatoriamente a posicao da comida
		comida.x = randomNumber(50, window.innerWidth - 50)
        comida.y = randomNumber(50, window.innerHeight - 50)

        //Escolhe qual comida sera mostrada

        // Cada numero indica uma imagem para uma comida diferente
        let number = [92, 88, 87, 86, 85, 81, 78, 77, 76]
        // Escolhe um numero da lista acima 
        number = random(number)
        // Troca a imagem da comida de acordo com o numero escolhido
        comida.setTexture('comida_atlas', `sprite${number}`)

        //Funcionalidade do score
        // Adiciona pontuação ao score
        this.score += 3
        // Adiciona a informação ao texto da tela
        pontuacao.setText(`SCORE: ${this.score}`)
    
    }, null, this);
}


//Atualizar estado do jogo (como o movimento dos personagenns)
function update () {

    // Controle pelas setas esquerda direita cima e baixo do teclado
    //indica se a tecla left esta sendo apertada
    if (cursors.left.isDown) {
        hamtaro.x -= 3
        hamtaro.anims.play('esquerda', true)
      //Indica se a tecla right esta sendo apertada
    } else if (cursors.right.isDown) {
        hamtaro.x += 3
        hamtaro.anims.play('direita', true)
    } else if (cursors.up.isDown) {
        hamtaro.y -= 2
        hamtaro.anims.play('cima', true)

    } else if (cursors.down.isDown) {
        hamtaro.y += 2
        hamtaro.anims.play('baixo', true)

    }
    else {
    	hamtaro.anims.play('parado', true)

    }

}
//Configuracoes basicas
function principal () {

	//Definindo uma largura e altrua da tela do jogo
	var largura = window.innerWidth //Pego a largura da tela do navegador
	var altura = window.innerHeight //Pego a altura da tela do navegador


    // cria uma variável com as configurações do jogo
    var conf = {
        type: Phaser.AUTO,
        width: largura,
        height: altura,
        pixelArt: true,
        backgroundColor: '#b3e6ff',
        physics: {
            default: 'arcade',
            arcade: {
                //gravity: { y: 200 } //Faz com que o Hamtaro apareca e caia
                gravity: { y: 0 } //A imagem para na pos x e y determinada na fucao create
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }

    var game = new Phaser.Game(conf)

}

// Estamos adicionando uma função para o evento OnLoad da janela
window.onload = principal()
