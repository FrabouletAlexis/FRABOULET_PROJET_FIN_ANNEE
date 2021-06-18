class LettreDebut extends Phaser.Scene{

    constructor(){
        super("LettreDebut");
    }

    init(data){
        
    }
    preload(){
        this.load.image('ecranTitre','assets/menu/ecran_titre.png');
        this.load.spritesheet('boutonJouer','assets/menu/bouton_jouer.png', { frameWidth: 260, frameHeight: 108 });
        this.load.spritesheet('bontonCommande','assets/menu/Bouton_commande.png', { frameWidth: 208, frameHeight: 65 });
        this.load.spritesheet('bontonSuite','assets/menu/Bouton_suite.png', { frameWidth: 75, frameHeight: 45 });
        this.load.image('panneauCommande','assets/menu/panneau_commande.png');
        
        this.load.image('parallaxe3','assets/parallaxe/parallaxe_3.png');
        this.load.image('parallaxe2','assets/parallaxe/parallaxe_2.png');
        this.load.image('parallaxe1','assets/parallaxe/parallaxe_1.png');

        this.load.audio('audio_fond', 'assets/audio/music_fond.ogg')
        this.load.audio('bruit_coup', 'assets/audio/Bruit_coup.ogg')

        this.load.spritesheet('boutonPause','assets/menu/Bouton_pause.png', { frameWidth: 55, frameHeight: 60 });
        this.load.image('menuPause','assets/menu/Panneau_pause.png');

        this.load.image('texteChope','assets/tuto/texte_chope.png');
        this.load.image('texteDebut','assets/menu/Texte_debut.png');

        this.load.image('CoffreGris','assets/menu/coffre/Coffre_gris.png');
        this.load.image('CoffreVert','assets/menu/coffre/coffre_vert_menu.png');
        this.load.image('CoffreBleu','assets/menu/coffre/coffre_bleu_menu.png');
        this.load.image('CoffreMarron','assets/menu/coffre/coffre_marron_menu.png');
        this.load.image('CoffreRouge','assets/menu/coffre/coffre_rouge_menu.png');

        this.load.spritesheet('boutonRetour','assets/menu/bouton_retour.png', { frameWidth: 208, frameHeight: 65 });

        this.load.spritesheet('vinetta', 'assets/spritesheet/spritesheet_Vinetta.png', { frameWidth: 160, frameHeight: 150 });
        this.load.spritesheet('vinetta_Mort_fiole', 'assets/spritesheet/spritesheet_Vinetta_Mort_fiole.png', { frameWidth: 235, frameHeight: 150 });
        this.load.spritesheet('soldat', 'assets/spritesheet/spritesheet_soldat.png', { frameWidth: 90, frameHeight: 160 });
        this.load.spritesheet('colosse', 'assets/spritesheet/spritesheet_colosse.png', { frameWidth: 120, frameHeight: 160 });
        this.load.spritesheet('archer', 'assets/spritesheet/spritesheet_tireur.png', { frameWidth: 87, frameHeight: 150 });
        this.load.spritesheet('chimiste', 'assets/spritesheet/spritesheet_chimiste.png', { frameWidth: 90, frameHeight: 150 });

        this.load.spritesheet('explosionFumi', 'assets/FX/explosion_fumi.png', { frameWidth: 380, frameHeight: 400 });
        this.load.image('fleche','assets/spritesheet/fleche.png');
        this.load.image('bombe','assets/item/Bombe_Loot.png');
        this.load.image('fiole','assets/item/Fiole.png');
        this.load.image('clef','assets/item/clef.png');

        this.load.image('tresorVert','assets/item/Coffre_Vert.png');
        this.load.image('tresorBleu','assets/item/Coffre_Bleu.png');
        this.load.image('tresorMarron','assets/item/Coffre_Marron.png');
        this.load.image('tresorRouge','assets/item/Coffre_Rouge.png');

        this.load.image('porte','assets/item/Porte_deverouille.png');
        
        this.load.image('barreFumi0','assets/barre_fumi/Barre_fumi_0.png');
        this.load.image('barreFumi1','assets/barre_fumi/Barre_fumi_1.png');
        this.load.image('barreFumi2','assets/barre_fumi/Barre_fumi_2.png');
        this.load.image('barreFumi3','assets/barre_fumi/Barre_fumi_3.png');
        this.load.image('barreFumi4','assets/barre_fumi/Barre_fumi_4.png');
        this.load.image('barreFumi5','assets/barre_fumi/Barre_fumi_5.png');
             
    }
    create(){

        this.add.image(896/2, 448/2, 'texteDebut')
        buttonSuite = this.add.sprite(850, 420, 'bontonSuite').setScrollFactor(0).setInteractive({ cursor: 'pointer' });

        this.anims.create({
            key: 'SuiteSurbrillance',
            frames: [ { key: 'bontonSuite', frame: 1 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'Suite',
            frames: [ { key: 'bontonSuite', frame: 0 } ],
            frameRate: 20
        })

        buttonSuite.on('pointerover', function (event) {
            
            buttonSuite.anims.play('SuiteSurbrillance',true);
    
            });
            buttonSuite.on('pointerout', function (event) {
    
                buttonSuite.anims.play('Suite',true);
    
            });
            buttonSuite.on('pointerdown', function(){
    
                this.cameras.main.fadeOut(1000, 0, 0, 0)
    
            }, this)

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('LevelPart1')
            })

            this.cameras.main.fadeIn(2000); 

    }
    update(){
    }

}