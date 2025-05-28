class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 100;
        this.DRAG = 1400;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 700;
        this.JUMP_VELOCITY = -400;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 4.0;
        this.lives = 1;
        this.scoreCount = 0;
        this.maxScore = 7;
        this.jumps = 0;         
        this.maxJumps = 1;
        this.invincible = false;

        this.timeLeft = 45; // 45 seconds

        if (!my.sprite) my.sprite = {};
        if (!my.vfx) my.vfx = {};

    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.


        this.map = this.add.tilemap("Level 1", 16, 16, 75, 15);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("Kenny-pixel-platformer", "tilemap_tiles");

        // Create a layer
        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(25, 275, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // Find coins in the "Objects" layer in Phaser
        // Look for them by finding objects with the name "coin"
        // Assign the coin texture from the tilemap_sheet sprite sheet
        // Phaser docs:
        // https://newdocs.phaser.io/docs/3.80.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects

        // this.bugs = this.map.createFromObjects("Objects", {
        // name: "bugs",
        // key: "tilemap_sheet",
        // frame: 55
        // });

        this.pumpkins = this.map.createFromObjects("Objects", {
        name: "pumpkins",
        key: "tilemap_food",
        frame: 4
        });

        this.doors = this.map.createFromObjects("Objects", {
        name: "doors",
        key: "tilemap_food",
        frame: 101
        });

        this.lavas = this.map.createFromObjects("Objects", {
        name: "lavas",
        key: "tilemap_food",
        frame: 14
        });

        this.suns = this.map.createFromObjects("Objects", {
        name: "suns",
        key: "tilemap_food",
        frame: 20
        });

        this.hops = this.map.createFromObjects("Objects", {
        name: "hops",
        key: "tilemap_food",
        frame: 55
        });

        this.key = this.map.createFromObjects("Objects", {
        name: "key",
        key: "tilemap_food",
        frame: 21
        });

        this.gate = this.map.createFromObjects("Objects", {
        name: "gate",
        key: "tilemap_food",
        frame: 100
        });

        this.gate2 = this.map.createFromObjects("Objects", {
        name: "gate2",
        key: "tilemap_food",
        frame: 84
        });

        this.secret = this.map.createFromObjects("Objects", {
        name: "secret",
        key: "tilemap_food",
        frame: 101
        });

        this.secret2 = this.map.createFromObjects("Objects", {
        name: "secret2",
        key: "tilemap_food",
        frame: 85
        });

        //this.bugs.visible = true;

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        //this.physics.world.enable(this.bugs, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.pumpkins, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.doors, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.lavas, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.suns, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.hops, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.secret, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.secret2, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.key, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.gate, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.gate2, Phaser.Physics.Arcade.STATIC_BODY);

        this.pumpkins.map((pumpkin) => {
            pumpkin.body.x = pumpkin.x;
            pumpkin.body.y = pumpkin.y;
            pumpkin.visible = true;
        });

        this.doors.map((door) => {
            door.body.x = door.x;
            door.body.y = door.y;
            door.visible = true;
        });

        this.lavas.map((lava) => {
            lava.body.x = lava.x;
            lava.body.y = lava.y;
            lava.visible = true;
        });

        this.suns.map((sun) => {
            sun.body.x = sun.x;
            sun.body.y = sun.y;
            sun.visible = true;
        });

        this.hops.map((hop) => {
            hop.body.x = hop.x;
            hop.body.y = hop.y;
            hop.visible = true;
        });

        this.secret.map((secret) => {
            secret.body.x = secret.x;
            secret.body.y = secret.y;
            secret.visible = true;
        });

        this.secret2.map((secret2) => {
            secret2.body.x = secret2.x;
            secret2.body.y = secret2.y;
            secret2.visible = true;
        });

        this.key.map((key) => {
            key.body.x = key.x;
            key.body.y = key.y;
            key.visible = true;
        });

        this.gate.map((gate) => {
            gate.body.x = gate.x;
            gate.body.y = gate.y;
            gate.visible = true;
        });

        this.gate2.map((gate2) => {
            gate2.body.x = gate2.x;
            gate2.body.y = gate2.y;
            gate2.visible = true;
        });


        // Create a Phaser group out of the array this.bugs
        // This will be used for collision detection below.
        //this.bugsGroup = this.add.group(this.bugs);
        this.pumpkinsGroup = this.add.group(this.pumpkins);
        this.doorsGroup = this.add.group(this.doors);
        this.lavasGroup = this.add.group(this.lavas);
        this.sunsGroup = this.add.group(this.suns);
        this.hopsGroup = this.add.group(this.hops);
        this.secretGroup = this.add.group(this.secret);
        this.secret2Group = this.add.group(this.secret2);
        this.keyGroup = this.add.group(this.key);
        this.gateGroup = this.add.group(this.gate);
        this.gate2Group = this.add.group(this.gate2);



        //console.log(this.bugsGroup);
        console.log(this.pumpkinsGroup);
        console.log(this.doorsGroup);
        console.log(this.lavasGroup);
        console.log(this.sunsGroup);
        console.log(this.hopsGroup);
        console.log(this.secretGroup);
        console.log(this.secret2Group);
        console.log(this.keyGroup);
        console.log(this.gateGroup);
        console.log(this.gate2Group);




        //this.physics.world.enable(this.bugsGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.pumpkins, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.pumpkinsGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.doors, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.doorsGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.lavas, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.lavasGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.suns, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.sunsGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.hops, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.hopsGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.secret, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.secretGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.secret2, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.secret2Group, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.key, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.keyGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.gate, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.gateGroup, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.gate2, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.gate2Group, Phaser.Physics.Arcade.STATIC_BODY);




        this.pumpkinsGroup = this.physics.add.staticGroup(this.pumpkins);
        this.doorsGroup = this.physics.add.staticGroup(this.doors);
        this.lavasGroup = this.physics.add.staticGroup(this.lavas);
        this.sunsGroup = this.physics.add.staticGroup(this.suns);
        this.hopsGroup = this.physics.add.staticGroup(this.hops);
        this.secretGroup = this.physics.add.staticGroup(this.secret);
        this.secret2Group = this.physics.add.staticGroup(this.secret2);
        this.keyGroup = this.physics.add.staticGroup(this.key);
        this.gateGroup = this.physics.add.staticGroup(this.gate);
        this.gate2Group = this.physics.add.staticGroup(this.gate2);



        // // Handle collision detection with bugs
        this.physics.add.overlap(my.sprite.player, this.pumpkinsGroup, (obj1, obj2) => {
            this.sound.play("munch");
            this.scoreCount += 1;
            obj2.destroy(); // remove bugs on overlap
        });

        this.physics.add.overlap(my.sprite.player, this.doorsGroup, (obj1, obj2) => {
            if(this.scoreCount == this.maxScore) {
                this.scene.start("congradulationsScene"); // go to end scene
            } else {
                my.sprite.player.setPosition(25, 250);
                my.sprite.player.body.setVelocity(0);
                this.timeLeft = 45;
            }
        });

        this.physics.add.overlap(my.sprite.player, this.lavasGroup, (obj1, obj2) => {

            if (this.invincible == true) {
                this.lives -= 0;
            } else {
                this.lives -= 1;
            }
            if (this.lives <= 0) {
                this.scene.start("gameoverScene");
            }
        });

        this.physics.add.overlap(my.sprite.player, this.sunsGroup, (obj1, obj2) => {
            this.invincible = true;
            obj2.destroy();
        });

        this.physics.add.overlap(my.sprite.player, this.hopsGroup, (obj1, obj2) => {
            this.maxJumps += 1;
            obj2.destroy();
        });

        this.physics.add.overlap(my.sprite.player, this.secretGroup, (obj1, obj2) => {
            if(this.scoreCount == this.maxScore) {
                this.scene.start("secretScene");
            } else {
                my.sprite.player.setPosition(25, 250);
            my.sprite.player.body.setVelocity(0);
                this.timeLeft = 45;
            }
        });

        this.physics.add.overlap(my.sprite.player, this.secret2Group, (obj1, obj2) => {
            if(this.scoreCount == this.maxScore) {
                this.scene.start("secretScene");
            } else {
                my.sprite.player.setPosition(25, 250);
            my.sprite.player.body.setVelocity(0);
                this.timeLeft = 45;
            }
        });

        this.physics.add.overlap(my.sprite.player, this.keyGroup, (obj1, obj2) => {
            obj2.destroy(); 

            this.gateGroup.children.iterate(gate => {
                gate.destroy();
            });

            this.gate2Group.children.iterate(gate2 => {
                gate2.destroy();
            });
        });

        this.physics.add.overlap(my.sprite.player, this.gateGroup, (obj1, obj2) => {
            my.sprite.player.setPosition(890, 0);
            my.sprite.player.body.setVelocity(0);
        });

        this.physics.add.overlap(my.sprite.player, this.gate2Group, (obj1, obj2) => {
            my.sprite.player.setPosition(890, 0);
            my.sprite.player.body.setVelocity(0);
        });


        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['dirt_01.png', 'dirt_02.png'],
            // TODO: Try: add random: true
            scale: {start: 0.03, end: 0.01},
            // TODO: Try: maxAliveParticles: 8,
            lifespan: 350,
            // TODO: Try: gravityY: -400,
            alpha: {start: 1, end: 0.1}, 
        });

        my.vfx.walking.stop();

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

    }

    update() {
        if(cursors.left.isDown) {
            // TODO: have the player accelerate to the left
            my.sprite.player.body.setAccelerationX(-this.ACCELERATION);
            
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
            }

        } else if(cursors.right.isDown) {
            // TODO: have the player accelerate to the right
            my.sprite.player.body.setAccelerationX(this.ACCELERATION);

            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);

            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
            }

        } else {
            // TODO: set acceleration to 0 and have DRAG take over
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setDragX(this.DRAG);

            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();

        }
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if (my.sprite.player.body.blocked.down) {
            this.jumps = 0;
        }

        if (!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.up) && this.jumps < this.maxJumps) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            this.jumps++;
        }



        if (!this.lastTime || this.time.now - this.lastTime >= 1000) {
            this.timeLeft--;
            this.lastTime = this.time.now;

            if (this.timeLeft <= 0) {
                // Handle timeout (e.g. reset player or end game)
                this.scene.start("gameoverScene");
            }
        }
    }
}