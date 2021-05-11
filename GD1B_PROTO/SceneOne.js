var cursors;
var cursors2;
var paddle;
var padConnected;
var onGround ;

var onGround;
var onLeft;
var onRight;

var platforms;
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
var compteurMax = 60;
var compteur = compteurMax;
var dureStun = 10000;

var vitesseFleche = 400;
var fleche;
var flecheDestroy = true;
var nbFleche = 0;

var archerX;
var archerY;
var colosseX;
var colosseY;

//vie
var pv_max = 3;
var pv = pv_max;
var coeur;
var pvText;
var timedEvent;

// joueur/////////////////
var sautTete = false;
var nbFumigene = 3;
var fumigene = true;
var attaque = false;
var vitesse_joueur = 300;
var vitesse_saut = 600;
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
        
        this.load.spritesheet('mia_anime', 'assets/spritesheet/mia_anime.png', { frameWidth: 125, frameHeight: 150 });
        this.load.spritesheet('mia_pose', 'assets/spritesheet/mia_pose.png', { frameWidth: 99/2, frameHeight: 150 });
        this.load.spritesheet('mia_mort', 'assets/spritesheet/mia_mort.png', { frameWidth: 210, frameHeight: 150 });
        this.load.spritesheet('colosse', 'assets/spritesheet/colosse.png', { frameWidth: 116/2, frameHeight: 171 });
        this.load.spritesheet('archer', 'assets/spritesheet/archer.png', { frameWidth: 99/2, frameHeight: 150 });
        this.load.image('flèche','assets/spritesheet/fleche.png');

        this.load.image('fumi','assets/FX/teste_fumi.png');
        this.load.image('fleche','assets/spritesheet/fleche.png');
        
        this.load.image('tiles','assets/tiles/platform.png');
        this.load.tilemapTiledJSON('map','assets/tiles/level.json'); 
    }
    create(){
        //afficheDroite = this.add.text(10, 50, 'SAUT DROITE : ' + sautDroite, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheInvincible = this.add.text(10, 50, 'Invincible : ' + compteurInvincible, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheCompteur = this.add.text(10, 150, 'fe ' + compteur, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheGauche = this.add.text(10, 100, 'SAUT GAUCHE : ' + sautGauche, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheAttaque = this.add.text(10, 200, 'ATTAQUE : ' + attaque, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        
        afficheAttrape = this.add.text(10, 120, 'attrape : ' + attrape, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);

        afficheFumi = this.add.text(896/2, 10, 'Nb fumigène : ' + nbFumigene, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);

        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('platforms','tiles');
        
        map.createLayer('grotte',tileset, 0, 0);
        platforms = map.createLayer('roche',tileset, 0, 0);
        
        platforms.setCollisionByExclusion(-1,true)
        
        player = this.physics.add.sprite(500, 2800, 'mia_pose');
        player.body.setGravityY(gravite_joueur)
    
        player.setBounce(0.01);
        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, platforms);
        
      /////////////////////////////   
     // ANIME JOUEUR /////////////
    /////////////////////////////
    
        /*this.anims.create({
            key: 'course',
            frames: this.anims.generateFrameNumbers('mia_anime', { start: 0, end: 15 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'neutre',
            frames: [ { key: 'mia_pose', frame: 2 } ],
            frameRate: 10,
        });

        this.anims.create({
            key: 'saut',
            frames: this.anims.generateFrameNumbers('mia_anime', { start: 16, end: 18 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'escalade',
            frames: this.anims.generateFrameNumbers('mia_anime', { start: 19, end: 32 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'escalade_pause',
            frames: [ { key: 'mia_anime', frame: 21 } ],
            frameRate: 10,
        });

        this.anims.create({
            key: 'attaque',
            frames: this.anims.generateFrameNumbers('mia_anime', { start: 45, end: 47 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'degat',
            frames: this.anims.generateFrameNumbers('mia_anime', { start: 48, end: 51 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
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

        
        if (nbFleche == 0 && archerStun == false){

            if (player.x < archerX && nbFleche == 0){
                fleche = this.physics.add.sprite(archerX+20,archerY,'fleche');
                fleche.body.allowGravity = false;
                //fleche.setCollideWorldBounds(true);
                nbFleche = 1;
                //setTimeout(function(){flecheDestroy = false}, 500);
                fleche.setVelocityX(-vitesseFleche);
            }
            else {
                fleche = this.physics.add.sprite(archerX+20,archerY,'fleche');
                fleche.body.allowGravity = false;
                //fleche.setCollideWorldBounds(true);
                nbFleche = 1;
                //setTimeout(function(){flecheDestroy = false}, 500);
                fleche.setVelocityX(vitesseFleche);
            }
            
        }

        this.physics.add.collider(fleche, platforms, flecheMur,null, this);
        //this.physics.add.overlap(fleche, player,flechePlayer,null, this);
        

        if(invincible == true){
            player.setTint(0x0f3434);
            compteurInvincible-- ;
            //afficheInvincible.setText('Invincible : ' + compteurInvincible);
            if(compteurInvincible == 0){
                compteurInvincible = restCompteurInvincible;
                player.setTint(0xffffff);
                invincible = false ;
            }
           // afficheInvincible.setText('Invincible : ' + compteurInvincible);
        }

        if (gameOver == true){
            gameOvertext = this.add.text(896/2, 448/2, 'GAME OVER', { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        }

        if (animeFumerFX == true){
            compteurAnimeFumerFX-- ;
            afficheInvincible.setText('anime : ' + compteurAnimeFumerFX);

            if(compteurAnimeFumerFX == 0){
                compteurAnimeFumerFX = restAnimeFumerFX;
                fumerFX.destroy();
                animeFumerFX = false
                
            }
            afficheInvincible.setText('anime : ' + compteurAnimeFumerFX);
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
            afficheAttaque.setText('attaque: ' + attaque);
            //afficheDroite.setText('SAUT DROITE : ' + sautDroite);
        }
        if (onLeft){
            sautDroite = false;
            //afficheDroite.setText('SAUT DROITE : ' + sautDroite);
        }
        if (onRight){
            sautGauche = false;
            afficheGauche.setText('SAUT GAUCHE : ' + sautGauche);
        }
      /////////////////////////////   
     // CONTROLE CLAVIER /////////
    ///////////////////////////// 
    
        if ((cursors.left.isDown && sautGauche == false || cursors2.Q.isDown)&& attrape == false && attrapeColosse == false)
        {   
            if (gameOver == false){
                
                player.setVelocityX(-vitesse_joueur*speed);
                
            }           
            sautGauche = false;
        }
        
        else if ((cursors.right.isDown && sautDroite == false || cursors2.D.isDown)&& attrape == false && attrapeColosse == false)
        {
            if (gameOver == false){
                player.setVelocityX(vitesse_joueur*speed);
            }
            sautDroite = false;
        }
        
        else if (((cursors.down.isDown || cursors2.S.isDown)&& attrape == false && attrapeColosse == false && onGround == false && sautTete == false) && gameOver == false){//direction vers le bas /////////////////////
            afficheAttaque.setText('attaque: ' + attaque);
            player.setVelocityY(vitesseAttaque);
            attaque = true;
        }

        else //position neutre /////////////////////
        {            
            if ( sautDroite == false && sautGauche == false){
                player.setVelocityX(0);
            }
        }

                //saut /////////////////////
        if (((cursors.up.isDown && onGround || cursors2.Z.isDown && onGround || cursors2.SPACE.isDown && onGround) && attrape == false && attrapeColosse == false) && gameOver == false )
        {
            player.setVelocityY(-vitesse_saut);
            doubleJump = false;

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
            afficheGauche.setText('SAUT GAUCHE : ' + sautGauche);
            //afficheDroite.setText('SAUT DROITE : ' + sautDroite);
            
        }
        
        if (onRight && onGround == false && sautMur) {
            sautGauche = false;
            sautDroite = true;
            afficheGauche.setText('SAUT GAUCHE : ' + sautGauche);
            //afficheDroite.setText('SAUT DROITE : ' + sautDroite);
            
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

        if (cursors.right.isDown && dash && jumpCD && fumigene){
            afficheFumi.setText('Nb fumigène : ' + nbFumigene);
            afficheAttrape.setText('Attrape : ' + attrape);
            nbFumigene --;
            jumpCD = false;
            var jumpDuration = true;
            speed = 2;
            afficheFumi.setText('Nb fumigène : ' + nbFumigene);
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
                afficheAttrape.setText('Attrape : ' + attrape);
                 
            }
        }
        else if (cursors.left.isDown && dash && jumpCD && fumigene){
            
            afficheAttrape.setText('Attrape : ' + attrape);
            nbFumigene = nbFumigene-1
            jumpCD = false;
            var jumpDuration = true;
            speed = 2;
            afficheFumi.setText('Nb fumigène : ' + nbFumigene);
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
                afficheAttrape.setText('Attrape : ' + attrape);
            }
        }      
        


      /////////////////////////////   
     // COMPORTEMENT ENNEMIE /////
    /////////////////////////////
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

        if (enemie.direction === 'RIGHT') {
            enemie.setVelocityX(vitesseSoldat);
            enemie.setFlipX(true);
            if (enemieStun){
                enemie.setVelocityX(0);
            }
            if (attrape || enemieStun){
                enemie.setVelocityX(0); 
            }
            
        } else {
            enemie.setVelocityX(-vitesseSoldat);
            enemie.setFlipX(false);
            if (attrape || enemieStun){
                enemie.setVelocityX(0); 
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
        if (attaque && attrape == false && onGround == false){
            setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
            enemieStun = true;
            setTimeout(function(){enemieStun = false}, dureStun);
            enemie.setTint(0xff0000);
        }
        else if (enemieStun == false && gameOver == false && invincible == false && attaque == false){
            attrape = true;
            compteur --;
            afficheCompteur.setText('Fe : ' + compteur);

            if ( cursors2.E.isDown && nbFumigene >0 && compteur >0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                attrape = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);
                                   
                
                afficheFumi.setText('Nb fumigène : ' + nbFumigene);
                afficheCompteur.setText('Fe : ' + compteur);

                setTimeout(function(){enemie.setTint(0xffffff);}, dureStun);
                enemieStun = true;
                setTimeout(function(){enemieStun = false}, dureStun);
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
            afficheCompteur.setText('Fe : ' + compteur);

            if ( cursors2.E.isDown && nbFumigene >0 && compteur >0){
                fumerFX = this.add.sprite(player.x,player.y, 'fumi');
                animeFumerFX = true;
                
                nbFumigene --;
                attrapeColosse = false;
                compteur = compteurMax;
                invincible = true;
                
                //setTimeout(function(){invincible = true;}, 60);
                //player.setTint(0xff0000);
                                   
                
                afficheFumi.setText('Nb fumigène : ' + nbFumigene);
                afficheCompteur.setText('Fe : ' + compteur);

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
    function chopeAcher (player, archer){
        if (attaque && onGround == false){
            setTimeout(function(){archer.setTint(0xffffff);}, dureStun);
            archerStun = true;
            setTimeout(function(){archerStun = false}, dureStun);
            archer.setTint(0xff0000);
        }
        
    }
    function flecheMur (fleche,platforms){
        fleche.setVelocityX(0);
        fleche.disableBody(true, true);
        fleche.body.destroy();
        nbFleche = 0;
    }
    function flechePlayer (fleche,player){
        if (invincible == false){
            fleche.setVelocityX(0);
            fleche.disableBody(true, true);
            fleche.body.destroy();
            gameOver = true;
        }
        
    }