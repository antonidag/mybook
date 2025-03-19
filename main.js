// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Select all papers dynamically
const papers = Array.from(document.querySelectorAll(".paper"));

// Business Logic
let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

// Initialize paper stack order
function initializeBook() {
    papers.forEach((paper, index) => {
        paper.style.zIndex = numOfPapers - index;
    });
}
initializeBook();

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Open and close book animations
function openBook() {
    book.style.transform = "translateX(50%)";
    updateButtonPositions(-180, 180);
}

function closeBook(isAtBeginning) {
    book.style.transform = isAtBeginning ? "translateX(0%)" : "translateX(100%)";
    updateButtonPositions(0, 0);

    if (isAtBeginning) {
        initializeBook();
    }
}

// Helper to update button positions dynamically
function updateButtonPositions(prevX, nextX) {
    prevBtn.style.transform = `translateX(${prevX}px)`;
    nextBtn.style.transform = `translateX(${nextX}px)`;
}

// Flip to the next page
function goNextPage() {
    if (currentLocation < maxLocation) {
        if (currentLocation === 1) openBook();

        if (currentLocation <= numOfPapers) {
            flipPage(currentLocation - 1, true);
        }

        if (currentLocation === numOfPapers) closeBook(false);

        currentLocation++;
    }
}

// Flip to the previous page
function goPrevPage() {
    if (currentLocation > 1) {
        if (currentLocation === 2) {
            flipPage(currentLocation - 2, false);
            closeBook(true);
        } else if (currentLocation <= maxLocation && currentLocation > 2) {
            flipPage(currentLocation - 2, false);
        }

        if (currentLocation === maxLocation) {
            flipPage(currentLocation - 2, false);
            openBook();
        }

        currentLocation--;
    }
}

// Flip a page (add or remove 'flipped' class and update z-index)
function flipPage(index, forward) {
    const paper = papers[index];

    if (forward) {
        paper.classList.add("flipped");
        paper.style.zIndex = currentLocation;
    } else {
        paper.classList.remove("flipped");
        paper.style.zIndex = numOfPapers - index;
    }
}
