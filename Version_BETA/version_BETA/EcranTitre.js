var imageCharge
class EcranTitre extends Phaser.Scene{

    constructor(){
        super("EcranTitre");
    }

    init(data){
        
    }
    preload(){

        this.load.image('ecranTitre','assets/menu/ecran_titre.png');
        this.load.spritesheet('boutonJouer','assets/menu/bouton_jouer.png', { frameWidth: 260, frameHeight: 108 });
        this.load.spritesheet('bontonCommande','assets/menu/Bouton_commande.png', { frameWidth: 208, frameHeight: 65 });
        this.load.image('ecranTitre','assets/menu/ecran_titre.png');
        this.load.image('panneauCommande','assets/menu/panneau_commande.png');
        this.load.spritesheet('boutonRetour','assets/menu/bouton_retour.png', { frameWidth: 208, frameHeight: 65 });
        this.load.image('parallaxe3','assets/parallaxe/parallaxe_3.png');
        this.load.image('parallaxe2','assets/parallaxe/parallaxe_2.png');
        this.load.image('parallaxe1','assets/parallaxe/parallaxe_1.png');

        this.load.spritesheet('vinetta', 'assets/spritesheet/spritesheet_Vinetta.png', { frameWidth: 160, frameHeight: 150 });
        //this.load.spritesheet('vinetta_neutre', 'assets/spritesheet/spritesheet_Vinetta_neutre.png', { frameWidth: 84, frameHeight: 150 });
        //this.load.spritesheet('mia_mort', 'assets/spritesheet/mia_mort.png', { frameWidth: 210, frameHeight: 150 });
        this.load.spritesheet('soldat', 'assets/spritesheet/spritesheet_soldat.png', { frameWidth: 90, frameHeight: 150 });
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
        this.load.tilemapTiledJSON('map','assets/tiles/level.json');
        this.load.image('tiles','assets/tiles/tile_32.png');
        this.load.tilemapTiledJSON('map','assets/tiles/level_teste.json');
             
    }
    create(){

        this.add.image(896/2, 448/2, 'ecranTitre')
            
        buttonJouer = this.add.sprite(625, 285, 'boutonJouer').setScrollFactor(0).setInteractive({ cursor: 'pointer' });

        buttonCommande = this.add.sprite(625,385, 'bontonCommande').setScrollFactor(0).setInteractive({ cursor: 'pointer' });
        
        this.anims.create({
            key: 'CommandeSurbrillance',
            frames: [ { key: 'bontonCommande', frame: 1 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'Commande',
            frames: [ { key: 'bontonCommande', frame: 0 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'JouerSurbrillance',
            frames: [ { key: 'boutonJouer', frame: 1 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'Jouer',
            frames: [ { key: 'boutonJouer', frame: 0 } ],
            frameRate: 20
        })

            cursors = this.input.keyboard.createCursorKeys();
            cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE,E,SHIFT,ECHAP');
            /////// Button Commande ///////////////////

            buttonCommande.on('pointerover', function (event) {

                buttonCommande.anims.play('CommandeSurbrillance',true);
    
            });
            buttonCommande.on('pointerout', function (event) {
    
                buttonCommande.anims.play('Commande',true);
    
            });
    
            buttonCommande.on('pointerdown', function(){
    
                this.scene.start("EcranCommande");
    
            }, this);
    
        /////// Button Jouer ///////////////////
    
        buttonJouer.on('pointerover', function (event) {
    
            buttonJouer.anims.play('JouerSurbrillance',true);
    
            });
            buttonJouer.on('pointerout', function (event) {
    
                buttonJouer.anims.play('Jouer',true);
    
            });
    
            buttonJouer.on('pointerdown', function(){
    
                //this.scene.start("LevelTeste");
                this.scene.start("SceneOne");
    
            }, this)
        

    }
    update(){}

}