class EcranCommande extends Phaser.Scene{

    constructor(){
        super("EcranCommande");
    }

    init(data){
        
    }
    preload(){
        
         
    }
    create(){

        this.add.image(896/2, 448/2, 'ecranTitre')

        panneauCommande = this.add.image(896/2, 190, 'panneauCommande').setDepth(1);

        buttonRetour = this.add.sprite(250,400,'boutonRetour').setScrollFactor(0).setInteractive({ cursor: 'pointer' });

        this.anims.create({
            key: 'RetourSurbrillance',
            frames: [ { key: 'boutonRetour', frame: 1 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'Retour',
            frames: [ { key: 'boutonRetour', frame: 0 } ],
            frameRate: 20
        })

            cursors = this.input.keyboard.createCursorKeys();
            cursors2 = this.input.keyboard.addKeys('Z,Q,S,D,SPACE,E,SHIFT,ECHAP');


    }
    update(){
        if (cursors2.ECHAP.isDown){
            this.scene.start("EcranTitre")
        }
        /////// Button Commande ///////////////////

        buttonRetour.on('pointerover', function (event) {

            buttonRetour.anims.play('RetourSurbrillance',true);

        });
        buttonRetour.on('pointerout', function (event) {

            buttonRetour.anims.play('Retour',true);

        });

        buttonRetour.on('pointerdown', function(){

            this.scene.start("EcranTitre");

        }, this);
        
    }
}