/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
            document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 700);

    }, 1800);

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year")
    .textContent = new Date().getFullYear();


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.querySelector(".menu-btn");

const navMenu =
    document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll(".nav-link")
.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* =========================================
   TYPING ANIMATION
========================================= */

const typingElement =
    document.getElementById("typing");

const words = [

    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Software Development"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord =
        words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 85
    );

}

typeEffect();


/* =========================================
   CURSOR
========================================= */

const cursor =
    document.querySelector(".cursor");

const cursorRing =
    document.querySelector(".cursor-ring");


document.addEventListener(
    "mousemove",
    e => {

        cursor.style.left =
            e.clientX + "px";

        cursor.style.top =
            e.clientY + "px";


        cursorRing.style.left =
            e.clientX - 17 + "px";

        cursorRing.style.top =
            e.clientY - 17 + "px";

    }
);


document.querySelectorAll("a, button, .project-card")
.forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursorRing.style.width = "55px";
        cursorRing.style.height = "55px";

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.style.width = "35px";
        cursorRing.style.height = "35px";

    });

});


/* =========================================
   PARTICLE NETWORK
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.vx =
            (Math.random() - .5) *
            .35;

        this.vy =
            (Math.random() - .5) *
            .35;

        this.size =
            Math.random() * 2 + .5;

    }


    update() {

        this.x += this.vx;

        this.y += this.vy;


        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {

            this.vx *= -1;

        }


        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.vy *= -1;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,230,176,.55)";

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const count =
        window.innerWidth < 700
        ? 45
        : 90;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}

createParticles();


function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                const opacity =
                    1 - distance / 120;

                ctx.strokeStyle =
                    `rgba(0,230,176,${opacity * .12})`;

                ctx.lineWidth = .5;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(p => {

        p.update();
        p.draw();

    });


    connectParticles();

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   SKILL BAR ANIMATION
========================================= */

const skillBars =
    document.querySelectorAll(".skill-bar");


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const bar =
                        entry.target
                            .querySelector("div");

                    const width =
                        bar.style.width;

                    bar.style.setProperty(
                        "--skill-width",
                        width
                    );

                    entry.target
                        .classList
                        .add("animate");

                }

            });

        },

        {
            threshold: .5
        }

    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================
   3D TILT CARDS
========================================= */

const tiltCards =
    document.querySelectorAll(".tilt-card");


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left;

            const y =
                e.clientY -
                rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 20;

            const rotateY =
                (centerX - x) / 20;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================
   PROJECT MODAL
========================================= */

const modal =
    document.getElementById(
        "projectModal"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalTags =
    document.getElementById(
        "modalTags"
    );


const projects = {

    geovision: {

        title:
            "GeoVision Plan-Net",

        category:
            "COMPUTER VISION",

        description:
            "GeoVision Plan-Net focuses on semantic segmentation of satellite imagery of Mumbai. The project uses DeepLabv3+ to identify different land-cover categories and explore applications for smarter urban planning.",

        tags: [
            "Python",
            "Deep Learning",
            "DeepLabv3+",
            "Computer Vision"
        ]

    },


    voicefirst: {

        title:
            "VoiceFirst – Form Filling WebApp",

        category:
            "NLP / ACCESSIBILITY",

        description:
            "VoiceFirst is a multilingual voice-enabled application designed to simplify government form filling for visually impaired and low-literacy users. The project uses Bhashini, IndicTransV2 and FastAPI to support accessible interactions and form processing.",

        tags: [
            "Bhashini",
            "IndicTransV2",
            "FastAPI",
            "NLP"
        ]

    }

};


document.querySelectorAll(
    ".project-card"
).forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const project =
                projects[
                    card.dataset.project
                ];


            modalTitle.textContent =
                project.title;

            modalCategory.textContent =
                project.category;

            modalDescription.textContent =
                project.description;


            modalTags.innerHTML = "";


            project.tags.forEach(tag => {

                const span =
                    document.createElement(
                        "span"
                    );

                span.textContent =
                    tag;

                modalTags.appendChild(
                    span
                );

            });


            modal.classList.add(
                "show"
            );

        }
    );

});


/* CLOSE MODAL */

document.querySelector(
    ".close-modal"
).addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "show"
        );

    }
);


modal.addEventListener(
    "click",
    e => {

        if (
            e.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "Escape") {

            modal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute(
                    "href"
                ) === `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);