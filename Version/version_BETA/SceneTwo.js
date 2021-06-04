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

class SceneTwo extends Phaser.Scene{
    constructor(){
        super("SceneTwo");
    }
    init(data){
        
    }
    preload(){
        this.load.image('parallaxe3','assets/parallaxe/parallaxe_3.png');
        this.load.image('parallaxe2','assets/parallaxe/parallaxe_2.png');
        this.load.image('parallaxe1','assets/parallaxe/parallaxe_1.png');

        this.load.spritesheet('mia_anime', 'assets/spritesheet/mia_anime.png', { frameWidth: 125, frameHeight: 150 });
        this.load.spritesheet('mia_pose', 'assets/spritesheet/mia_pose.png', { frameWidth: 99/2, frameHeight: 150 });
        this.load.spritesheet('soldat', 'assets/spritesheet/mia_pose.png', { frameWidth: 99/2, frameHeight: 150 });
        this.load.spritesheet('mia_mort', 'assets/spritesheet/mia_mort.png', { frameWidth: 210, frameHeight: 150 });
        this.load.spritesheet('colosse', 'assets/spritesheet/colosse.png', { frameWidth: 116/2, frameHeight: 171 });
        this.load.spritesheet('archer', 'assets/spritesheet/archer.png', { frameWidth: 99/2, frameHeight: 150 });
        this.load.spritesheet('chimiste', 'assets/spritesheet/chimiste.png', { frameWidth: 99/2, frameHeight: 150 });
        this.load.image('flèche','assets/spritesheet/fleche.png');

        this.load.image('fumi','assets/FX/teste_fumi.png');
        this.load.image('fleche','assets/spritesheet/fleche.png');
        this.load.image('fiole','assets/item/batterie.png');
        
        this.load.image('tiles','assets/tiles/platform.png');
        this.load.tilemapTiledJSON('map','assets/tiles/level.json'); 
    }
    create(){
        //this.add.image(4800/2, 1760/2, 'parallaxe3').setScrollFactor(0.1);
        //this.add.image(4800/2, 1760/2, 'parallaxe2').setScrollFactor(0.5);
        //this.add.image(4800/2, 1760/2, 'parallaxe1').setScrollFactor(1.8).setDepth(2);
        
        //afficheDroite = this.add.text(10, 50, 'SAUT DROITE : ' + sautDroite, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheInvincible = this.add.text(10, 50, 'Invincible : ' + compteurInvincible, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheCompteur = this.add.text(10, 150, 'fe ' + compteur, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheGauche = this.add.text(10, 100, 'SAUT GAUCHE : ' + sautGauche, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        afficheAttaque = this.add.text(10, 200, 'ATTAQUE : ' + attaque, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);
        
        afficheAttrape = this.add.text(10, 120, 'attrape : ' + attrape, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);

        afficheFumi = this.add.text(896/2, 10, 'Nb fumigène : ' + nbFumigene, { fontSize: '32px', fill: '#48E14E' }).setScrollFactor(0).setDepth(1);

        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('platforms','tiles');
        
        
        platforms = map.createLayer('roche',tileset, 0, 0);
        
        platforms.setCollisionByExclusion(-1,true)
        
        player = this.physics.add.sprite(500, 1400, 'mia_pose');
        player.body.setGravityY(gravite_joueur)
    
        player.setBounce(0.01);
        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, platforms);
        

      /////////////////////////////   
     // ENEMIES //////////////////
    /////////////////////////////
        enemieObjects = map.getObjectLayer('enemie').objects;
        this.soldat = this.physics.add.group({
            allowGravity: true
        });
        
        for (const enemie of enemieObjects) {
            let soldat=new 
            Soldat({scene:this,x:enemie.x,y:enemie.y});
        }
        this.physics.add.collider(this.soldat, platforms);
        //this.physics.add.overlap(player, this.enemies, chope, null, this);     
    
        
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
            /*if (this.enemies.y <= player.y+100 && this.enemies.y >= player.y-100 && this.enemies.x <= player.x+100 && this.enemies.x >= player.x-100){
                attrape = false;
                enemieStun = true;
                //this.enemies.setTint(0xff0000);
                afficheAttrape.setText('Attrape : ' + attrape);
                 
            }*/
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
           /* if (this.enemies.y <= player.y+100 && this.enemies.y >= player.y-100 && this.enemies.x <= player.x+100 && this.enemies.x >= player.x-100){
                attrape = false;
                enemieStun = true;
                //this.enemies.setTint(0xff0000); 
                afficheAttrape.setText('Attrape : ' + attrape);
            }*/
        }      
        
    }
        
    }