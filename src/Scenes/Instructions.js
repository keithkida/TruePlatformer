class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    create() {

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xfae0cd).setOrigin(0);        


        this.titleInstruction = this.add.text(centerX - 350, centerY - 300, 'Instruction', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#90EE90', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });


        this.add.text(centerX, centerY + 10, 'You have 45 seconds to eat all the pumpkins\nand clear the map.\nGood Luck.', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '54px',
            color: '#90EE90',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);


        this.add.text(centerX, centerY + 150, 'BEWARE: Lava is a big problem', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '54px',
            color: '#ff0000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);
        

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("platformerScene"); 
        });


        this.add.text(centerX - 900, centerY - 400, 'Hint: Some mysterious item unlocks double jump while others can unlock invincibility...\nGood luck finding it.', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '15px',
            color: '#add8e6',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Instructions for returning to the game
        this.add.text(centerX, centerY + 250, 'SPACE to return', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '54px',
            color: '#90EE90',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

    }

    update() {


    }
}