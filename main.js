// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Select all papers dynamically
const papers = document.querySelectorAll(".paper");

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

// Dynamically set initial z-index for each paper
papers.forEach((paper, index) => {
    paper.style.zIndex = numOfPapers - index; // Top paper has highest z-index
});

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
        papers.forEach((paper, index) => {
            paper.style.zIndex = numOfPapers - index; // Top paper has highest z-index
        });
    } else {
        book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        if (currentLocation === 1) {
            openBook();
        }

        if (currentLocation <= numOfPapers) {
            const paper = papers[currentLocation - 1];
            paper.classList.add("flipped");
            paper.style.zIndex = currentLocation; // Adjust z-index dynamically
        }

        if (currentLocation === numOfPapers) {
            closeBook(false);
        }

        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        if (currentLocation === 2) {
            const paper = papers[currentLocation - 2];
            paper.classList.remove("flipped");
            closeBook(true);
        }

        if (currentLocation <= numOfPapers + 1 && currentLocation > 2) {
            const paper = papers[currentLocation - 2];
            paper.classList.remove("flipped");
            paper.style.zIndex = numOfPapers - (currentLocation - 2); // Reset z-index dynamically
        }

        if (currentLocation === numOfPapers + 1) {
            const paper = papers[currentLocation - 2];
            paper.classList.remove("flipped");
            paper.style.zIndex = 1;
            openBook(); // Reopen when coming back from last page
        }

        currentLocation--;
    }
}
