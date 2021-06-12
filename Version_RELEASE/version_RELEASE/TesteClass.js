class TesteClass extends Phaser.Scene{
    constructor(){
        super("TesteClass");
    }
    init(data){
        
    }
    preload(){
        this.load.image('parallaxe3','assets/parallaxe/parallaxe_3.png');
        this.load.image('parallaxe2','assets/parallaxe/parallaxe_2.png');
        this.load.image('parallaxe1','assets/parallaxe/parallaxe_1.png');

        this.load.spritesheet('vinetta', 'assets/spritesheet/spritesheet_Vinetta.png', { frameWidth: 160, frameHeight: 150 });
        //this.load.spritesheet('vinetta_neutre', 'assets/spritesheet/spritesheet_Vinetta_neutre.png', { frameWidth: 84, frameHeight: 150 });
        //this.load.spritesheet('mia_mort', 'assets/spritesheet/mia_mort.png', { frameWidth: 210, frameHeight: 150 });
        this.load.spritesheet('soldat', 'assets/spritesheet/spritesheet_soldat.png', { frameWidth: 90, frameHeight: 160 });
        this.load.spritesheet('colosse', 'assets/spritesheet/spritesheet_colosse.png', { frameWidth: 120, frameHeight: 160 });
        this.load.spritesheet('archer', 'assets/spritesheet/spritesheet_tireur.png', { frameWidth: 87, frameHeight: 150 });
        this.load.spritesheet('chimiste', 'assets/spritesheet/spritesheet_chimiste.png', { frameWidth: 90, frameHeight: 150 });
        this.load.image('flèche','assets/spritesheet/fleche.png');

        this.load.image('fumi','assets/FX/teste_fumi.png');
        this.load.image('fleche','assets/spritesheet/fleche.png');
        this.load.image('fiole','assets/item/batterie.png');
        this.load.image('bombe','assets/item/Bombe_Loot.png');
        this.load.image('clef','assets/item/clef.png');
        this.load.image('tresor','assets/item/Coffre_loot.png');
        
        this.load.image('barreFumi0','assets/barre_fumi/Barre_fumi_0.png');
        this.load.image('barreFumi1','assets/barre_fumi/Barre_fumi_1.png');
        this.load.image('barreFumi2','assets/barre_fumi/Barre_fumi_2.png');
        this.load.image('barreFumi3','assets/barre_fumi/Barre_fumi_3.png');
        this.load.image('barreFumi4','assets/barre_fumi/Barre_fumi_4.png');
        this.load.image('barreFumi5','assets/barre_fumi/Barre_fumi_5.png');
        
        this.load.image('tiles','assets/tiles/Decors.png');
        this.load.tilemapTiledJSON('map','assets/tiles/Teste_anime.json');
    }
    create(){
        
        //this.add.image(4800/2, 1760/2, 'parallaxe3').setScrollFactor(0.1);
        //this.add.image(4800/2, 1760/2, 'parallaxe2').setScrollFactor(0.5);
        //this.add.image(4800/2, 1760/2, 'parallaxe1').setScrollFactor(1.8).setDepth(2);

        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('Decors','tiles');
        
        platforms = map.createLayer('Platforms',tileset, 0, 0);
        
        platforms.setCollisionByExclusion(-1,true)

        player = this.physics.add.sprite(200, 70, 'vinetta');
        player.body.setGravityY(gravite_joueur)
        player.body.height = 150;
        player.body.width = 50;
        player.body.setOffset(((150/2)-(50/2)),0);
    
        player.setBounce(0.01);
        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, platforms);
        
      /////////////////////////////   
     // ANIME JOUEUR /////////////
    /////////////////////////////
    
        this.anims.create({
            key: 'course',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 0, end: 14 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'neutre',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 41, end: 67}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'saut',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 15, end: 19 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'chute',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 20, end: 24 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'miseATerre',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 25, end: 29 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'aTerre',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 30, end: 37 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'liberation',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 38, end: 40 }),
            frameRate: 20,
            repeat: 1
        });

        this.anims.create({
            key: 'mortFlecheSol',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 68, end: 76 }),
            frameRate: 30,
            repeat: 0,
        });

        this.anims.create({
            key: 'mortFleche',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 77, end: 89 }),
            frameRate: 20,
            repeat: 0,
        });

        /*this.anims.create({
            key: 'mort_pique_haut',
            frames: this.anims.generateFrameNumbers('mia_anime', { start: 33, end: 44 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'mort_pique_bas',
            frames: [ { key: 'mia_mort', frame: 11 } ],
            frameRate: 10,
        });

        this.anims.create({
            key: 'mort',
            frames: this.anims.generateFrameNumbers('mia_mort', { start: 0, end: 11 }),
            frameRate: 20,
            repeat: -1
        });*/

      /////////////////////////////   
     // ENEMIES //////////////////
    /////////////////////////////
        
        /////////////////////////////   
        // SOLDAT ///////////////////
        /////////////////////////////

        /*enemieObjects = map.getObjectLayer('soldat').objects;
        this.soldat = this.physics.add.group({
            allowGravity: true
        });
        
        for (const enemie of enemieObjects) {
            let soldat=new 
            Soldat({scene:this,x:enemie.x,y:enemie.y});
        }
        this.physics.add.collider(this.soldat, platforms);*/

        this.soldat = new Soldat(this, 700, 100, 'soldat');

        ///anime/////

        
      /////////////////////////////   
     // CONTROLE /////////////////
    /////////////////////////////

            cursors = this.input.keyboard.createCursorKeys();
            cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE,E,SHIFT');
            const sautMur = Phaser.Input.Keyboard.JustDown(cursors2.SPACE);
            const libre = Phaser.Input.Keyboard.JustDown(cursors2.E);
            
        
          /////////////////////////////   
         // CAMERA ///////////////////
        ///////////////////////////// 

        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); 

    }
    update(){

        this.soldat.deplacementSimple();

        if(nbFumigene === 5)
        {
            barreFumi = this.add.image(barreFumiX,barreFumiY,'barreFumi5') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        
        else if (nbFumigene === 4){
            
            barreFumi = this.add.image(barreFumiX,barreFumiY,'barreFumi4') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        
        else if (nbFumigene === 3){
            
            barreFumi = this.add.image(barreFumiX,barreFumiY,'barreFumi3') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 2){
            
            barreFumi = this.add.image(barreFumiX,barreFumiY,'barreFumi2') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 1){
            
            barreFumi = this.add.image(barreFumiX,barreFumiY,'barreFumi1') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 0){
            
            barreFumi = this.add.image(barreFumiX,barreFumiY,'barreFumi0') 
                .setDepth(1)
                .setScrollFactor(0);
        }

        

        
        
    

        if(invincible == true){
            player.setTint(0x0f3434);
            compteurInvincible-- ;
            if(compteurInvincible == 0){
                compteurInvincible = restCompteurInvincible;
                player.setTint(0xffffff);
                invincible = false ;
            }
        }

        if (gameOver == true){
            player.setVelocityX(0);
            gameOvertext = this.add.text(896/2, 448/2, 'GAME OVER', { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
            /*if (mortFleche == true){
                player.anims.play('mortFleche',true);
            }*/
        }

        if (animeFumerFX == true){
            compteurAnimeFumerFX-- ;

            if(compteurAnimeFumerFX == 0){
                compteurAnimeFumerFX = restAnimeFumerFX;
                fumerFX.destroy();
                animeFumerFX = false
                
            }
        }
        /*if (enemieStun){
            setTimeout(function(){enemieStun = false}, 1000);
            this.enemies.setTint(0xffffff);
        }*/
        const dash = Phaser.Input.Keyboard.JustDown(cursors2.SHIFT);
        const libre = Phaser.Input.Keyboard.JustDown(cursors2.E);
        if (nbFumigene <= 0){
            fumigene = false;
        }
        const sautMur = Phaser.Input.Keyboard.JustDown(cursors2.SPACE)
        const LacheFumi = Phaser.Input.Keyboard.JustDown(cursors2.E)
        
        onGround = player.body.blocked.down;
        onLeft = player.body.blocked.left;
        onRight = player.body.blocked.right;
        
        if (onGround) {
            sautGauche = false;
            sautDroite = false;
            attaque = false;
            sautTete = false
        }
        if (onLeft){
            sautDroite = false;
        }
        if (onRight){
            sautGauche = false;
        }
      /////////////////////////////   
     // CONTROLE CLAVIER /////////
    ///////////////////////////// 
    
        if ((cursors.left.isDown && sautGauche == false || cursors2.Q.isDown)&& attrape == false && attrapeColosse == false)
        {   
            if (gameOver == false){
                
                player.setVelocityX(-vitesse_joueur*speed);
                player.anims.play("course", true);
                player.setFlipX(true);
                
            }           
            sautGauche = false;
        }
        
        else if ((cursors.right.isDown && sautDroite == false || cursors2.D.isDown)&& attrape == false && attrapeColosse == false)
        {
            if (gameOver == false){
                player.setVelocityX(vitesse_joueur*speed);
                player.anims.play("course", true);
                //player.anims.play("colosseExecution", true);
                player.setFlipX(false);
            }
            sautDroite = false;
        }
        
        else if (((cursors.down.isDown || cursors2.S.isDown)&& attrape == false && attrapeColosse == false && onGround == false && sautTete == false) && gameOver == false){//direction vers le bas /////////////////////
            player.setVelocityY(vitesseAttaque);
            attaque = true;
        }

        else //position neutre /////////////////////
        {            
            if (sautDroite == false && sautGauche == false && onGround){
                player.setVelocityX(0);
               // player.anims.play("neutre", true);
            }
            /*else if ( onGround){
                player.setVelocityX(0);
                //player.anims.play("neutre", true);
            }*/
        }

                //saut /////////////////////
        if (((cursors.up.isDown && onGround || cursors2.Z.isDown && onGround || cursors2.SPACE.isDown && onGround) && attrape == false && attrapeColosse == false) && gameOver == false )
        {
            player.setVelocityY(-vitesse_saut);
            //player.anims.play("saut", true);
            doubleJump = false;

        }
        
        if (player.body.velocity.y < 0 && !onGround && !gameOver){
            player.anims.play("saut", true);
        }
        else if (player.body.velocity.y > 0 && !gameOver){
            player.anims.play("chute", true);
        }

        if (player.body.velocity.x === 0 && onGround && !gameOver){
            player.anims.play("neutre", true);
            //player.anims.play("soldatStunFumi", true);
        }
        if ((attrape || attrapeColosse) && compteur > 0 && !gameOver){
            player.anims.play("aTerre",true);
        }
              
        if ((!cursors2.Z.isDown || !cursors2.SPACE.isDown) && gameOver == false){
             unlockDoubleJump = true;
             
        }
     
        if (onGround){
             doubleJump = true;
             unlockDoubleJump = false;
        }

        if (onLeft && onGround == false && sautMur) {
            sautGauche = true;
            sautDroite = false;
            
        }
        
        if (onRight && onGround == false && sautMur) {
            sautGauche = false;
            sautDroite = true;
            
        }
        
        if (sautMur && sautGauche) {
            
            player.setVelocityY(-vitesse_saut);
            player.setVelocityX(vitesse_joueur);
            //player.direction == 'LEFT'; 
        }
        
        if (sautMur && sautDroite) {
            
            player.setVelocityY(-vitesse_saut);
            player.setVelocityX(-vitesse_joueur);
            
            //player.direction == 'RIGHT'; 
        }
        
        ///////////////////////////////////////
        ////// DASH FUMIGENE /////////////////
        /////////////////////////////////////

        if (cursors.right.isDown && libre && jumpCD && fumigene && nbFumigene > 0){
            nbFumigene --;
            jumpCD = false;
            var jumpDuration = true;
            speed = 2;
            invincible = true;
            
            fumerFX = this.add.sprite(player.x,player.y, 'fumi');
            animeFumerFX = true;

            setTimeout(function(){speed = 1}, 500);
            setTimeout(function(){var jumpDuration = false}, 500);
            setTimeout(function(){jumpCD = true}, 800);
            if (this.enemies.y <= player.y+100 && this.enemies.y >= player.y-100 && this.enemies.x <= player.x+100 && this.enemies.x >= player.x-100){
                attrape = false;
                enemieStun = true;
                this.enemies.setTint(0xff0000);
                 
            }
        }
        else if (cursors.left.isDown && libre && jumpCD && fumigene && nbFumigene > 0){
            
            nbFumigene = nbFumigene-1
            jumpCD = false;
            var jumpDuration = true;
            speed = 2;
            invincible = true;

            fumerFX = this.add.sprite(player.x,player.y, 'fumi');
            animeFumerFX = true;

            setTimeout(function(){speed = 1}, 500);
            setTimeout(function(){var jumpDuration = false}, 500);
            setTimeout(function(){jumpCD = true}, 800);
            if (this.enemies.y <= player.y+100 && this.enemies.y >= player.y-100 && this.enemies.x <= player.x+100 && this.enemies.x >= player.x-100){
                attrape = false;
                enemieStun = true;
                this.enemies.setTint(0xff0000); 
            }
        }      
        


      /////////////////////////////   
     // COMPORTEMENT ENNEMIE /////
    /////////////////////////////


    
    }
}