const canvas = document.querySelector('canvas');
const scoreEl = document.querySelector('#scoreEl');
const c = canvas.getContext('2d');


canvas.width = innerWidth;
canvas.height = innerHeight;

let player = new Player();
let projectiles = [];
let grids = [];
let invaderProjectiles = [];
let particles = [];

let keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    }
}
let frames = 0;
let randomInterval = Math.floor((Math.random() * 500) + 500);
let game = {
    over: false,
    active: true
}
let score = 0;

function init() {
    player = new Player();
    projectiles = [];
    grids = [];
    invaderProjectiles = [];
    particles = [];

    keys = {
        ArrowLeft: {
            pressed: false
        },
        ArrowRight: {
            pressed: false
        },
        space: {
            pressed: false
        }
    }
    frames = 0
    frames = 0
    randomInterval = Math.floor(Math.random() * 500 + 500)
    game = {
        over: false,
        active: true
    }
    score = 0

    document.querySelector('#finalScore').innerHTML = score
    document.querySelector('#scoreEl').innerHTML = score

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle({
            position: {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            },
            velocity: {
                x: 0,
                y: 1
            },
            radius: Math.random() * 3,
            color: 'white'
        }));
    }
}

function endGame(index) {
    audio.gameOver.play();
    setTimeout(() => {
        invaderProjectiles.splice(index, 1);
        player.opacity = 0;
        game.over = true;

    }, 0);

    setTimeout(() => {

        game.active = false;
        document.querySelector('#restartScreen').style.display = 'flex'
        document.querySelector('#finalScore').innerHTML = score
    }, 2000);

    createParticles({
        object: player,
        color: 'gold',
        fades: true
    });
}


function createParticles({ object, color, fades }) {

    for (let i = 0; i < 18; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 6,
            color: color || 'deeppink',
            fades

        }));
    }
}


function animate() {

    if (!game.active) return

    requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    planet1();
    planet2();
    planet3();

    for (let i = player.particles.length - 1; i >= 0; i--) {
        const particle = player.particles[i]
        particle.update()

        if (particle.opacity === 0) player.particles[i].splice(i, 1)
    }


    particles.forEach((particle, i) => {

        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius
        }

        if (particle.opacity <= 0) {

            setTimeout(() => {
                particles.splice(i, 1)
            }, 0);
        } else {
            particle.update();
        }
    });


    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)
        } else {
            invaderProjectile.update();
        }

        if (invaderProjectile.position.y + invaderProjectile.height >=
            player.position.y && invaderProjectile.position.x +
            invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width
        ) {

            endGame(index);
        }
    });

    projectiles.forEach((projectile, index) => {

        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(function () {
                projectiles.splice(index, 1);
            }, 0)
        } else {
            projectile.update()
        }
    });

    grids.forEach((grid, gridIndex) => {
        grid.update()

        if (frames % 100 === 0 && grid.invaders.length > 0) {

            grid.invaders[
                Math.floor(Math.random() * grid.invaders.length)
            ].shoot(invaderProjectiles);
        }

        grid.invaders.forEach((invader, i) => {

            invader.update({ velocity: grid.velocity });

            projectiles.forEach((projectile, p) => {
                if (
                    projectile.position.y - projectile.radius <=
                    invader.position.y + invader.height && projectile.position.x + projectile.radius >=
                    invader.position.x && projectile.position.x -
                    projectile.radius <= invader.position.x + invader.width && projectile.position.y + projectile.radius >= invader.position.y

                ) {

                    setTimeout(function () {
                        const invaderFound = grid.invaders.find(invader2 => {
                            return invader2 === invader
                        });

                        const projectileFound = projectiles.find(projectile2 => {
                            return projectile2 === projectile
                        })

                        if (invaderFound && projectileFound) {

                            score += 100;
                            scoreEl.innerHTML = score;

                            createParticles({
                                object: invader,
                                fades: true
                            });

                            audio.explode.play();
                            grid.invaders.splice(i, 1)
                            projectiles.splice(p, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0];
                                const lastInvader = grid.invaders[grid.invaders.length - 1];

                                grid.width =
                                    lastInvader.position.x - firstInvader.position.x + lastInvader.width

                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1);
                            }
                        }
                    }, 0)
                }

            })

        })
    })


    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -10
        player.rotation = -0.20
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 10
        player.rotation = 0.20
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
    if (frames % randomInterval === 0) {
        grids.push(new Invader_Grid())
        randomInterval = Math.floor((Math.random() * 500) + 500);

        frames = 0;
    }
    frames++
}

document.querySelector('#startButton').addEventListener('click', () => {
    audio.backgroundMusic.play();
    audio.start.play();


    document.querySelector('#startScreen').style.display = 'none'
    document.querySelector('#scoreContainer').style.display = 'block'
    init()
    animate()
});

document.querySelector('#restartButton').addEventListener('click', () => {
    audio.select.play()
    document.querySelector('#restartScreen').style.display = 'none'
    init()
    animate()
});

addEventListener("keydown", ({ key }) => {


    if (game.over) return
    switch (key) {


        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break;

        case ' ':
            audio.shoot.play();
            projectiles.push(
                new projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y + player.height / 4
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }));
            break;
    }
});

addEventListener("keyup", ({ key }) => {
    switch (key) {

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;


        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;

        case ' ':
            break;
    }
});