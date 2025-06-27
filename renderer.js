class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.add.text(this.scale.width/ 2, 100, 'My Awesome Game', {
            fontSize: '50px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        const startGameButton = this.add.text(this.scale.width/ 2, 250, 'Start Game', {
            fontSize: '40px',
            fill: '#00ff00',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        startGameButton.on('pointerdown', () => {
            this.scene.start('GameScene'); 
        });

        const optionsButton = this.add.text(this.scale.width/ 2, 350, 'Options', {
            fontSize: '40px',
            fill: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        optionsButton.on('pointerdown', () => {
    this.scene.start('OptionsScene');
        });

        const exitButton = this.add.text(this.scale.width/ 2, 450, 'Exit Game', {
            fontSize: '40px',
            fill: '#ff0000',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();
      const ContactButton  = this.add.text(this.scale.width/2,350,'ContactUs',{
        fontSize:'45px',
        padding:{x:20,y:10},
        fill:"#562f78",
       backgroundColor:"#000000"
      }).setOrigin(.5)
      .setInteractive();
    ContactButton.on("pointerdown",()=>{


    })
exitButton.on('pointerdown', () => {
    try {
        const { remote } = require('electron');
        window.close();
        remote.app.quit();
    } catch (e) {
        window.open('');
        window.close();
    }
});

        [startGameButton, optionsButton, exitButton,ContactButton].forEach(button => {
            button.on('pointerover', () => button.setStyle({ fill: '#fff', backgroundColor: '#555' }));
            button.on('pointerout', () => {
                if (button === startGameButton) button.setStyle({ fill: '#00ff00', backgroundColor: '#000000' });
                else if (button === ContactButton) button.setStyle({ fill: '#562f78', backgroundColor: '#000000' });
                else if (button === optionsButton) button.setStyle({ fill: '#ffff00', backgroundColor: '#000000' });
                else if (button === exitButton) button.setStyle({ fill: '#ff0000', backgroundColor: '#000000' });
            });
        });
    }
}
class ContactScene extends Phaser.Scene{
    constructor(){
        super({key:"ContactScene"});
    }

}
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player;
        this.stars;
        this.bombs;
        this.platforms;
        this.cursors;
        this.score = 0;
        this.scoreText;
        this.bgMusic;
        this.jumpCount =0;
        this.spaceBar;
        this.level = 1;
this.levelText = null;
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('star', 'assets/star1.png');
        this.load.image('bomb', 'assets/bomb1.png');
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.audio('bgMusic', 'assets/turn.m4a');
    }

    create() { 
this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height * 10, 'sky').setOrigin(0);

this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
this.bgMusic.play();
this.registry.set('bgMusic', this.bgMusic);
     
this.platforms = this.physics.add.staticGroup();
let ground = this.add.rectangle(500, 584, 1000, 32, 0x00ff00);
this.physics.add.existing(ground, true); 
this.platforms.add(ground);


let plat1 = this.add.rectangle(600, 400, 100, 20, 0x00ff00);
this.physics.add.existing(plat1, true);
this.platforms.add(plat1);

let plat2 = this.add.rectangle(50, 250, 100, 20, 0x00ff00);
this.physics.add.existing(plat2, true);
this.platforms.add(plat2);

let plat3 = this.add.rectangle(750, 220, 100, 20, 0x00ff00);
this.physics.add.existing(plat3, true);
this.platforms.add(plat3);

let plat4 = this.add.rectangle(300, 100, 100, 20, 0x00ff00);
this.physics.add.existing(plat4, true);
this.platforms.add(plat4);

let plat5 = this.add.rectangle(1000, 220, 100, 20, 0x00ff00);
this.physics.add.existing(plat5, true);
this.platforms.add(plat5);
        
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
            repeat:-1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
this.levelText = this.add.text(650, 16, 'Level: 1', {
    fontSize: '24px',
    fill: '#000'
});
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

this.physics.world.setBounds(0, 0, 1000, 10000);
this.cameras.main.setBounds(0, 0, 1000, 10000);
this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, -200); 


this.stars.children.iterate((child, index) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    child.y -= index * 10; 
});
       
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        let speed = this.registry.get('gameSpeed') || 1;
      if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160 * speed);
    this.player.anims.play('left', true);
    
} else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160 * speed);
    this.player.anims.play('right', true);
} else {
    this.player.setVelocityX(0);
    this.player.anims.play('turn');
}
   if ((this.cursors.up.isDown || Phaser.Input.Keyboard.JustDown(this.spaceBar))) {
    if (this.player.body.touching.down) {
        this.player.setVelocityY(-330);
        this.jumpCount = 1;
    } else if (this.jumpCount < 2) {
        this.player.setVelocityY(-330); 
        this.jumpCount++;
    }
}
if (this.player.body.touching.down) {
    this.jumpCount = 0;
}
this.bg.tilePositionY = this.cameras.main.scrollY;
    }

collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(child => {
            child.enableBody(true, child.x, 0, true, true);
        });

this.level++;
this.levelText.setText('Level: ' + this.level);


for (let i = 0; i < 3; i++) {
    const refY = this.platforms.getChildren().reduce((minY, p) => Math.min(minY, p.y), this.player.y);
    const newY = refY - Phaser.Math.Between(200, 300);
    const newX = Phaser.Math.Between(150, 650); 

    if (newY > 0) {
        const plat = this.add.rectangle(newX, newY, 120, 20, 0x00ff00); 
        this.physics.add.existing(plat, true);
        this.platforms.add(plat);

        const star = this.stars.create(newX, newY - 50, 'star');
        star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }
}

if (this.level >= 5) {
    const bombCount = this.level - 4; 
    for (let i = 0; i < bombCount; i++) {
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(this.player.y - 300, this.player.y - 100); 

        const bomb = this.bombs.create(x, y, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}
    }
}
hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.bgMusic.stop();

    this.time.delayedCall(2000, () => {
        this.scene.stop('GameScene');
        this.scene.start('MenuScene');
        this.score = 0;
        this.level = 1;
    }, [], this);
}

}
class OptionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OptionsScene' });
    }

    create() {
        this.add.text(400, 50, 'Options', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);
        
   const bgMusic = this.registry.get('bgMusic');
        let volume = bgMusic ? bgMusic.volume : (this.registry.get('volume') || 0.5);

        const volumeText = this.add.text(400, 200, `Volume: ${Math.round(volume * 100)}%`, {
            fontSize: '32px',
            fill: '#00ff00',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        const plusBtn = this.add.text(500, 260, '+', {
            fontSize: '40px',
            fill: '#0f0'
        }).setOrigin(0.5).setInteractive();

        plusBtn.on('pointerdown', () => {
            if (bgMusic) {
                volume = Math.min(volume + 0.1, 1);
                bgMusic.setVolume(volume);
                volumeText.setText(`Volume: ${Math.round(volume * 100)}%`);
                this.registry.set('volume', volume);
            }
        });

        const minusBtn = this.add.text(300, 260, '-', {
            fontSize: '40px',
            fill: '#f00'
        }).setOrigin(0.5).setInteractive();

        minusBtn.on('pointerdown', () => {
            if (bgMusic) {
                volume = Math.max(volume - 0.1, 0);
                bgMusic.setVolume(volume);
                volumeText.setText(`Volume: ${Math.round(volume * 100)}%`);
                this.registry.set('volume', volume);
            }
        });
 let speed = this.registry.get('Speed') || 1;
        const speedText = this.add.text(400, 300, `gameSpeed: ${this.registry.get('gameSpeed') || 1}`, {
            fontSize: '32px',
            fill: '#ff0'
        }).setOrigin(0.5);

        const increaseSpeed = this.add.text(500, 350, '+', {
            fontSize: '40px',
           fill:"#0F0"
        }).setOrigin(0.5).setInteractive();

        const decreaseSpeed = this.add.text(300, 350, '-', {
            fontSize: '40px',
            color:"red"
        }).setOrigin(0.5).setInteractive();

        increaseSpeed.on('pointerdown', () => {
            speed = Math.min(speed + 0.25, 2);
            this.registry.set('gameSpeed', speed);
            speedText.setText(`gameSpeed: ${speed}`);
        });

       
        decreaseSpeed.on('pointerdown', () => {
            speed = Math.max(speed - 0.25, 0.25);
            this.registry.set('gameSpeed', speed);
            speedText.setText(`gameSpeed: ${speed}`);
        });

        const backButton = this.add.text(400, 500, '← Back to Menu', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#444',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

const gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        }
    },
    scene: [MenuScene, GameScene, OptionsScene,ContactScene]
    
};

const gameInstance = new Phaser.Game(gameConfig);