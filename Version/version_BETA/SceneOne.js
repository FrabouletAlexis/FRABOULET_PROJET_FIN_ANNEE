var cursors;
var cursors2;
var paddle;
var padConnected;
var onGround ;

var onGround;
var onLeft;
var onRight;

var platforms;
var porte;
var fond;
var verrouille = -1;
var position_base = false;
var player;
var gameOver = false;
var gameOvertext;

var restCompteurInvincible = 150;
var compteurInvincible = restCompteurInvincible;
var invincible  =  false  ;

var sautGauche = false;
var sautDroite = false;
///////////////
/// enemie /// 
/////////////

var enemieRigth;
var enemieObjects;
var archerObjects;
var chimisteObjects;
var colosseObjects;

var attrapeColosse = false;
var attrape = false;

var enemieStun;
var archerStun = false;
var chimisteStun = false;
var colosseStun = false;

var vitesseColosse = 150;
var vitesseSoldat = 250;
var vitesseChimiste = 250;
var compteurMax = 60;
var compteur = compteurMax;
var dureStun = 10000;

var fiole;
var chimisteAgro = false;
var chimisteMask = true;
var compteurFioleMax = 100;
var compteurFiole = compteurFioleMax;
var lancer = false;

var vitesseFleche = 400;
var fleche;
var flecheDestroy = true;
var nbFleche = 0;
var mortFleche = false;
var tir = false;

var archerX;
var archerY;
var colosseX;
var colosseY;

//vie
var barreFumi;
var barreFumiX = 200;
var barreFumiY = 60;

// joueur/////////////////
var sautTete = false;
var nbFumigene = 5;
var fumigene = true;
var attaque = false;
var vitesse_joueur = 300;
var vitesse_saut = 100;
var gravite_joueur = 400;
var vitesseAttaque = 600;

var unlockDoubleJump = false;
var doubleJump = true;
var vitesseSautMur = 350;
var saut = false;

var jumpCD = true;
var jumpDuration = false;
var speed = 1;


var fumerFX;
var animeFumerFX = false;
var restAnimeFumerFX = 60;
var compteurAnimeFumerFX = restAnimeFumerFX;

 // item ///

clef1 = false;

// texte tuto //////

var tutoDeplacement;
var textAttaque;
var textPiolet;

var afficheFumi;

var afficheDroite;
var afficheGauche;
var afficheAttrape;
var afficheCompteur;
var afficheInvincible;
var afficheAttaque;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("SceneOne");
    }
    init(data){
        
    }
    preload(){
        this.load.image('parallaxe3','assets/parallaxe/parallaxe_3.png');
        this.load.image('parallaxe2','assets/parallaxe/parallaxe_2.png');
        this.load.image('parallaxe1','assets/parallaxe/parallaxe_1.png');

        this.load.spritesheet('vinetta', 'assets/spritesheet/spritesheet_Vinetta.png', { frameWidth: 160, frameHeight: 150 });
        this.load.spritesheet('vinetta_neutre', 'assets/spritesheet/spritesheet_Vinetta_neutre.png', { frameWidth: 84, frameHeight: 150 });
        this.load.spritesheet('mia_mort', 'assets/spritesheet/mia_mort.png', { frameWidth: 210, frameHeight: 150 });
        this.load.spritesheet('colosse', 'assets/spritesheet/colosse.png', { frameWidth: 116/2, frameHeight: 171 });
        this.load.spritesheet('archer', 'assets/spritesheet/spritesheet_tireur.png', { frameWidth: 87, frameHeight: 150 });
        this.load.spritesheet('chimiste', 'assets/spritesheet/chimiste.png', { frameWidth: 99/2, frameHeight: 150 });
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
        this.load.tilemapTiledJSON('map','assets/tiles/level.json'); 
    }
    create(){
        
        //this.add.image(4800/2, 1760/2, 'parallaxe3').setScrollFactor(0.1);
        //this.add.image(4800/2, 1760/2, 'parallaxe2').setScrollFactor(0.5);
        //this.add.image(4800/2, 1760/2, 'parallaxe1').setScrollFactor(1.8).setDepth(2);

        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('platforms','tiles');
        
        
        platforms = map.createLayer('roche',tileset, 0, 0);
        porte = map.createLayer('Porte',tileset,0,0);
        const secret = map.createLayer('Secret',tileset,0,0).setDepth(1);
        fond = map.createLayer('Fond',tileset,0,0).setDepth(-1);;
        
        platforms.setCollisionByExclusion(-1,true)
        porte.setCollisionByExclusion(-1,true)

        player = this.physics.add.sprite(200, 70, 'vinetta');
        player.body.setGravityY(gravite_joueur)
        player.body.height = 150;
        player.body.width = 50;
        player.body.setOffset(((150/2)-(50/2)),0);
    
        player.setBounce(0.01);
        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, porte);
        
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
            frameRate: 20,
            repeat: 0,
        });

        this.anims.create({
            key: 'mortFleche',
            frames: this.anims.generateFrameNumbers('vinetta', { start: 77, end: 90 }),
            frameRate: 20,
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

        enemieObjects = map.getObjectLayer('enemie').objects;
        this.enemies = this.physics.add.group({
            allowGravity: true
        }); 
        
        for (const enemie of enemieObjects) {
            enemieStun = false
            this.enemies.create(enemie.x, enemie.y, 'mia_pose')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }
        /*for (const enemie of enemieObjects) {
            this.add.existing(new Soldat(this, enemie.x, enemie.y));
        }*/

        
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
            enemieStun = false
            colosseX = this.colosses.x
            colosseY = this.colosses.y
            this.colosses.create(colosse.x, colosse.y, 'colosse')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }
        
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
            archerStun = false
            archerX = archer.x
            archerY = archer.y
            this.archers.create(archer.x, archer.y, 'archer')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }
        
        //this.physics.add.collider(this.archers, platforms, tir, null, this);
        this.physics.add.collider(this.archers, platforms);
        this.physics.add.overlap(player, this.archers, chopeAcher, null, this);

        /////////////anime///////

        this.anims.create({
            key: 'TireurTir',
            frames: this.anims.generateFrameNumbers('archer', { start: 1, end: 17 }),
            frameRate: 20,
        });

        this.anims.create({
            key: 'TireurStun',
            frames: this.anims.generateFrameNumbers('archer', { start: 18, end: 28 }),
            frameRate: 20,
        });
        
        this.anims.create({
            key: 'TireurExecution',
            frames: this.anims.generateFrameNumbers('archer', { start: 29, end: 47 }),
            frameRate: 20,
        });

        /////////////////////////////   
        // CHIMISTE /////////////////
        ////////////////////////////

        chimisteObjects = map.getObjectLayer('chimiste').objects;
        this.chimiste = this.physics.add.group({
            allowGravity: true
        });
        
        for (const chimiste of chimisteObjects) {
            chimisteStun = false
            //archerX = archer.x
            //archerY = archer.y
            this.chimiste.create(chimiste.x, chimiste.y, 'chimiste')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }
        
        //this.physics.add.collider(this.archers, platforms, tir, null, this);
        this.physics.add.collider(this.chimiste, platforms);
        this.physics.add.overlap(player, this.chimiste, chopeChimiste, null, this);
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

            this.coffre.create(coffre.x, coffre.y, 'tresor')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
        }

        this.physics.add.overlap(player, this.coffre ,recupCoffre, null,this);
        
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

        /*if (nbFleche == 0 && archerStun == false){
            for (const archer of this.archers.children.entries) {

                fleche = this.physics.add.sprite(archer.x,archer.y-20,'fleche');
                fleche.body.allowGravity = false;
                nbFleche = 1;
                if (player.x < archer.x && nbFleche == 0){

                    fleche.setVelocityX(vitesseFleche);
                    archer.anims.play('TireurTir',true);
                }
                else {
                    fleche.setVelocityX(-vitesseFleche);
                }
            }
            
            
        }*/

        if (chimisteStun == false && chimisteAgro && gameOver == false && attrape == false){
            
            compteurFiole --;
            if (compteurFiole == 0 && lancer == false){
                lancer = true;
                for (const chimiste of this.chimiste.children.entries) {
                    fiole = this.physics.add.sprite(chimiste.x, chimiste.y, 'fiole');
    
                    if(player.x<chimiste.x){
                        fiole.setVelocity(Phaser.Math.FloatBetween(-200, -400), Phaser.Math.FloatBetween(-200, -400));
                        fiole.setGravityY(200);
                    }
                    else if(player.x>chimiste.x){
                        fiole.setVelocity(Phaser.Math.FloatBetween(200, 400), Phaser.Math.FloatBetween(-200, -400));
                        fiole.setGravityY(200);
                    }

                    this.physics.add.collider(fiole, platforms,fioleMur,null,this);
                    this.physics.add.overlap(fiole, player,fiolePlayer,null, this);
                }
                compteurFiole = compteurFioleMax;
            }
            
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
            if (mortFleche == true){
                player.anims.play('mortFleche',true);
            }
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
        
        if (player.body.velocity.y < 0 && !onGround){
            player.anims.play("saut", true);
        }
        else if (player.body.velocity.y > 0 && !onGround){
            player.anims.play("chute", true);
        }

        if (player.body.velocity.x === 0 && onGround && !gameOver){
            player.anims.play("neutre", true);
            //player.anims.play("mortFleche", true);
        }
        if (attrape && compteur > 0 && !gameOver){
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

      /////////////////////////////   
     // ARCHER ///////////////////
    /////////////////////////////

        if (nbFleche == 0 && archerStun == false){
            for (const archer of this.archers.children.entries) {

                if (nbFleche == 0 && archerStun == false && player.x - archer.x < 200 && archer.x - player.x > 0){
                    fleche = this.physics.add.sprite(archer.x,archer.y-20,'fleche');
                    fleche.body.allowGravity = false;
                    nbFleche = 1;
            
                    fleche.setVelocityX( -vitesseFleche);
                    archer.anims.play('TireurTir',true);
                } 
                
                else if (nbFleche == 0 && archerStun == false && archer.x - player.x < 200 && player.x - archer.x > 0){
                    fleche = this.physics.add.sprite(archer.x,archer.y-20,'fleche');
                    fleche.body.allowGravity = false;
                    nbFleche = 1;
            
                    fleche.setVelocityX( vitesseFleche);
                    archer.anims.play('TireurTir',true);
                    archer.setFlipX(true);

                }
            }
        }

        

        this.physics.add.collider(fleche, platforms, flecheMur,null, this);
        this.physics.add.overlap(fleche, player,flechePlayer,null, this);
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

        if(enemie.x - player.x < 400 && enemie.x - player.x > 0 && enemie.y - player.y < 200 && enemie.y - player.y > -200 && !attrape && !enemieStun && !invincible){

            enemie.setVelocityX(-vitesseSoldat);
            

        }
        else if (player.x - enemie.x < 400 && player.x - enemie.x > 0 && enemie.y - player.y < 200 && enemie.y - player.y > -200 && !attrape && !enemieStun && !invincible){
            enemie.setVelocityX(vitesseSoldat);
            enemie.setFlipX(true);
        }
        else if (enemie.direction === 'RIGHT') {
            
            enemie.setVelocityX(300);
            enemie.setFlipX(true);
            if (attrape || enemieStun){
                enemie.setVelocityX(0); 
            }          
        } 
        else {
            enemie.setVelocityX(-300);
            enemie.setFlipX(false);
            
            if (attrape || enemieStun){
                enemie.setVelocityX(0); 
            }
        }
        

        /*if (player.x > enemie.x -200 && player.x < enemie.x+ 200){
            enemie.setVelocityY(-200);
        }*/
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

        if (colosse.direction === 'RIGHT') {
            colosse.setVelocityX(vitesseColosse);
            colosse.setFlipX(true);
            if (colosseStun || colosseStun){
                colosse.setVelocityX(0);
            }
            if ( attrapeColosse || colosseStun){
                colosse.setVelocityX(0); 
            }
            
        } else {
            colosse.setVelocityX(-vitesseColosse);
            colosse.setFlipX(false);
            if (attrapeColosse || colosseStun){
                colosse.setVelocityX(0); 
            }
        }
    }

      /////////////////////////////   
     // CHIMISTE /////////////////
    /////////////////////////////
    
    for (const chimiste of this.chimiste.children.entries) {
        if (chimiste.body.blocked.right) {
            chimiste.direction = 'LEFT';
        }

        if (chimiste.body.blocked.left) {
            chimiste.direction = 'RIGHT';
        }

        if (chimiste.direction === 'RIGHT') {
            chimiste.setVelocityX(vitesseChimiste);
            chimiste.setFlipX(true);
            if (chimisteStun){
                chimiste.setVelocityX(0);
            }
            if (attrape || chimisteStun || lancer){
                chimiste.setVelocityX(0); 
            }
            
        } else {
            chimiste.setVelocityX(-vitesseChimiste);
            chimiste.setFlipX(false);
            if (attrape || chimisteStun || lancer){
                chimiste.setVelocityX(0); 
            }
        }
    }
    
    /*if (player.x < archerX){
        this.felche.setVelocityX(100);
    }*/
    
        /*else if (attaque){
            setTimeout(function(){this.enemies.setTint(0xffffff);}, dureStun);
            enemieStun = true;
            setTimeout(function(){enemieStun = false}, dureStun);
            this.enemies.setTint(0xff0000);
        }*/
        
    }
        
        /*if (onGround) {
        
            if (player.body.velocity.x < 0){

                player.anims.play('course', true);
                player.setFlipX(false);
            }
            else if (position_base == false){

                player.anims.play('neutre', true);
                player.setFlipX(false);
            }
            else if (player.body.velocity.x > 0){

                player.anims.play('course', true);
                player.setFlipX(true);
            } 
            else if (position_base == true){

                player.anims.play('neutre', true);
                player.setFlipX(true);
            }
        }*/
        
    }
    /*function chope(player, enemie){
        if (attaque && attrape == false && onGround == false){
            setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
            enemieStun = true;
            setTimeout(function(){enemieStun = false}, dureStun);
            enemie.setTint(0xff0000);
        }
        else if (enemieStun == false && gameOver == false && invincible == false && attaque == false){
            attrape = true;
            compteur --;
                

            if ( cursors2.E.isDown && nbFumigene > 0 && compteur > 0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                attrape = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);

                setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
                enemieStun = true;
                setTimeout(function(){enemieStun = false}, dureStun);
                enemie.setTint(0xff0000);


                /*if (enemies.y <= player.y+1000 && enemies.y >= player.y-1000 && enemies.x <= player.x+1000 && enemies.x >= player.x-1000){

                    setTimeout(function(){enemies.setTint(0xffffff);}, dureStun);
                    enemieStun = true;
                    setTimeout(function(){enemieStun = false}, dureStun);
                    enemies.setTint(0xff0000);

                }
                
            }
            else if (compteur == 0){
                
                gameOver = true;
            }
        }
    }*/
    function chope(player, enemie){
        if (attaque && enemie.setVelocityX!= 0 && onGround == false){
            setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
            //enemieStun = true;
            setTimeout(function(){enemie.setVelocityX(0)}, dureStun);
            enemie.setTint(0xff0000);
        }
        else if (enemie.setVelocityX!= 0 && gameOver == false && invincible == false && attaque == false){
            //attrape = true;
            enemie.setVelocityX(0)
            compteur --;
                

            if ( cursors2.E.isDown && nbFumigene > 0 && compteur > 0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                //attrape = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);

                setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
                //enemieStun = true;
                setTimeout(function(){enemie.setVelocityX(0)}, dureStun);
                enemie.setTint(0xff0000);


                /*if (enemies.y <= player.y+1000 && enemies.y >= player.y-1000 && enemies.x <= player.x+1000 && enemies.x >= player.x-1000){

                    setTimeout(function(){enemies.setTint(0xffffff);}, dureStun);
                    enemieStun = true;
                    setTimeout(function(){enemieStun = false}, dureStun);
                    enemies.setTint(0xff0000);

                }*/
                
            }
            else if (compteur == 0){
                
                gameOver = true;
            }
        }
    }
    function chopeColosse(player, colosse){
        if (attaque && attrape == false && onGround == false){
            sautTete = true;
            player.setVelocityY(-vitesse_saut/2);
        }

        if (colosseStun == false && gameOver == false && invincible == false && sautTete == false){
            attrapeColosse = true;
            compteur --;

            if ( cursors2.E.isDown && nbFumigene >0 && compteur >0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                attrapeColosse = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);

                setTimeout(function(){colosse.setTint(0xffffff);}, dureStun);
                colosseStun = true;
                setTimeout(function(){colosseStun = false}, dureStun);
                colosse.setTint(0xff0000);


                /*if (enemies.y <= player.y+1000 && enemies.y >= player.y-1000 && enemies.x <= player.x+1000 && enemies.x >= player.x-1000){

                    setTimeout(function(){enemies.setTint(0xffffff);}, dureStun);
                    enemieStun = true;
                    setTimeout(function(){enemieStun = false}, dureStun);
                    enemies.setTint(0xff0000);

                }*/
                
            }
            else if (compteur == 0){
                gameOver = true;
            }
        }
    }
    function chopeChimiste(player, chimiste){
        if (attaque && attrape == false && onGround == false){
            setTimeout(function(){chimiste.setTint(0xffffff);}, dureStun);
            chimisteStun = true;
            setTimeout(function(){chimisteStun = false}, dureStun);
            chimiste.setTint(0xff0000);
            chimisteMask = false;
            chimisteAgro = true;
        }
        else if (chimisteStun == false && gameOver == false && invincible == false && attaque == false){
            attrape = true;
            compteur --;

            if ( cursors2.E.isDown && nbFumigene >0 && compteur >0  && chimisteMask == false){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                attrape = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);

                setTimeout(function(){chimiste.setTint(0xffffff);}, dureStun);
                chimisteStun = true;
                setTimeout(function(){chimisteStun = false}, dureStun);
                chimiste.setTint(0xff0000);


                /*if (enemies.y <= player.y+1000 && enemies.y >= player.y-1000 && enemies.x <= player.x+1000 && enemies.x >= player.x-1000){

                    setTimeout(function(){enemies.setTint(0xffffff);}, dureStun);
                    enemieStun = true;
                    setTimeout(function(){enemieStun = false}, dureStun);
                    enemies.setTint(0xff0000);

                }*/
                
            }
            else if (compteur == 0){
                
                gameOver = true;
            }
        }
    }
    function chopeAcher (player, archer){
        if (attaque && onGround == false){
            setTimeout(function(){archer.setTint(0xffffff);}, dureStun);
            archerStun = true;
            archer.anims.play('TireurStun',true);
            setTimeout(function(){archerStun = false}, dureStun);
            archer.setTint(0xff0000);
        }
        if (archerStun == false && gameOver == false && invincible == false && attaque == false){
            nbFleche = 1
            attrape = true;
            compteur --;
            archer.anims.play('TireurExecution',true);

            if ( cursors2.E.isDown && nbFumigene >0 && compteur > 0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                attrape = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);

                setTimeout(function(){archer.setTint(0xffffff);}, dureStun);
                archerStun = true;
                archer.anims.play('TireurStun',true);
                setTimeout(function(){archerStun = false}, dureStun);
                archer.setTint(0xff0000);
                nbFleche = 0
            }
            else if (compteur == 0){
                
                gameOver = true;
                player.anims.play('mortFlecheSol',true);
            }
        }
        
    }
    function flecheMur (fleche,platforms){
        fleche.setVelocityX(0);
        fleche.disableBody(true, true);
        fleche.body.destroy();
        nbFleche = 0;
    }
    function fioleMur (fiole,platforms){
        fiole.setVelocityX(0);
        fiole.disableBody(true, true);
        fiole.body.destroy();
        lancer = false;
    }
    function flechePlayer (fleche,player){
        if (invincible == false){
            //player.anims.play("mortFleche",true);
            fleche.setVelocityX(0);
            fleche.disableBody(true, true);
            fleche.body.destroy();
            gameOver = true;
            mortFleche=true;
        }
        
    }
    function fiolePlayer (fiole,player){
        if (invincible == false){
            fiole.setVelocityX(0);
            fiole.disableBody(true, true);
            fiole.body.destroy();
            gameOver = true;
        } 
    }

    function recupBombe (player,bombe){
        if (nbFumigene < 5){
            bombe.disableBody(true, true);
            bombe.body.destroy();
            nbFumigene += 1;
        }
    }
    function recupClef (player,clef){
        porte.setCollisionByExclusion(0,true)
        clef.disableBody(true, true);
        clef.body.destroy();
        clef1 = true;
    }
    function recupCoffre (player,coffre){
        
        coffre.disableBody(true, true);
        coffre.body.destroy();

    }
    