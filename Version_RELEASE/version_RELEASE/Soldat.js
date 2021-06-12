class Soldat extends Phaser.GameObjects.Sprite {

    /*constructor(config) {
        super(config.scene, config.x, config.y, "soldat");
        config.scene.add.existing(this);
        this.soldatStun;
        

        this.setInteractive();
        this.on('pointerdown',this.clickMe,this);
    }*/
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.scene = scene;
        this.soldat;
        this.soldatStun;

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
    deplacementSimple(){
        this.body.setVelocityX(-300)
    }
    /*deplacement(){
        if (this.body.blocked.right) {
            this.direction = 'LEFT';
            
        }

        if (this.body.blocked.left) {
            this.direction = 'RIGHT';
        }

        if(this.x - player.x < 400 && this.x - player.x > 0 && enemie.y - player.y < 10 && this.y - player.y > -10 && !attrape && !enemieStun && !invincible && enemie.direction === 'LEFT') {

            this.setVelocityX(-vitesseSoldatCourse);
            this.anims.play("soldatCourse", true);
            this.setFlipX(false);

        }
        else if (player.x - this.x < 400 && player.x - this.x > 0 && this.y - player.y < 10 && this.y - player.y > -10 && !attrape && !enemieStun && !invincible && enemie.direction === 'RIGHT'){
            this.setVelocityX(vitesseSoldatCourse);
            this.anims.play("soldatCourse", true);
            this.setFlipX(true);
        }
        else if (enemie.direction === 'RIGHT') {

            if (attrape){
                enemie.setFlipX(true);
                enemie.setVelocityX(0); 
            }
            else if (enemieStun){
                enemie.anims.play('soldatStunAtkBoucle', true);
                enemie.setFlipX(true);
                enemie.setVelocityX(0);
            }
            else if (enemieStunFumi){
                enemie.anims.play('soldatStunFumiBoucle', true);
                enemie.setFlipX(true);
                enemie.setVelocityX(0);
            }
            else {
                enemie.setVelocityX(vitesseSoldat);
                enemie.anims.play("soldatMarche", true);
                enemie.setFlipX(true);
            }     
        } 
        else {
            
            if (attrape){
                enemie.setFlipX(false);
                enemie.setVelocityX(0); 
            }
            else if (enemieStun && enemie.body.blocked.down) {
                enemie.anims.play('soldatStunAtkBoucle', true);
                enemie.setFlipX(false);
                enemie.setVelocityX(0);
            }
            else {
                enemie.setVelocityX(-vitesseSoldat);
                enemie.anims.play("soldatMarche", true);
                enemie.setFlipX(false);
            }
        }
    }*/

}