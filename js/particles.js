/* ==========================================
   IMAM's PORTFOLIO - MATRIX PARTICLES
   Background Matrix Rain Effect
   ========================================== */

(function() {
    'use strict';

    // Matrix Rain Configuration
    const config = {
        characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/',
        fontSize: 14,
        columns: 0,
        drops: [],
        fadeSpeed: 0.05,
        minSpeed: 0.5,
        maxSpeed: 1.5,
        colors: {
            primary: 'rgba(0, 212, 255, 0.8)',      // Cyan
            secondary: 'rgba(255, 0, 85, 0.8)',     // Red/Pink
            tertiary: 'rgba(77, 255, 166, 0.8)',    // Green
        }
    };

    // Initialize Canvas
    function initCanvas() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculate columns
        config.columns = Math.floor(canvas.width / config.fontSize);

        // Initialize drops
        config.drops = [];
        for (let i = 0; i < config.columns; i++) {
            config.drops[i] = {
                y: Math.random() * -100,
                speed: config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed),
                color: getRandomColor(),
                lastChar: '',
                opacity: Math.random() * 0.5 + 0.5
            };
        }

        return { canvas, ctx };
    }

    // Get Random Color
    function getRandomColor() {
        const colors = Object.values(config.colors);
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Get Random Character
    function getRandomChar() {
        return config.characters.charAt(Math.floor(Math.random() * config.characters.length));
    }

    // Draw Matrix Rain
    function drawMatrix(ctx, canvas) {
        // Create fade effect
        ctx.fillStyle = `rgba(10, 14, 39, ${config.fadeSpeed})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw characters
        ctx.font = `${config.fontSize}px monospace`;

        for (let i = 0; i < config.drops.length; i++) {
            const drop = config.drops[i];
            const char = getRandomChar();
            
            // Set color with opacity
            const color = drop.color.replace('0.8', drop.opacity.toString());
            ctx.fillStyle = color;

            // Draw character
            const x = i * config.fontSize;
            const y = drop.y * config.fontSize;
            ctx.fillText(char, x, y);

            // Add glow effect for some characters
            if (Math.random() > 0.98) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = drop.color;
                ctx.fillText(char, x, y);
                ctx.shadowBlur = 0;
            }

            // Move drop down
            drop.y += drop.speed;

            // Reset drop when it reaches bottom
            if (drop.y * config.fontSize > canvas.height && Math.random() > 0.975) {
                drop.y = 0;
                drop.speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
                drop.color = getRandomColor();
                drop.opacity = Math.random() * 0.5 + 0.5;
            }
        }
    }

    // Animation Loop
    function animate(ctx, canvas) {
        drawMatrix(ctx, canvas);
        requestAnimationFrame(() => animate(ctx, canvas));
    }

    // Handle Window Resize
    function handleResize(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        config.columns = Math.floor(canvas.width / config.fontSize);

        // Reinitialize drops
        const oldDrops = config.drops;
        config.drops = [];
        for (let i = 0; i < config.columns; i++) {
            if (oldDrops[i]) {
                config.drops[i] = oldDrops[i];
            } else {
                config.drops[i] = {
                    y: Math.random() * -100,
                    speed: config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed),
                    color: getRandomColor(),
                    lastChar: '',
                    opacity: Math.random() * 0.5 + 0.5
                };
            }
        }
    }

    // Initialize when DOM is ready
    function init() {
        const canvasData = initCanvas();
        if (!canvasData) return;

        const { canvas, ctx } = canvasData;

        // Start animation
        animate(ctx, canvas);

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                handleResize(canvas, ctx);
            }, 250);
        });

        // Pause animation when tab is not visible (performance optimization)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Animation will naturally pause when requestAnimationFrame isn't called
            } else {
                animate(ctx, canvas);
            }
        });
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
