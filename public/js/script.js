/* =====================================================
   FOOD DONATION PLATFORM
   SCRIPT.JS (PART 3A)
===================================================== */

/*==============================
LOADER
==============================*/
window.addEventListener("load", function () {

    const loader = document.getElementById("loader");
    setTimeout(() => {

        loader.classList.add("fade-out");

    }, 700);

});


/*==============================
AOS INIT
==============================*/

// AOS.init({

//     duration: 1000,

//     once: true,

//     offset: 100

// });


/*==============================
ANIMATED COUNTERS
==============================*/

const counters = document.querySelectorAll(".counter");

const counterSpeed = 200;

const startCounter = (counter) => {

    const target = +counter.getAttribute("data-target");

    const update = () => {

        const current = +counter.innerText;

        const increment = Math.ceil(target / counterSpeed);

        if (current < target) {

            counter.innerText = current + increment;

            requestAnimationFrame(update);

        } else {

            counter.innerText = target.toLocaleString();

        }

    };

    update();

};

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/*==============================
STICKY NAVBAR EFFECT
==============================*/

// const navbar = document.querySelector("nav");
// console.log(navbar);
// window.addEventListener("scroll", () => {
//     console.log(window.scrollY);
//     if (window.scrollY > 1000) {
//         console.log("Scrolled!");
//         navbar.style.background = "rgba(33, 37, 41, .90)";
//         navbar.style.padding = "10px 0";
//         navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.25)";
//     } else {
//         navbar.style.background = "rgb(0, 0, 0)";
//         navbar.style.padding = "14px 0";
//         navbar.style.boxShadow = "none";
//     }
// });


/*==============================
BACK TO TOP BUTTON
==============================*/
/*==============================
TOP / BOTTOM BUTTON
==============================*/

const topBtn = document.getElementById("topBtn");
const arrowIcon = topBtn.querySelector("i");

let lastScrollY = window.scrollY;
let scrollDirection = "down";

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {

        // Moving DOWN
        arrowIcon.className = "fas fa-arrow-down";
        scrollDirection = "down";

    } else if (currentScrollY < lastScrollY) {

        // Moving UP
        arrowIcon.className = "fas fa-arrow-up";
        scrollDirection = "up";

    }

    lastScrollY = currentScrollY;

});


topBtn.addEventListener("click", () => {

    if (scrollDirection === "down") {

        // Go to bottom
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });

    } else {

        // Go to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});

/*==============================
SMOOTH NAVIGATION
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            window.scrollTo({

                top: target.offsetTop - 70,

                behavior: "smooth"

            });

        }

    });

});


/*==============================
ACTIVE NAVBAR LINK
==============================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/*==============================
BUTTON RIPPLE EFFECT
==============================*/

document.querySelectorAll(".btn:not(#topBtn)").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;

        circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;

        circle.style.top = `${e.clientY - this.offsetTop - radius}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/*==============================
CARD HOVER EFFECT
==============================*/

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/*==============================
IMAGE FADE-IN
==============================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: .2

});

images.forEach(img => {

    img.style.opacity = "0";

    img.style.transform = "translateY(30px)";

    img.style.transition = "1s";

    imageObserver.observe(img);

});
/* =====================================================
   FOOD DONATION PLATFORM
   SCRIPT.JS (PART 3B)
===================================================== */

/*==============================
AI FOOD IMAGE PREVIEW
==============================*/

const fileInput = document.querySelector('#ai input[type="file"]');

if (fileInput) {

    fileInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please upload an image file.");

            this.value = "";

            return;

        }

        const reader = new FileReader();

        reader.onload = function (e) {

            let preview = document.getElementById("previewImage");

            if (!preview) {

                preview = document.createElement("img");

                preview.id = "previewImage";
                preview.className = "img-fluid rounded shadow mt-4";
                preview.style.maxHeight = "250px";

                fileInput.parentElement.appendChild(preview);

            }

            preview.src = e.target.result;

        };

        reader.readAsDataURL(file);

    });

}


/*==============================
DEMO AI PREDICTION
==============================*/

const analyzeBtn = document.querySelector("#ai button");

if (analyzeBtn) {

    analyzeBtn.addEventListener("click", function () {

        if (!fileInput.files.length) {

            alert("Please upload a food image first.");

            return;

        }

        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

        setTimeout(() => {

            const foods = [
                "Vegetable Biryani",
                "Rice",
                "Bread",
                "Chapati",
                "Mixed Vegetables",
                "Sandwich",
                "Fruits"
            ];

            const meals =
                Math.floor(Math.random() * 70) + 20;

            const freshness =
                Math.floor(Math.random() * 16) + 84;

            const shelf =
                Math.floor(Math.random() * 6) + 3;

            const food =
                foods[Math.floor(Math.random() * foods.length)];

            const table = document.querySelector("#ai table");

            if (table) {

                table.innerHTML = `
<tr>
<th>Food</th>
<td>${food}</td>
</tr>

<tr>
<th>Freshness</th>

<td>

<div class="progress">

<div class="progress-bar bg-success"

style="width:${freshness}%">

${freshness}%

</div>

</div>

</td>

</tr>

<tr>

<th>Estimated Meals</th>

<td>${meals} People</td>

</tr>

<tr>

<th>Shelf Life</th>

<td>${shelf} Hours Remaining</td>

</tr>

<tr>

<th>Status</th>

<td>

<span class="badge bg-success">

Safe For Donation

</span>

</td>

</tr>
`;

            }

            analyzeBtn.disabled = false;

            analyzeBtn.innerHTML =
                '<i class="fas fa-magnifying-glass"></i> Analyze Food';

            showToast("AI analysis completed successfully!");

        }, 2500);

    });

}


/*==============================
PROGRESS BAR ANIMATION
==============================*/

const progressBars =
document.querySelectorAll(".progress-bar");

const progressObserver =
new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const width =
entry.target.style.width;

entry.target.style.width="0%";

setTimeout(()=>{

entry.target.style.width=width;

},300);

}

});

},{threshold:.5});

progressBars.forEach(bar=>{

bar.style.transition="1.5s";

progressObserver.observe(bar);

});


/*==============================
LEADERBOARD EFFECT
==============================*/

const rows =
document.querySelectorAll("#leaderboard tbody tr");

rows.forEach((row,index)=>{

row.addEventListener("mouseenter",()=>{

row.style.transform="scale(1.02)";

row.style.transition=".3s";

});

row.addEventListener("mouseleave",()=>{

row.style.transform="scale(1)";

});

});


/*==============================
AI DEMAND CARD ANIMATION
==============================*/

const predictionCards =
document.querySelectorAll(".prediction-card");

predictionCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});


/*==============================
QR IMAGE EFFECT
==============================*/

const qrImage=document.querySelector("#qr img");

if(qrImage){

qrImage.addEventListener("click",()=>{

qrImage.style.transform="scale(1.12) rotate(6deg)";

setTimeout(()=>{

qrImage.style.transform="scale(1) rotate(0deg)";

},500);

showToast("QR Code Ready For Verification");

});

}


/*==============================
TOAST MESSAGE
==============================*/

function showToast(message){

let toast=document.getElementById("customToast");

if(!toast){

toast=document.createElement("div");

toast.id="customToast";

toast.style.position="fixed";
toast.style.top="20px";
toast.style.right="20px";
toast.style.background="#28a745";
toast.style.color="#fff";
toast.style.padding="15px 20px";
toast.style.borderRadius="10px";
toast.style.boxShadow="0 10px 25px rgba(0,0,0,.2)";
toast.style.zIndex="99999";
toast.style.fontWeight="600";
toast.style.opacity="0";
toast.style.transition=".4s";

document.body.appendChild(toast);

}

toast.innerHTML=message;

toast.style.opacity="1";

setTimeout(()=>{

toast.style.opacity="0";

},3000);

}


/*==============================
CONTACT FORM
==============================*/

const contactForm =
document.querySelector("#contact form");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

showToast("Thank you! Your message has been received.");

contactForm.reset();

});

}


/*==============================
CURRENT YEAR
==============================*/

const footerText =
document.querySelector("footer .text-center");

if(footerText){

footerText.innerHTML=
`© ${new Date().getFullYear()} Food Donation Platform | Built with ❤️ for Communities`;

}


/*==============================
END OF SCRIPT
==============================*/

console.log("Food Donation Platform Loaded Successfully");