class Congradulations extends Phaser.Scene {
    constructor() {
        super("congradulationsScene");
    }



    create() {

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xFFD700).setOrigin(0);



        this.titleGame = this.add.text(centerX - 550, centerY - 250, 'CONGRADULATIONS', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#C0C0C0', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });

        this.titleOver = this.add.text(centerX - 250, centerY - 100, 'WINNER', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '144px',
            color: '#C0C0C0', 
            align: 'center',
            stroke: '#000000',           
            strokeThickness: 10 
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("platformerScene"); 
        });


        this.add.text(centerX, centerY + 100, 'SPACE to return', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',           
            strokeThickness: 5
        }).setOrigin(0.5);

    }

    update() {


    }
}