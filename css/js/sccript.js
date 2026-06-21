document.addEventListener("DOMContentLoaded", () => {

    const cubes = document.querySelectorAll(".cube-wrapper");
    const fade = document.getElementById("fade");

    function abrirFoto(src){
        document.getElementById("fotoGrande").src = src;
         document.getElementById("overlay").style.display = "flex"; 
    }
    function fecharFoto(){
         document.getElementById("overlay").style.display = "none"; 
    }
    // =======================
    // CLIQUE NAS CAIXAS
    // =======================
    cubes.forEach(box => {

        box.addEventListener("click", () => {

            const cube = box.querySelector(".cube");

            if (!box.dataset.link) {
                console.error("Falta data-link nesta caixa:", box);
                return;
            }

            // animação abrir cubo
            cube.classList.add("open");

            // fade branco
            setTimeout(() => {
                fade.classList.add("active");
            }, 400);

            // troca de página
            setTimeout(() => {
                window.location.href = box.dataset.link;
            }, 1100);

        });

    });

    // =======================
    // PARTÍCULAS (CORRIGIDO)
    // =======================
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 2.5 + 1,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        });
    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;

            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

            ctx.fillStyle = "rgba(255,255,255,0.6)";
            ctx.fill();

        });

        requestAnimationFrame(animate);
    }

    animate();

});