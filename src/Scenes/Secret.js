class Secret extends Phaser.Scene {
    constructor() {
        super("secretScene");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Deep gold background for a secret vibe
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x3B2F2F).setOrigin(0);

        // Secret title
        this.add.text(centerX, centerY - 250, '??? SECRET UNLOCKED ???', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '72px',
            color: '#FFD700',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Message
        this.add.text(centerX, centerY - 100, 'You discovered something hidden...\nMost players never make it here.', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '36px',
            color: '#C0C0C0',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Hint or reward
        this.add.text(centerX, centerY + 50, 'This secret belongs only to the bold.\nWell done.', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '32px',
            color: '#ADFF2F',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Instructions to return
        this.add.text(centerX, centerY + 150, 'Press SPACE to return...', {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Return to platformer on SPACE
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("platformerScene");
        });
    }

    update() {}
}
