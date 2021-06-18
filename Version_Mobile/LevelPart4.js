class LevelPart4 extends Phaser.Scene{
    constructor(){
        super("LevelPart4");
    }
    init(data){
        
    }
    preload(){

        
        //this.load.image('tiles','assets/tiles/tile_32.png');
        this.load.image('tiles','assets/tiles/Decors.png');
        this.load.tilemapTiledJSON('mapPart4','assets/tiles/level_Part_4.json');

        this.load.audio('audio_fond', 'assets/audio/music_fond.ogg')
        this.load.audio('bruit_coup', 'assets/audio/Bruit_coup.ogg')
    }
    create(){
        this.cameras.main.fadeIn(1000);
        
        this.bruitCoup = this.sound.add('bruit_coup')

        this.add.image(4128/2, 2688/2, 'parallaxe3').setScrollFactor(0.5);
        this.add.image(4128/2, 2688/2, 'parallaxe2').setScrollFactor(0.6);
        this.add.image(4128/2, 2688/2, 'parallaxe1').setScrollFactor(0.9);

        const map = this.make.tilemap({key : 'mapPart4'});
        const tileset = map.addTilesetImage('Decors','tiles');
        
        
        platforms = map.createLayer('Platforms',tileset, 0, 0).setDepth(1);
        secret = map.createLayer('Secret',tileset,0,0).setDepth(4);
        fond = map.createLayer('Fond',tileset,0,0)
        zoneChargement = map.createLayer('Chargement',tileset,0,0)
        marque = map.createLayer('Marque',tileset,0,0)

        platforms.setCollisionByExclusion(-1,true)
        zoneChargement.setCollisionByExclusion(-1,true)
        
      /////////////////////////////   
     // JOUEUR ///////////////////
    /////////////////////////////

        player = this.physics.add.sprite(84, 2206, 'vinetta').setDepth(3);
        player.body.setGravityY(gravite_joueur)
        player.body.height = 150;
        player.body.width = 50;
        player.body.setOffset(((150/2)-(50/2)),0);
    
        player.setBounce(0.01);
        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, zoneChargement, changementZone, null, this);

        function changementZone (player,zoneChargement){

            if (player.y >= 1357 && player.x >= 3724){

                this.scene.start("TesteAnime");
                clef1 = false;
                nbFumigene = 5;

            }
        }

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
    this.anims.create({
        key: 'mortColosse',
        frames: this.anims.generateFrameNumbers('vinetta', { start: 92, end: 100 }),
        frameRate: 20,
        repeat: 0,
    });
    this.anims.create({
        key: 'mortSoldat',
        frames: this.anims.generateFrameNumbers('vinetta', { start: 101, end: 111 }),
        frameRate: 20,
        repeat: 0,
    });

    this.anims.create({
        key: 'mortFiole',
        frames: this.anims.generateFrameNumbers('vinetta_Mort_fiole', { start: 1, end: 21 }),
        frameRate: 15,
        repeat: 0,
    });

    this.anims.create({
        key: 'exploseFumi',
        frames: this.anims.generateFrameNumbers('explosionFumi', { start: 0, end: 27 }),
        frameRate: 25,
        repeat:0
    });

  /////////////////////////////   
 // ENEMIES //////////////////
/////////////////////////////
    
    /////////////////////////////   
    // SOLDAT ///////////////////
    /////////////////////////////

    enemieObjects = map.getObjectLayer('soldat').objects;
    this.enemies = this.physics.add.group({
        allowGravity: true
    }); 
    
    for (const enemie of enemieObjects) {
        this.enemies.create(enemie.x, enemie.y, 'soldat')
            .setOrigin(0.5,0.5)
            .setDepth(1)
            .setScale(1)
            .setGravityY(300)

    
    }
    for (const enemie of this.enemies.children.entries) {
        enemie.stun = false;
        enemie.chope = false;

        enemie.body.height = 150;
        enemie.body.width = 58;
        enemie.body.setOffset(15,10);
    }

    

    ///anime/////

    this.anims.create({
        key: 'soldatMarche',
        frames: this.anims.generateFrameNumbers('soldat', { start: 0, end: 7 }),
        frameRate: 15,
        repeat: 1,
    });
    this.anims.create({
        key: 'soldatCourse',
        frames: this.anims.generateFrameNumbers('soldat', { start: 8, end: 16 }),
        frameRate: 20,
        repeat: 1,
    });
    this.anims.create({
        key: 'soldatStunAtk',
        frames: this.anims.generateFrameNumbers('soldat', { start: 17, end: 23 }),
        frameRate: 12,
        repeat: 1,
    });
    this.anims.create({
        key: 'soldatStunAtkBoucle',
        frames: this.anims.generateFrameNumbers('soldat', { start: 24, end: 30  }),
        frameRate: 10,
        repeat: 1,
    });
    this.anims.create({
        key: 'soldatStunFumi',
        frames: this.anims.generateFrameNumbers('soldat', { start: 31, end: 36 }),
        frameRate: 12,
        repeat: 1,
    });
    this.anims.create({
        key: 'soldatStunFumiBoucle',
        frames: this.anims.generateFrameNumbers('soldat', { start: 37, end: 44 }),
        frameRate: 12,
        repeat: 1,
    });
    this.anims.create({
        key: 'soldatExecution',
        frames: this.anims.generateFrameNumbers('soldat', { start: 45, end: 69 }),
        frameRate: 20,
        repeat: 0,
    });
   
    this.physics.add.collider(this.enemies, platforms);
    this.physics.add.overlap(player, this.enemies, chope, null, this);

    /////////////////////////////   
    // COLOSSE ///////////////////
    /////////////////////////////

    colosseObjects = map.getObjectLayer('colosse').objects;
    this.colosses = this.physics.add.group({
        allowGravity: true
    }); 
    
    for (const colosse of colosseObjects) {

        this.colosses.create(colosse.x, colosse.y, 'colosse')
            .setOrigin(0.5,0.5)
            .setDepth(1)
            .setScale(1)
            .setGravityY(300)
    }

    for (const colosse of this.colosses.children.entries) {
        colosse.stun = false;
        colosse.chope = false;

        colosse.body.height = 160;
        colosse.body.width = 65;
        colosse.body.setOffset(20,0);
    }
    ///anime/////

    this.anims.create({
        key: 'colosseMarche',
        frames: this.anims.generateFrameNumbers('colosse', { start: 0, end: 12 }),
        frameRate: 15,
        repeat: 1,
    });

    this.anims.create({
        key: 'colosseCourse',
        frames: this.anims.generateFrameNumbers('colosse', { start: 0, end: 12 }),
        frameRate: 20,
        repeat: 1,
    });
    this.anims.create({
        key: 'colosseExecution',
        frames: this.anims.generateFrameNumbers('colosse', { start: 13, end: 34 }),
        frameRate: 20,
        repeat: 0,
    });
    this.anims.create({
        key: 'colosseStun',
        frames: this.anims.generateFrameNumbers('colosse', { start: 35, end: 48 }),
        frameRate: 20,
        repeat: 0,
    });
    this.anims.create({
        key: 'colosseStunBoucle',
        frames: this.anims.generateFrameNumbers('colosse', { start: 49, end: 57 }),
        frameRate: 15,
        repeat: 0,
    });
    this.anims.create({
        key: 'colosseRebond',
        frames: this.anims.generateFrameNumbers('colosse', { start: 58, end: 62 }),
        frameRate: 15,
        repeat: 0,
    });
    
    this.physics.add.collider(this.colosses, platforms);
    this.physics.add.overlap(player, this.colosses, chopeColosse, null, this);

    /////////////////////////////   
    // ARCHER ///////////////////
    /////////////////////////////

    archerObjects = map.getObjectLayer('archer').objects;
    this.archers = this.physics.add.group({
        allowGravity: true
    });
    
    for (const archer of archerObjects) {

        this.archers.create(archer.x, archer.y, 'archer')
            .setOrigin(0.5,0.5)
            .setDepth(1)
            .setScale(1)
            .setGravityY(300)
    }
    for (const archer of this.archers.children.entries) {
        archer.tir = 0;
        archer.stun = false;
        archer.chope = false;
    }
    
    this.physics.add.collider(this.archers, platforms);
    this.physics.add.overlap(player, this.archers, chopeAcher, null, this);

    /////////////anime///////
    this.anims.create({
        key: 'TireurNeutre',
        frames: [ { key: 'archer', frame: 0 } ],
        frameRate: 20
    })
    this.anims.create({
        key: 'TireurTir',
        frames: this.anims.generateFrameNumbers('archer', { start: 1, end: 17 }),
        frameRate: 20,
        repeat: 0,
    });

    this.anims.create({
        key: 'TireurStun',
        frames: this.anims.generateFrameNumbers('archer', { start: 18, end: 28 }),
        frameRate: 20,
        repeat: 0,
    });
    
    this.anims.create({
        key: 'TireurExecution',
        frames: this.anims.generateFrameNumbers('archer', { start: 29, end: 47 }),
        frameRate: 19,
        repeat: 0,
    });

    /////////////////////////////   
    // CHIMISTE /////////////////
    ////////////////////////////

    chimisteObjects = map.getObjectLayer('chimiste').objects;
    this.chimiste = this.physics.add.group({
        allowGravity: true
    });
    
    for (const chimiste of chimisteObjects) {

        this.chimiste.create(chimiste.x, chimiste.y, 'chimiste')
            .setOrigin(0.5,0.5)
            .setDepth(1)
            .setScale(1)
            .setGravityY(300)
    }
    for (const chimiste of this.chimiste.children.entries) {
        chimiste.lancer = false;
        chimiste.stun = false;
        chimiste.fuite = false;

        chimiste.body.height = 150;
        chimiste.body.width = 58;
        chimiste.body.setOffset(10,0);
    }
    
    this.physics.add.collider(this.chimiste, platforms);
    this.physics.add.overlap(player, this.chimiste, chopeChimiste, null, this);

    /////////////anime///////

    this.anims.create({
        key: 'chimisteMarche',
        frames: this.anims.generateFrameNumbers('chimiste', { start: 0, end: 7 }),
        frameRate: 15,
        repeat: 0,
    });
    this.anims.create({
        key: 'chimisteFuite',
        frames: this.anims.generateFrameNumbers('chimiste', { start: 8, end: 16 }),
        frameRate: 25,
        repeat: 0,
    });
    this.anims.create({
        key: 'chimisteLancer',
        frames: this.anims.generateFrameNumbers('chimiste', { start: 21, end: 29 }),
        frameRate: 15,
        repeat: 0,
    });
    this.anims.create({
        key: 'chimisteStun',
        frames: this.anims.generateFrameNumbers('chimiste', { start: 32, end: 39 }),
        frameRate: 10,
        repeat: 0,
    });
               
        /////////////////////////////   
       // ITEM /////////////////////
      /////////////////////////////

        /////////////////////////////   
        // BOMBE /////////////////
        ////////////////////////////

        const bombeObjects = map.getObjectLayer('bombe').objects;
        this.bombe = this.physics.add.group({
            allowGravity: false
        });
        
        for (const bombe of bombeObjects) {

            this.bombe.create(bombe.x, bombe.y, 'bombe')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
        }

        this.physics.add.overlap(player, this.bombe ,recupBombe, null,this);

        /////////////////////////////   
        // clef /////////////////
        ////////////////////////////

        const clefObjects = map.getObjectLayer('clef').objects;
        this.clef = this.physics.add.group({
            allowGravity: false
        });
        
        for (const clef of  clefObjects) {

            this.clef.create(clef.x, clef.y, 'clef')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
        }

        this.physics.add.overlap(player, this.clef ,recupClef, null,this);

        /////////////////////////////   
        // coffre /////////////////
        ////////////////////////////

        const coffreObjects = map.getObjectLayer('tresor').objects;
        this.coffre = this.physics.add.group({
            allowGravity: false
        });
        
        for (const coffre of  coffreObjects) {

            this.coffre.create(coffre.x, coffre.y, 'tresorRouge')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
        }

        this.physics.add.overlap(player, this.coffre ,recupCoffreRouge, null,this);

        /////////////////////////////   
        // Porte ///////////////////
        ////////////////////////////

        const porteObjects = map.getObjectLayer('porte').objects;
        this.porte = this.physics.add.group({
            allowGravity: false
        });
        
        for (const porte of  porteObjects) {

            this.porte.create(porte.x, porte.y, 'porte')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setImmovable(true)
        }

        this.physics.add.collider(player, this.porte ,ouvrePorte, null,this);
        this.physics.add.collider(this.enemies, this.porte);
        this.physics.add.collider(this.colosses, this.porte);
        this.physics.add.collider(this.chimiste, this.porte);
        
      /////////////////////////////   
     // CONTROLE /////////////////
    /////////////////////////////

            cursors = this.input.keyboard.createCursorKeys();
            cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE,E,SHIFT,R');
            const sautMur = Phaser.Input.Keyboard.JustDown(cursors2.SPACE);
            const libre = Phaser.Input.Keyboard.JustDown(cursors2.E);
            
        
          /////////////////////////////   
         // CAMERA ///////////////////
        ///////////////////////////// 

        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); 

          /////////////////////////////   
         // BOUTON ///////////////////
        ///////////////////////////// 

        buttonPause = this.add.sprite(866, 30, 'boutonPause').setScrollFactor(0).setDepth(10).setInteractive({ cursor: 'pointer' });

        buttonPause.on('pointerdown', function(){
            if (!pause){
                this.physics.pause();
                pause = true
                menuPause = this.add.image(896/2, 190, 'menuPause').setScrollFactor(0).setDepth(10);
                coffreMenuGris = this.add.image(896/2, 448/2, 'CoffreGris').setScrollFactor(0).setDepth(11);
                if (coffreVert){
                    coffreMenuVert = this.add.image(896/2, 448/2, 'CoffreVert').setScrollFactor(0).setDepth(11);
                }
                if (coffreBleu){
                    coffreMenuBleu = this.add.image(896/2, 448/2, 'CoffreBleu').setScrollFactor(0).setDepth(11);
                }
                if (coffreMarron){
                    coffreMenuMarron = this.add.image(896/2, 448/2, 'CoffreMarron').setScrollFactor(0).setDepth(11);
                }
                if (coffreRouge){
                    coffreMenuRouge = this.add.image(896/2, 448/2, 'CoffreRouge').setScrollFactor(0).setDepth(11);
                }
                buttonRetour = this.add.sprite(250,400,'boutonRetour').setScrollFactor(0).setDepth(9).setInteractive({ cursor: 'pointer' });
                
                buttonRetour.on('pointerdown', function(){
                    coffreMenuGris.destroy();
                    if (coffreVert){
                        coffreMenuVert.destroy();
                    }
                    if (coffreBleu){
                        coffreMenuBleu.destroy();
                    }
                    if (coffreMarron){
                        coffreMenuMarron.destroy();
                    }
                    if (coffreRouge){
                        coffreMenuRouge.destroy();
                    }
                    menuPause.destroy();
                    buttonRetour.destroy();
                    this.physics.resume();
                    pause = false;
                }, this)
            }
            

        }, this)

    }
    update(){

        if (player.y > platforms.height){
            gameOver = true;
        }

          /////////////////////////////   
         // BARRE FUMI ///////////////
        ///////////////////////////// 
        if(nbFumigene === 5)
        {   
            barreFumi5 = this.add.image(barreFumiX,barreFumiY,'barreFumi5') 
                .setDepth(5)
                .setScrollFactor(0);
        }
        
        else if (nbFumigene === 4){
            
            barreFumi5.destroy();
            barreFumi4 = this.add.image(barreFumiX,barreFumiY,'barreFumi4') 
                .setDepth(5)
                .setScrollFactor(0);
        }
        
        else if (nbFumigene === 3){

            barreFumi4.destroy();
            barreFumi3 = this.add.image(barreFumiX,barreFumiY,'barreFumi3') 
                .setDepth(5)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 2){
            
            barreFumi3.destroy();
            barreFumi2 = this.add.image(barreFumiX,barreFumiY,'barreFumi2') 
                .setDepth(5)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 1){
            
            barreFumi2.destroy();
            barreFumi1 = this.add.image(barreFumiX,barreFumiY,'barreFumi1') 
                .setDepth(5)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 0){
            
            barreFumi1.destroy();
            barreFumi0 = this.add.image(barreFumiX,barreFumiY,'barreFumi0') 
                .setDepth(5)
                .setScrollFactor(0);
        }    
        
    

        if(invincible){
            player.setTint(0x0f3434);
            
            /*compteurInvincible-- ;
            if(compteurInvincible == 0){
                compteurInvincible = restCompteurInvincible;
                player.setTint(0xffffff);
                invincible = false ;
            }*/
        }
        else {
            player.setTint(0xffffff);
            
        }

        if (gameOver){
            player.setVelocityX(0);
            gameOvertext = this.add.text(896/2, 448/2, 'GAME OVER', { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
            
            if (cursors2.R.isDown){
                this.scene.restart();
                gameOver = false;
                attrape = false;
                compteur = compteurMax;
                execution = false;
                invincible = false;
                nbFumigene = 5;
                coffreRouge = false;
                
            }

        }
        
        const libre = Phaser.Input.Keyboard.JustDown(cursors2.E);
        
        onGround = player.body.blocked.down;
        
        if (onGround) {
            attaque = false;
            sautTete = false
        }

      /////////////////////////////   
     // CONTROLE CLAVIER /////////
    ///////////////////////////// 
    
        if ((cursors.left.isDown || cursors2.Q.isDown)&& attrape == false)
        {   
            if (gameOver == false){
                
                player.setVelocityX(-vitesse_joueur*speed);
                player.anims.play("course", true);
                player.setFlipX(true);
                
            }           
            
        }
        
        else if ((cursors.right.isDown || cursors2.D.isDown)&& attrape == false)
        {

            if (gameOver == false){
                player.setVelocityX(vitesse_joueur*speed);
                player.anims.play("course", true);
                player.setFlipX(false);
            }
        }
        
        else if (((cursors.down.isDown || cursors2.S.isDown)&& attrape == false && onGround == false && sautTete == false) && gameOver == false){//direction vers le bas /////////////////////
            player.setVelocityY(vitesseAttaque);
            attaque = true;
        }

        else if (onGround) //position neutre /////////////////////
        {            
            player.setVelocityX(0);
        }
        else if (cursors.right.isUp && cursors.left.isUp){
            player.setVelocityX(0);
        }
                //saut /////////////////////
        if (((cursors.up.isDown && onGround || cursors2.Z.isDown && onGround || cursors2.SPACE.isDown && onGround) && attrape == false) && gameOver == false )
        {
            player.setVelocityY(-vitesse_saut);

        }
        
        if (player.body.velocity.y < 0 && !onGround && !gameOver){
            player.anims.play("saut", true);
        }
        else if (player.body.velocity.y > 0 && !gameOver){
            player.anims.play("chute", true);
        }

        if (player.body.velocity.x === 0 && onGround && !gameOver){
            player.anims.play("neutre", true);
        }
        if (attrape && compteur > 0 && !gameOver){
            player.anims.play("aTerre",true);
        }

        
        ///////////////////////////////////////
        ////// DASH FUMIGENE /////////////////
        /////////////////////////////////////

        if ((cursors.right.isDown || cursors.left.isDown || cursors2.D.isDown || cursors2.Q.isDown) && libre && verifDash && nbFumigene > 0 && !attrape && !gameOver && !invincible){
            this.bruitCoup.play()
            nbFumigene --;
            verifDash = false;
            
            speed = 2;
            invincible = true;
        
            setTimeout(function(){invincible = false; console.log('invicilble'+ invincible);}, dureInvincible);

            
            //invincible = false;
            //console.log('invicilble'+ invincible)
            fumerFX = this.add.sprite(player.x,player.y-125, 'explosionFumi');
            
            setTimeout(function(){fumerFX.anims.play('exploseFumi',true)}, 0);
            setTimeout(function(){fumerFX.destroy();}, 1000);
            setTimeout(function(){speed = 1}, 500);
            setTimeout(function(){var duration = false}, 500);
            setTimeout(function(){verifDash = true}, 800);

        }
         if (animeFumerFX){
            //fumerFX = this.add.sprite(player.x,player.y-125, 'explosionFumi');
            setTimeout(function(){fumerFX.anims.play('exploseFumi',true)}, 0);
            //setTimeout(function(){fumerFX.destroy();}, 1000);
            setTimeout(function(){animeFumerFX = false}, 1000);
            if (!animeFumerFX){
                fumerFX.destroy();
             }
        }

      /////////////////////////////   
     // COMPORTEMENT ENNEMIE /////
    /////////////////////////////

      /////////////////////////////   
     // ARCHER ///////////////////
    /////////////////////////////

        
    for (const archer of this.archers.children.entries) {

        if (archer.tir == 0 && archer.stun == false){
            

            if (archer.tir == 0 && !archer.stun && archer.x - player.x < detectionArcher && archer.x - player.x > 0 && archer.y - player.y < 10 && archer.y - player.y > -10 && !attrape && !invincible && !gameOver){
                
                fleche = this.physics.add.sprite(archer.x,archer.y-40,'fleche');
                fleche.body.allowGravity = false;
                fleche.setFlipX(false);
                archer.tir = 1;
                //console.log('nbFleche =1');
            
                fleche.setVelocityX( -vitesseFleche);
                archer.anims.play('TireurTir',true);
                archer.setFlipX(false);

                setTimeout(function(){archer.tir = 0;}, 1000);
                archer.tir = 1;

                this.physics.add.collider(fleche, platforms, flecheMur,null, this);
                this.physics.add.overlap(fleche, player,flechePlayer,null, this);
            } 
            else if (archer.tir == 0 && !archer.stun && player.x - archer.x < detectionArcher && player.x - archer.x > 0 && archer.y - player.y < 10 && archer.y - player.y > -10 && !attrape && !invincible && !gameOver){
                
                fleche = this.physics.add.sprite(archer.x,archer.y-40,'fleche');
                fleche.body.allowGravity = false;
                fleche.setFlipX(true);
                archer.tir = 1;
                //console.log('nbFleche =1');
        
                fleche.setVelocityX( vitesseFleche);
                archer.anims.play('TireurTir',true);
                archer.setFlipX(true);

                setTimeout(function(){archer.tir = 0;}, 1000);
                archer.tir = 1;

                this.physics.add.collider(fleche, platforms, flecheMur,null, this);
                this.physics.add.overlap(fleche, player,flechePlayer,null, this);

            }
            else if (!attrape){
                archer.anims.play('TireurNeutre',true);
            }
        }
    }

     /////////////////////////////   
     // SOLDAT ///////////////////
    /////////////////////////////
    
    for (const enemie of this.enemies.children.entries) {
        if (enemie.body.blocked.right) {
            enemie.direction = 'LEFT';
            
        }

        if (enemie.body.blocked.left) {
            enemie.direction = 'RIGHT';
        }

        
        else if (enemie.direction === 'RIGHT') {

            if (enemie.chope){
                if (gameOver){
                    enemie.setVelocityX(0);
                    enemie.chope = false
                } 

                if (player.x < enemie.x && !execution){
                    execution = true
                    if (onGround){
                        enemie.setFlipX(false);
                        enemie.setVelocityX(-50)
                    }
                    else {
                        enemie.setVelocityX(0);
                    }
                }
                else if (player.x > enemie.x && !execution) {
                    execution = true
                    if(onGround){
                        enemie.setFlipX(true);
                        enemie.setVelocityX(50);
                    }
                    else {
                        enemie.setVelocityX(0);
                    }
                } 
            }
            else if (enemie.stun){
                enemie.anims.play('soldatStunAtkBoucle', true);
                enemie.setFlipX(true);
                enemie.setVelocityX(0);
            }
            else if (player.x - enemie.x < detectionSoldat && player.x - enemie.x > 0 && enemie.y - player.y < 10 && enemie.y - player.y > -10 && !attrape && !enemie.stun && !invincible && !gameOver){
                enemie.setVelocityX(vitesseSoldatCourse);
                enemie.anims.play("soldatCourse", true);
                enemie.setFlipX(true);
            }
            else {
                enemie.setVelocityX(vitesseSoldat);
                enemie.anims.play("soldatMarche", true);
                enemie.setFlipX(true);
            }     
        } 
        else {
            
            if (enemie.chope){
                if (gameOver){
                    enemie.setVelocityX(0);
                    enemie.chope = false
                }

                if (player.x > enemie.x && !execution){
                    execution = true;
                    
                    if (onGround){
                        enemie.setFlipX(true);
                        enemie.setVelocityX(50)
                    }
                    else {
                        enemie.setVelocityX(0);
                    }
                    
                }
                else if (player.x < enemie.x && !execution){
                    execution = true;
                    
                    if(onGround){
                        enemie.setFlipX(false);
                        enemie.setVelocityX(-50);
                    }
                    else {
                        enemie.setVelocityX(0);
                    }
                    
                } 
                    
            }
            else if (enemie.stun && enemie.body.blocked.down) {
                enemie.anims.play('soldatStunAtkBoucle', true);
                enemie.setFlipX(false);
                enemie.setVelocityX(0);
            }
            else if(enemie.x - player.x < detectionSoldat && enemie.x - player.x > 0 && enemie.y - player.y < 10 && enemie.y - player.y > -10 && !attrape && !enemie.stun && !invincible && !gameOver) {

                enemie.setVelocityX(-vitesseSoldatCourse);
                enemie.anims.play("soldatCourse", true);
                enemie.setFlipX(false);
    
            }
            else {
                enemie.setVelocityX(-vitesseSoldat);
                enemie.anims.play("soldatMarche", true);
                enemie.setFlipX(false);
            }
        }
        

    }
      /////////////////////////////   
     // COLOSSE //////////////////
    /////////////////////////////

    for (const colosse of this.colosses.children.entries) {
        if (colosse.body.blocked.right) {
            colosse.direction = 'LEFT';
        }

        if (colosse.body.blocked.left) {
            colosse.direction = 'RIGHT';
        }

        
        

        else if (colosse.direction === 'RIGHT') {

            if (colosse.chope){

                //colosse.setFlipX(true);
                //colosse.setVelocityX(0)

                //colosse.setVelocityX(100)
                if (gameOver){
                    colosse.setVelocityX(0);
                    colosse.chope = false
                } 

                if (player.x < colosse.x && !execution){
                    execution = true
                    
                    if (onGround){
                        console.log('scapoué')
                        colosse.setFlipX(false);
                        colosse.setVelocityX(-100)
                    }
                    else {
                        colosse.setVelocityX(-0)
                    }
                    
                }
                else if (player.x > colosse.x && !execution) {
                    
                    execution = true
                    if (onGround){
                        colosse.setFlipX(true);
                        colosse.setVelocityX(100)
                    }
                    else {
                        colosse.setVelocityX(0)
                    }
                }
                /*else if (player.x == colosse.x && !gameOver){
                    colosse.setVelocityX(0)
                }*/
            }
            else if (colosse.stun){
                colosse.anims.play('colosseStunBoucle', true);
                colosse.setFlipX(true);
                colosse.setVelocityX(0);
            }

            else if (player.x - colosse.x < detectionColosse && player.x - colosse.x > 0 && colosse.y - player.y < 10 && colosse.y - player.y > -10 && !colosse.chope && !colosse.stun && !invincible && !gameOver){
                colosse.setVelocityX(vitesseColosseCourse);
                colosse.anims.play("colosseCourse", true);
                colosse.setFlipX(true);
            }

            else {
                colosse.setVelocityX(vitesseColosse);
                colosse.anims.play("colosseMarche", true);
                colosse.setFlipX(true);
            }
            
        } else {
            if (colosse.chope){
                //colosse.setFlipX(true);
                //colosse.setVelocityY(0)
                //colosse.setVelocityX(-100)
                if (gameOver){
                    colosse.setVelocityX(0);
                    colosse.chope = false
                }

                if (player.x > colosse.x && !execution){
                    execution = true;
                    if (onGround){
                        colosse.setFlipX(true);
                        colosse.setVelocityX(100)
                    }
                    else {
                        colosse.setVelocityX(0)
                    }
                    
                }
                else if (player.x < colosse.x && !execution){
                    execution = true;
                    if (onGround){
                        colosse.setFlipX(false);
                        colosse.setVelocityX(-100);
                    }
                    else {
                        colosse.setVelocityX(-0);
                    }
                    
                }
            }
            else if (colosse.stun){
                colosse.anims.play('colosseStunBoucle', true);
                colosse.setFlipX(false);
                colosse.setVelocityX(0);
            }

            else if(colosse.x - player.x < detectionColosse && colosse.x - player.x > 0 && colosse.y - player.y < 10 && colosse.y - player.y > -10 && !colosse.chope && !colosse.stun && !invincible && !gameOver) {

                colosse.setVelocityX(-vitesseColosseCourse);
                colosse.anims.play("colosseCourse", true);
                colosse.setFlipX(false);
    
            }

            else  {
                colosse.setVelocityX(-vitesseColosse);
                colosse.anims.play("colosseMarche", true);
                colosse.setFlipX(false);
            }
        }
    }

      /////////////////////////////   
     // CHIMISTE /////////////////
    /////////////////////////////
    
    for (const chimiste of this.chimiste.children.entries) {
        if (chimiste.body.blocked.right) {
            chimiste.direction = 'LEFT';
            chimiste.fuite = false;
        }

        if (chimiste.body.blocked.left) {
            chimiste.direction = 'RIGHT';
            chimiste.fuite = false;
        }

        if(chimiste.x - player.x < detectionChimiste && chimiste.x - player.x > 0 && chimiste.y - player.y < 10 && chimiste.y - player.y > -10 && !attrape && !chimiste.stun && !invincible /*&& chimiste.direction === 'LEFT' */&& !chimiste.fuite && !gameOver) {              

                if(player.x < chimiste.x && !chimiste.lancer){
                    
                    setTimeout(function(){chimiste.lancer = false;}, 700);
                    chimiste.lancer = true;
                    chimiste.fuite = false
                    chimiste.setVelocityX(0);
                    chimiste.anims.play("chimisteLancer", true);
                    chimiste.setFlipX(false);
                    

                    fiole = this.physics.add.sprite(chimiste.x, chimiste.y-40, 'fiole');
                    fiole.setVelocity(Phaser.Math.FloatBetween(-200, -400), Phaser.Math.FloatBetween(-200, -400));
                    fiole.setGravityY(200);
                    
                    this.physics.add.collider(fiole, platforms,fioleMur,null,this);
                    this.physics.add.overlap(fiole, player,fiolePlayer,null, this);

                    chimiste.lancer = true;
                }
                else if(player.x > chimiste.x && !chimiste.lancer){
                    
                    
                    setTimeout(function(){chimiste.lancer = false;}, 700);
                    chimiste.lancer = true;

                    chimiste.setVelocityX(0);
                    chimiste.setFlipX(true);

                    fiole = this.physics.add.sprite(chimiste.x, chimiste.y-40, 'fiole');
                    fiole.setVelocity(Phaser.Math.FloatBetween(200, 400), Phaser.Math.FloatBetween(-200, -400));
                    fiole.setGravityY(200);
                    
                    this.physics.add.collider(fiole, platforms,fioleMur,null,this);
                    this.physics.add.overlap(fiole, player,fiolePlayer,null, this);

                    chimiste.lancer = true;
                }
                
                else{
                    chimiste.fuite = true;
                    chimiste.anims.play("chimisteFuite", true);
                    chimiste.direction = 'RIGHT'
                }
            
            

        }
        else if (player.x - chimiste.x < detectionChimiste && player.x - chimiste.x > 0 && chimiste.y - player.y < 10 && chimiste.y - player.y > -10 && !attrape && !chimiste.stun && !invincible /*&& chimiste.direction === 'RIGHT'*/&& !chimiste.fuite && !gameOver){
            if(player.x < chimiste.x && !chimiste.lancer){
                    
                setTimeout(function(){chimiste.lancer = false;}, 700);
                chimiste.lancer = true;

                chimiste.setVelocityX(0);
                chimiste.setFlipX(false);

                fiole = this.physics.add.sprite(chimiste.x, chimiste.y-40, 'fiole');
                fiole.setVelocity(Phaser.Math.FloatBetween(-200, -400), Phaser.Math.FloatBetween(-200, -400));
                fiole.setGravityY(200);
                
                this.physics.add.collider(fiole, platforms,fioleMur,null,this);
                this.physics.add.overlap(fiole, player,fiolePlayer,null, this);

                chimiste.lancer = true;
            }
            else if(player.x > chimiste.x && !chimiste.lancer){
                
                setTimeout(function(){chimiste.lancer = false;}, 700);
                chimiste.lancer = true;

                chimiste.setVelocityX(0);
                chimiste.setFlipX(true);

                fiole = this.physics.add.sprite(chimiste.x, chimiste.y-40, 'fiole');
                fiole.setVelocity(Phaser.Math.FloatBetween(200, 400), Phaser.Math.FloatBetween(-200, -400));
                fiole.setGravityY(200);
                
                this.physics.add.collider(fiole, platforms,fioleMur,null,this);
                this.physics.add.overlap(fiole, player,fiolePlayer,null, this);

                chimiste.lancer = true;
            }
            else{

                chimiste.fuite = true;
                chimiste.direction = 'LEFT'
                chimiste.anims.play("chimisteFuite", true);
            }    
            
            
        }

        else if (chimiste.direction === 'RIGHT') {
            if (chimiste.fuite && chimiste.body.velocity.x > 0){
                chimiste.setVelocityX(vitesseChimisteFuite);
                chimiste.anims.play("chimisteFuite", true);
                chimiste.setFlipX(true);
            }
             else if(chimiste.lancer && chimiste.fuite){
                chimiste.anims.play('chimisteLancer',true);
            }
            else if (chimiste.stun){
                chimiste.setVelocityX(0);
                chimiste.anims.play("chimisteStun", true);
            }
            else {
                chimiste.anims.play('chimisteMarche',true);
                chimiste.setVelocityX(vitesseChimiste);
                chimiste.setFlipX(true);
            }
            
            
            if (attrape || chimiste.stun || chimiste.lancer){
                chimiste.setVelocityX(0); 
            }

            
        } else {
            if (chimiste.fuite && chimiste.body.velocity.x < 0){
                chimiste.anims.play('chimisteFuite',true);
                chimiste.setVelocityX(-vitesseChimisteFuite);
                chimiste.setFlipX(false);
            }
            else if(chimiste.lancer && chimiste.fuite){
                chimiste.anims.play('chimisteLancer',true);
            }
            else if (chimiste.stun){
                chimiste.setVelocityX(0);
                chimiste.anims.play("chimisteStun", true);
            }
            else{
                chimiste.anims.play('chimisteMarche',true);
                chimiste.setVelocityX(-vitesseChimiste);
                chimiste.setFlipX(false);
            }
            
            if (attrape || chimiste.stun || chimiste.lancer){
                chimiste.setVelocityX(0); 
            }
        }
        
    }
        
    }
}    