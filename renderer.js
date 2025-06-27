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

        const optionsButton = this.add.text(this.scale.width/ 2, 325, 'Options', {
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

        const exitButton = this.add.text(this.scale.width/ 2, 480, 'Exit Game', {
            fontSize: '40px',
            fill: '#ff0000',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();
      const ContactButton  = this.add.text(this.scale.width/2,400,'ContactUs',{
        fontSize:'45px',
        padding:{x:20,y:10},
        fill:"#562f78",
       backgroundColor:"#000000"
      }).setOrigin(.5)
      .setInteractive();
    ContactButton.on("pointerdown",()=>{
   this.scene.start('ContactScene');

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
    preload() {
        this.load.image('me', 'assets/me.png');
        this.load.image('friend', 'assets/friend.png');
        this.load.image('gmail', 'assets/mail.png');
        this.load.image('linkedin', 'assets/linkedin.png');
        this.load.image('github', 'assets/github.png');
    }

    create() {
        this.add.text(700, 50, "Contact Us", {
            fontSize: "48px",
            fill: "#ffffff"
        }).setOrigin(0.5);

    this.add.text(600,150,"Developer",{
        fill:"#FFFF",
        fontSize:"25px"
      })
        this.add.image(670, 280, 'me').setDisplaySize(150, 150);
        this.add.text(660, 450, "ziadbobo78@gmail.com", {
            fontSize: "20px",
            fill: "#ffffff"
        }).setOrigin(0.5)
        ;


   this.add.image(620, 400, 'gmail').setDisplaySize(32, 32).setInteractive()
            .on('pointerdown', () => window.open("mailto:ziadbobo78@gmail.com", "_blank"));
      this.add.image(670, 400, 'linkedin').setDisplaySize(32, 32).setInteractive().on('pointerdown', () => {
    window.open('https://www.linkedin.com/in/ziad-mahmoud-mohammed/','_blank');
});
    this.add.image(720, 400, 'github').setDisplaySize(32, 32).setInteractive().on('pointerdown', () => {
    window.open('https://github.com/ZiadMahmoudas','_blank');
});
    
      this.add.text(700, 500, '← Back', {
    fontSize: '28px',
    fill: '#fff',
    backgroundColor: '#444',
    padding: { x: 20, y: 10 }
}).setOrigin(0.5).setInteractive().on('pointerdown', () => {
    const from = this.registry.get('fromScene');
    if (from === 'MenuInsideGame') {
        this.scene.stop('OptionsScene');
        this.scene.resume('GameScene');
        this.scene.launch('MenuInsideGame');
    } else {
        this.scene.start('MenuScene');
    }
});
     
    }
    }
   
class OptionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OptionsScene' });
    }
   preload() {
        this.load.audio('bgMusic', '/assets/turn.m4a');
    }
    create() {
        this.add.text(700, 50, 'Options', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        let bgMusic = this.registry.get('bgMusic');
        let volume = this.registry.get('volume') || 0.5;

        if (!bgMusic) {
            bgMusic = this.sound.add('bgMusic', { loop: true, volume });
            bgMusic.play();
            this.registry.set('bgMusic', bgMusic);
        }

        const volumeText = this.add.text(700, 200, `Volume: ${Math.round(volume * 100)}%`, {
            fontSize: '32px',
            fill: '#00ff00',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        const plusBtn = this.add.text(770, 260, '+', {
            fontSize: '40px',
            fill: '#0f0'
        }).setOrigin(0.5).setInteractive();

        plusBtn.on('pointerdown', () => {
            volume = Math.min(volume + 0.1, 1);
            bgMusic.setVolume(volume);
            volumeText.setText(`Volume: ${Math.round(volume * 100)}%`);
            this.registry.set('volume', volume);
        });

        const minusBtn = this.add.text(600, 260, '-', {
            fontSize: '40px',
            fill: '#f00'
        }).setOrigin(0.5).setInteractive();

        minusBtn.on('pointerdown', () => {
            volume = Math.max(volume - 0.1, 0);
            bgMusic.setVolume(volume);
            volumeText.setText(`Volume: ${Math.round(volume * 100)}%`);
            this.registry.set('volume', volume);
        });

        let speed = this.registry.get('gameSpeed') || 1;
        const speedText = this.add.text(700, 330, `Speed: ${speed}`, {
            fontSize: '28px',
            fill: '#ffff00'
        }).setOrigin(0.5);

        this.add.text(770, 380, '+', { fontSize: '36px', fill: '#0f0' })
            .setOrigin(0.5).setInteractive().on('pointerdown', () => {
                speed = Math.min(speed + 0.25, 2);
                this.registry.set('gameSpeed', speed);
                speedText.setText(`Speed: ${speed}`);
            });

        this.add.text(600, 380, '-', { fontSize: '36px', fill: '#f00' })
            .setOrigin(0.5).setInteractive().on('pointerdown', () => {
                speed = Math.max(speed - 0.25, 0.25);
                this.registry.set('gameSpeed', speed);
                speedText.setText(`Speed: ${speed}`);
            });
      this.add.text(700, 500, '← Back', {
    fontSize: '28px',
    fill: '#fff',
    backgroundColor: '#444',
    padding: { x: 20, y: 10 }
}).setOrigin(0.5).setInteractive().on('pointerdown', () => {
    const from = this.registry.get('fromScene');
    if (from === 'MenuInsideGame') {
        this.scene.stop('OptionsScene');
        this.scene.resume('GameScene');
        this.scene.launch('MenuInsideGame');
    } else {
        this.scene.start('MenuScene');
    }
});

    }
}

class MenuInsideGame extends Phaser.Scene{
    constructor(){
    super({key:'MenuInsideGame'})
}
        
    
  create(){
       this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.7 // نسبة شفافية
        ).setOrigin(0.5);

        // إضافة عنوان للقائمة
        this.add.text(this.scale.width / 2, 100, 'Game Paused', {
            fontSize: '60px',
            fill: '#ffffff',
            backgroundColor: '#1a1a1a',
            padding: { x: 30, y: 15 }
        }).setOrigin(0.5);

        const resumeGameButton = this.add.text(this.scale.width / 2, 250, 'Resume Game', {
            fontSize: '45px',
            fill: '#00ff00',
            backgroundColor: '#000000',
            padding: { x: 25, y: 12 }
        })
        .setOrigin(0.5)
        .setInteractive();

        resumeGameButton.on('pointerdown', () => {
          const gameScene = this.scene.get('GameScene');
if (gameScene && gameScene.physics.world.isPaused) {
    gameScene.physics.resume(); // شغّل الفيزياء
}
            if (gameScene && gameScene.bgMusic && !gameScene.bgMusic.isPlaying) {
                gameScene.bgMusic.resume();
            }
            this.scene.stop('MenuInsideGame'); // إغلاق مشهد القائمة الداخلية
        });

        // ... (باقي أزرار Options و Exit Game)

        // **زر Exit Game في القائمة الداخلية يجب أن يعود للقائمة الرئيسية**
        const exitButton = this.add.text(this.scale.width / 2, 480, 'Exit Game', {
            fontSize: '40px',
            fill: '#ff0000',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        exitButton.on('pointerdown', () => {
            // إيقاف كل المشاهد الحالية (MenuInsideGame و GameScene)
            this.scene.stop('MenuInsideGame');
            this.scene.stop('GameScene');
            // استئناف أو بدء MenuScene
            this.scene.start('MenuScene');

            // تأكد من إيقاف موسيقى الخلفية للعبة لو كانت لا تزال تعمل
            const gameScene = this.scene.get('GameScene');
            if (gameScene && gameScene.bgMusic && gameScene.bgMusic.isPlaying) {
                gameScene.bgMusic.stop();
            }
        });

        // **تعديل زر Options لينقل صح لمشهد OptionsScene**
        const optionsButton = this.add.text(this.scale.width / 2, 360, 'Options', { // غيرت الـ y عشان المسافات
            fontSize: '40px',
            fill: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

optionsButton.on('pointerdown', () => {
    this.registry.set('fromScene', 'MenuInsideGame'); // 👈 مهم عشان نعرف نرجع صح
    const gameScene = this.scene.get('GameScene');
    if (gameScene) {
        gameScene.physics.pause(); 
    }
    this.scene.stop('MenuInsideGame'); 
    this.scene.launch('OptionsScene'); 
});

        [resumeGameButton, optionsButton, exitButton].forEach(button => {
            button.on('pointerover', () => button.setStyle({ fill: '#fff', backgroundColor: '#555' }));
            button.on('pointerout', () => {
                if (button === resumeGameButton) button.setStyle({ fill: '#00ff00', backgroundColor: '#000000' });
                else if (button === optionsButton) button.setStyle({ fill: '#ffff00', backgroundColor: '#000000' });
                else if (button === exitButton) button.setStyle({ fill: '#ff0000', backgroundColor: '#000000' });
            });
        });
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
         this.escKey;
        this.bgMusic;
        this.jumpCount =0;
        this.spaceBar;
        this.level = 1;
this.levelText = null;
    }

    preload() {
    this.load.audio("bgMusic",'/assets/turn.m4a');
this.load.image('sky', 'assets/sky.png');
this.load.image('ground', 'assets/platform.png');
this.load.image('star', 'assets/star (1).png');
this.load.image('bomb', 'assets/bomb (1).png');
this.load.spritesheet('dude', 'assets/dude (2).png', {
  frameWidth: 32,
  frameHeight: 48
});    
}

    create() { 
this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height * 10, 'sky').setOrigin(0);

this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
this.bgMusic.play();
this.registry.set('bgMusic', this.bgMusic);
     
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  this.escKey.on('down', () => {
            if (!this.scene.isActive('MenuInsideGame')) { 
                this.physics.pause();
                if (this.bgMusic && this.bgMusic.isPlaying) {
                    this.bgMusic.pause(); 
                }
           this.physics.pause(); 
this.scene.launch('MenuInsideGame'); 
            }
        });

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
if (this.scene.isActive('OptionsScene')) {
    this.scene.stop('OptionsScene');
}
    }

    update() {
    if (!this.player || !this.player.anims) return; 

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
  player.setTint(0xff0000);

    this.physics.pause();

    if (this.bgMusic && this.bgMusic.isPlaying) {
        this.bgMusic.stop();
    }

    this.time.delayedCall(2000, () => {
        this.scene.stop('GameScene');
        this.scene.start('MenuScene');
        this.score = 0;
        this.level = 1;
        player.clearTint(); 
    }, [], this);

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
    scene: [MenuScene, GameScene,MenuInsideGame,OptionsScene,ContactScene],
      audio: {
        disableWebAudio: false
    }
};

const gameInstance = new Phaser.Game(gameConfig);