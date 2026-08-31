const facts = [
    "He taught himself to play the piano, drums, guitar and trumpet.",
    "Justin grew up in Stratford, Ontario, Canada.",
    "His mother uploaded videos of his local singing performances to YouTube.",
    "His debut EP, My World, was released in 2009.",
    "The word “Belieber” became the popular name for members of his fan community.",
    "He has explored pop, R&B, dance-pop and electronic music throughout his career."
];

const body = document.body;
const themeButton = document.querySelector("#themeButton");
const themeIcon = document.querySelector("#themeIcon");
const factButton = document.querySelector("#factButton");
const factText = document.querySelector("#factText");
const quizForm = document.querySelector("#quizForm");
const quizResult = document.querySelector("#quizResult");
const surpriseButton = document.querySelector("#surpriseButton");
const toast = document.querySelector("#toast");

// Restore the visitor's saved theme when the page opens.
if (localStorage.getItem("jb-theme") === "dark") {
    body.classList.add("dark");
    themeIcon.textContent = "☀";
}

themeButton.addEventListener("click", function () {
    body.classList.toggle("dark");
    const darkModeIsOn = body.classList.contains("dark");
    themeIcon.textContent = darkModeIsOn ? "☀" : "☾";
    localStorage.setItem("jb-theme", darkModeIsOn ? "dark" : "light");
});

factButton.addEventListener("click", function () {
    let newFact = facts[Math.floor(Math.random() * facts.length)];

    // Avoid showing exactly the same fact twice in a row.
    while (newFact === factText.textContent && facts.length > 1) {
        newFact = facts[Math.floor(Math.random() * facts.length)];
    }

    factText.textContent = newFact;
});

quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const answers = new FormData(quizForm);
    const correctAnswers = { q1: "b", q2: "a", q3: "c" };
    let score = 0;

    for (const question in correctAnswers) {
        if (answers.get(question) === correctAnswers[question]) {
            score++;
        }
    }

    if (!answers.get("q1") || !answers.get("q2") || !answers.get("q3")) {
        quizResult.textContent = "Please answer all three questions first.";
        return;
    }

    const messages = [
        "Time for a Bieber listening marathon!",
        "Nice try—you know the basics!",
        "Great score. Certified fan energy!",
        "Perfect 3/3—you are a true Belieber!"
    ];
    quizResult.textContent = `${score}/3 — ${messages[score]}`;
});

surpriseButton.addEventListener("click", function () {
    const cards = document.querySelectorAll(".era-card");
    const chosenCard = cards[Math.floor(Math.random() * cards.length)];

    chosenCard.scrollIntoView({ behavior: "smooth", block: "center" });
    chosenCard.animate(
        [
            { transform: "scale(1) rotate(0deg)" },
            { transform: "scale(1.05) rotate(-2deg)" },
            { transform: "scale(1) rotate(0deg)" }
        ],
        { duration: 700 }
    );

    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
});

// Reveal sections gently as they enter the screen.
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(function (element) {
    revealObserver.observe(element);
});
