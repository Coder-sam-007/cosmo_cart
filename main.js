const header = document.querySelector('#header');
document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 120) {
        header.style.backgroundColor = 'var(--color)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});


var big_wrapper;
var hamburger_menu;

function declare() {
    big_wrapper = document.querySelector(".big-wrapper");
    hamburger_menu = document.querySelector(".hamburger-menu");
}


declare();

function events() {
    hamburger_menu.addEventListener("click", () => {
        big_wrapper.classList.toggle("active");
    });
}

events();


const links = document.querySelectorAll(".nav-link");

function closeMenu() {
    big_wrapper.classList.remove("active");
}
links.forEach((link) => link.addEventListener("click", () => closeMenu()));

const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector(".gnrte_quote"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
    copyBtn.classList.add("copied");
    setTimeout(() => { copyBtn.classList.remove("copied"); }, 1000);
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);