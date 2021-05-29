class Soldat extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, "soldat");
        config.scene.add.existing(this);
        var enemieStun;

        this.setInteractive();
        this.on('pointerdown',this.clickMe,this);
    }

    /*preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        this.rotation += 0.01;
    }*/
    clickMe()
    {
    	this.alpha-=.2;
    }
    chope(player, enemie){
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

}