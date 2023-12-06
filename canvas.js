"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const circles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createCircle(x, y) {
    const radius = Math.random() * 20 + 10; // Rayon aléatoire entre 10 et 30
    const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    circles.push({ x, y, radius, color, speedX: Math.random() * 4 - 2, speedY: Math.random() * 4 - 2 });
}

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

function updateCircles(mouseX, mouseY) {
    for (let i = 0; i < circles.length; i++) {
        const dx = mouseX - circles[i].x;
        const dy = mouseY - circles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            // Éviter la souris en ajustant la position du cercle
            circles[i].x += dx / distance * 5;
            circles[i].y += dy / distance * 5;
        } else {
            // Déplacer le cercle de manière aléatoire
            circles[i].x += circles[i].speedX;
            circles[i].y += circles[i].speedY;

            if (circles[i].x < 0 || circles[i].x > canvas.width || circles[i].y < 0 || circles[i].y > canvas.height) {
                // Réinitialiser la position si le cercle sort du canvas
                circles[i].x = Math.random() * canvas.width;
                circles[i].y = Math.random() * canvas.height;
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        drawCircle(circles[i]);
    }
}

function animate() {
    updateCircles();
    draw();
    requestAnimationFrame(animate);
}

animate();

function animate2(event)
{
    const mouseX = event.clientX || event.touches[0].clientX;
    const mouseY = event.clientY || event.touches[0].clientY;
    updateCircles(mouseX, mouseY);
    
    ;
}

canvas.addEventListener('mousemove', animate2);
canvas.addEventListener('touchmove', animate2);

resize();
window.addEventListener("resize", resize);

// Créer 10 cercles initiaux
for (let i = 0; i < 10; i++) {
    createCircle(Math.random() * canvas.width, Math.random() * canvas.height);
}


