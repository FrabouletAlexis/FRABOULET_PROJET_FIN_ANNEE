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
var secret;
var zoneChargement;
var zoneMort;

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
/// BOUTON /// 
/////////////
var buttonJouer;
var buttonCommande;
var buttonRetour;
var panneauCommande;

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
var enemieStunFumi = false;
var archerStun = false;
var chimisteStun = false;
var colosseStun = false;

var vitesseColosse = 100;
var vitesseColosseCourse = 200;
var vitesseSoldat = 100;
var vitesseSoldatCourse = 300;
var vitesseChimiste = 100;
var vitesseChimisteFuite = 200;
var compteurMax = 60;
var compteur = compteurMax;
var dureStun = 10000;

var fiole;
var chimisteAgro = false;
var chimisteFuite = false;
var chimisteMask = true;
var compteurFioleMax = 100;
var compteurFiole = compteurFioleMax;
var lancer = false;

var vitesseFleche = 400;
var fleche;
var flecheDestroy = true;
var nbFleche = 0;
var mortFleche = false;
var tir = true;

var archerX;
var archerY;
var colosseX;
var colosseY;

//vie
var barreFumi0;
var barreFumi1;
var barreFumi2;
var barreFumi3;
var barreFumi4;
var barreFumi5;

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

class LevelPart1 extends Phaser.Scene{
    constructor(){
        super("LevelPart1");
    }
    init(data){
        
    }
    preload(){

        this.load.image('parallaxe3','assets/parallaxe/parallaxe_3.png');
        this.load.image('parallaxe2','assets/parallaxe/parallaxe_2.png');
        this.load.image('parallaxe1','assets/parallaxe/parallaxe_1.png');

        this.load.audio('audio_fond', 'assets/audio/music_fond.ogg')
        this.load.audio('bruit_coup', 'assets/audio/Bruit_coup.ogg')

        this.load.spritesheet('vinetta', 'assets/spritesheet/spritesheet_Vinetta.png', { frameWidth: 160, frameHeight: 150 });
        this.load.spritesheet('vinetta_Mort_fiole', 'assets/spritesheet/spritesheet_Vinetta_Mort_fiole.png', { frameWidth: 235, frameHeight: 150 });
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
        this.load.tilemapTiledJSON('mapPart1','assets/tiles/level_Part_1.json');

        this.load.audio('audio_fond', 'assets/audio/music_fond.ogg')
        this.load.audio('bruit_coup', 'assets/audio/Bruit_coup.ogg')
    }
    create(){
        console.log('nbFleche =1');
        this.bruitCoup = this.sound.add('bruit_coup')
        /*this.musicFond = this.sound.add('audio_fond')
        var musicConfig = {
            mute : false,
            volume : 1,
            rate : 1,
            deturne : 0,
            seek : 0,
            loop : false,
            delay : 0,

        }
        this.musicFond.play(musicConfig)*/

        this.add.image(4128/2, 2688/2, 'parallaxe4').setScrollFactor(0.5);
        this.add.image(4128/2, 2688/2, 'parallaxe3').setScrollFactor(0.6);
        this.add.image(4128/2, 2688/2, 'parallaxe2').setScrollFactor(0.9);
        this.add.image(4128/2, 2688/2, 'parallaxe1').setScrollFactor(1.5).setDepth(2);

        const map = this.make.tilemap({key : 'mapPart1'});
        const tileset = map.addTilesetImage('platforms','tiles');
        
        
        platforms = map.createLayer('Platforms',tileset, 0, 0).setDepth(1);
        porte = map.createLayer('Porte',tileset,0,0).setDepth(0.5);
        secret = map.createLayer('Secret',tileset,0,0).setDepth(1.5);
        fond = map.createLayer('Fond',tileset,0,0)
        zoneMort = map.createLayer('Zone_mort',tileset,0,0)
        zoneChargement = map.createLayer('Chargement',tileset,0,0)
        
        platforms.setCollisionByExclusion(-1,true)
        porte.setCollisionByExclusion(-1,true)
        zoneMort.setCollisionByExclusion(-1,true)
        zoneChargement.setCollisionByExclusion(-1,true)
        
      /////////////////////////////   
     // JOUEUR ///////////////////
    /////////////////////////////

        //player = this.physics.add.sprite(135, 2050, 'vinetta');
        player = this.physics.add.sprite(4594, 2961, 'vinetta');
        player.body.setGravityY(gravite_joueur)
        player.body.height = 150;
        player.body.width = 50;
        player.body.setOffset(((150/2)-(50/2)),0);
        
        player.setBounce(0.01);
        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, porte);
        this.physics.add.collider(player, zoneMort, chute, null, this);
        this.physics.add.collider(player, zoneChargement, changementZone, null, this);

        function changementZone (player,zoneChargement){

            if (player.y >= 2990 && player.x >= 4840/* && player.x <= 560*/){
                //this.scene.start("EcranTitre");
                this.scene.start("LevelPart2");
                /*cursors.up.reset();
                cursors.down.reset();
                cursors.right.reset();
                cursors.left.reset();*/
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
            enemieStun = false
            colosseX = this.colosses.x
            colosseY = this.colosses.y
            this.colosses.create(colosse.x, colosse.y, 'colosse')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        for (const colosse of this.colosses.children.entries) {
            colosse.stun = false;
            colosse.chope = false;
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
        
        //this.physics.add.collider(this.archers, platforms, tir, null, this);
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
            chimisteStun = false
            //archerX = archer.x
            //archerY = archer.y
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
        }
        
        //this.physics.add.collider(this.archers, platforms, tir, null, this);
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
            cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE,E,SHIFT,R');
            const sautMur = Phaser.Input.Keyboard.JustDown(cursors2.SPACE);
            const libre = Phaser.Input.Keyboard.JustDown(cursors2.E);
            
        
          /////////////////////////////   
         // CAMERA ///////////////////
        ///////////////////////////// 

        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); 

    }
    update(){

        //this.musicFond.play()
        if(nbFumigene === 5)
        {   
            barreFumi5 = this.add.image(barreFumiX,barreFumiY,'barreFumi5') 
                .setDepth(2)
                .setScrollFactor(0);
        }
        
        else if (nbFumigene === 4){
            
            barreFumi5.destroy();
            barreFumi4 = this.add.image(barreFumiX,barreFumiY,'barreFumi4') 
                .setDepth(2)
                .setScrollFactor(0);
        }
        
        else if (nbFumigene === 3){

            barreFumi4.destroy();
            barreFumi3 = this.add.image(barreFumiX,barreFumiY,'barreFumi3') 
                .setDepth(1)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 2){
            
            barreFumi3.destroy();
            barreFumi2 = this.add.image(barreFumiX,barreFumiY,'barreFumi2') 
                .setDepth(2)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 1){
            
            barreFumi2.destroy();
            barreFumi1 = this.add.image(barreFumiX,barreFumiY,'barreFumi1') 
                .setDepth(2)
                .setScrollFactor(0);
        }
        else if (nbFumigene === 0){
            
            barreFumi1.destroy();
            barreFumi0 = this.add.image(barreFumiX,barreFumiY,'barreFumi0') 
                .setDepth(2)
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
            
            if (cursors2.R.isDown){
                this.scene.restart();
                gameOver = false;
                console.log('nbFleche =1');
            }
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
    
        if ((cursors.left.isDown && sautGauche == false || cursors2.Q.isDown)&& attrape == false)
        {   
            if (gameOver == false){
                
                player.setVelocityX(-vitesse_joueur*speed);
                player.anims.play("course", true);
                player.setFlipX(true);
                
            }           
            sautGauche = false;
        }
        
        else if ((cursors.right.isDown && sautDroite == false || cursors2.D.isDown)&& attrape == false)
        {

            if (gameOver == false){
                player.setVelocityX(vitesse_joueur*speed);
                player.anims.play("course", true);
                //player.anims.play("colosseExecution", true);
                player.setFlipX(false);
            }
            sautDroite = false;
        }
        
        else if (((cursors.down.isDown || cursors2.S.isDown)&& attrape == false && onGround == false && sautTete == false) && gameOver == false){//direction vers le bas /////////////////////
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
        if (((cursors.up.isDown && onGround || cursors2.Z.isDown && onGround || cursors2.SPACE.isDown && onGround) && attrape == false) && gameOver == false )
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
            //player.anims.play("mortFiole", true);
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
            this.bruitCoup.play()
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
                enemie.stun = true;
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

        
        for (const archer of this.archers.children.entries) {

            if (archer.tir == 0 && archer.stun == false){
                

                if (archer.tir == 0 && !archer.stun && archer.x - player.x < 400 && archer.x - player.x > 0 && archer.y - player.y < 10 && archer.y - player.y > -10 && !attrape && !invincible && !gameOver){
                    
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
                else if (archer.tir == 0 && !archer.stun && player.x - archer.x < 400 && player.x - archer.x > 0 && archer.y - player.y < 10 && archer.y - player.y > -10 && !attrape && !invincible && !gameOver){
                    
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
                } 

                if (player.x < enemie.x && !execution){
                    execution = true
                    enemie.setFlipX(false);
                    enemie.setVelocityX(-50)
                }
                else if (player.x > enemie.x && !execution) {
                    execution = true
                    enemie.setFlipX(true);
                    enemie.setVelocityX(50)
                } 
            }
            else if (enemie.stun){
                enemie.anims.play('soldatStunAtkBoucle', true);
                enemie.setFlipX(true);
                enemie.setVelocityX(0);
            }
            else if (enemieStunFumi){
                enemie.anims.play('soldatStunFumiBoucle', true);
                enemie.setFlipX(true);
                enemie.setVelocityX(0);
            }
            else if (player.x - enemie.x < 400 && player.x - enemie.x > 0 && enemie.y - player.y < 10 && enemie.y - player.y > -10 && !attrape && !enemie.stun && !invincible && !gameOver){
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
                }

                if (player.x > enemie.x && !execution){
                    execution = true;
                    enemie.setFlipX(true);
                    enemie.setVelocityX(50)
                }
                else if (player.x < enemie.x && !execution){
                    execution = true;
                    enemie.setFlipX(false);
                    enemie.setVelocityX(-50);
                } 
                    
            }
            else if (enemie.stun && enemie.body.blocked.down) {
                enemie.anims.play('soldatStunAtkBoucle', true);
                enemie.setFlipX(false);
                enemie.setVelocityX(0);
            }
            else if(enemie.x - player.x < 400 && enemie.x - player.x > 0 && enemie.y - player.y < 10 && enemie.y - player.y > -10 && !attrape && !enemie.stun && !invincible && !gameOver) {

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
                } 

                if (player.x < colosse.x && !execution){
                    execution = true
                    colosse.setFlipX(false);
                    colosse.setVelocityX(-100)
                }
                else if (player.x > colosse.x && !execution) {
                    execution = true
                    colosse.setFlipX(true);
                    colosse.setVelocityX(100)
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

            else if (player.x - colosse.x < 400 && player.x - colosse.x > 0 && colosse.y - player.y < 10 && colosse.y - player.y > -10 && !colosse.chope && !colosse.stun && !invincible && !gameOver){
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
                }

                if (player.x > colosse.x && !execution){
                    execution = true;
                    colosse.setFlipX(true);
                    colosse.setVelocityX(100)
                }
                else if (player.x < colosse.x && !execution){
                    execution = true;
                    colosse.setFlipX(false);
                    colosse.setVelocityX(-100);
                }
            }
            else if (colosse.stun){
                colosse.anims.play('colosseStunBoucle', true);
                colosse.setFlipX(false);
                colosse.setVelocityX(0);
            }

            else if(colosse.x - player.x < 400 && colosse.x - player.x > 0 && colosse.y - player.y < 10 && colosse.y - player.y > -10 && !colosse.chope && !colosse.stun && !invincible && !gameOver) {

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

        if(chimiste.x - player.x < 200 && chimiste.x - player.x > 0 && chimiste.y - player.y < 10 && chimiste.y - player.y > -10 && !attrape && !chimiste.stun && !invincible /*&& chimiste.direction === 'LEFT' */&& !chimiste.fuite && !gameOver) {              

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
        else if (player.x - chimiste.x < 200 && player.x - chimiste.x > 0 && chimiste.y - player.y < 10 && chimiste.y - player.y > -10 && !attrape && !chimiste.stun && !invincible /*&& chimiste.direction === 'RIGHT'*/&& !chimiste.fuite && !gameOver){
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
    function chope(player, enemie){
        if (attaque && enemie.chope == false && onGround == false){
            setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
            enemie.stun = true;
            enemie.anims.play('soldatStunAtkBoucle', true);
            setTimeout(function(){enemie.stun = false}, dureStun);
            enemie.setTint(0xff0000);
        }
        else if (enemie.stun == false && gameOver == false && invincible == false && attaque == false){
            attrape = true;
            enemie.chope = true;
            compteur --;
            player.setVelocityX(0);
            if (onGround){
                enemie.anims.play('soldatExecution',true);
            }
                

            if ( cursors2.E.isDown && nbFumigene > 0 && compteur > 0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                attrape = false;
                enemie.chope = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);

                setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
                enemie.stun = true;
                enemie.anims.play('soldatStunAtkBoucle', true);
                setTimeout(function(){enemie.stun = false}, dureStun);
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
                player.anims.play('mortSoldat',true);
            }
        }
    } 
    /*function chope(player, enemie){
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

                }
                
            }
            else if (compteur == 0){
                
                gameOver = true;
            }
        }
    }*/
    function chopeColosse(player, colosse){
        if (attaque && attrape == false && onGround == false){
            sautTete = true;
            player.setVelocityY(-vitesse_saut/2);
            colosse.anims.play('colosseRebond',true);
        }

        if (colosse.stun == false && gameOver == false && invincible == false && sautTete == false){
            colosse.chope = true;
            attrape = true;
            compteur --;
            player.setVelocityX(0);
            if (onGround){
                colosse.anims.play('colosseExecution',true);
            }
            

            if ( cursors2.E.isDown && nbFumigene >0 && compteur >0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                colosse.chope = false;
                attrape = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);

                setTimeout(function(){colosse.setTint(0xffffff);}, dureStun);
                colosse.stun = true;
                setTimeout(function(){colosse.stun = false}, dureStun);
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
                player.anims.play("mortColosse", true);
            }
        }
    }
    function chopeChimiste(player, chimiste){
        if (attaque && attrape == false && onGround == false){
            setTimeout(function(){chimiste.setTint(0xffffff);}, dureStun);
            
            chimiste.stun = true;
            setTimeout(function(){chimiste.stun = false}, dureStun);
            chimiste.setTint(0xff0000);
        }
        /*else if (chimisteStun == false && gameOver == false && invincible == false && attaque == false){
            attrape = true;
            compteur --;
            player.setVelocityX(0);
            

            if ( cursors2.E.isDown && nbFumigene > 0 && compteur >0  && chimisteMask == false){
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
                
            }
            else if (compteur == 0){
                
                gameOver = true;
            }
        }*/
    }
    function chopeAcher (player, archer){
        if (attaque && onGround == false){
            setTimeout(function(){archer.setTint(0xffffff);}, dureStun);
            archer.stun = true;
            
            archer.anims.play('TireurStun',true);
            setTimeout(function(){archer.stun = false}, dureStun);
            archer.setTint(0xff0000);
        }
        if (archer.stun == false && gameOver == false && invincible == false && attaque == false){
            player.setVelocityX(0);
            //archer.tir = 1
            attrape = true;
            
            if (onGround && attrape){
                archer.anims.play('TireurExecution',true);
                compteur --;
            }
            

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
                archer.stun = true;
                archer.anims.play('TireurStun',true);
                setTimeout(function(){archer.stun = false}, dureStun);
                archer.setTint(0xff0000);
                //archer.tir = 0
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
        //nbFleche = 0;
    }
    function fioleMur (fiole,platforms){
        fiole.setVelocityX(0);
        fiole.disableBody(true, true);
        fiole.body.destroy();
        //lancer = false;
    }
    function flechePlayer (fleche,player){
        if (invincible == false){

            if (!gameOver){
                if (player.x < fleche.x){
                    player.anims.play("mortFleche", true);
                    player.setFlipX(false);
                }
                else if (player.x > fleche.x){
                    player.anims.play("mortFleche", true);
                    player.setFlipX(true);
                }
            }
            fleche.setVelocityX(0);
            fleche.disableBody(false, true);
            fleche.body.destroy();
            gameOver = true;
            mortFleche=true;
        }
        
    }
    function fiolePlayer (fiole,player){
        if (invincible == false){
            if (!gameOver){
                if (player.x < fiole.x){
                    player.anims.play("mortFiole", true);
                    player.setFlipX(false);
                }
                else if (player.x > fiole.x){
                    player.anims.play("mortFiole", true);
                    player.setFlipX(true);
                }
            }
            
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
    function chute (player,zoneMort){
        
        gameOver = true;
        player.body.destroy(true,true)
        player.disableBody(true, true);

    } 

    