document.addEventListener("DOMContentLoaded", () => {
    const cfmsSlides = [
        {
            src: "assets/01-nao-data-control-role-review.png",
            title: "NAO data control role review"
        },
        {
            src: "assets/02-mission-income-manager-setup.png",
            title: "Mission Income Manager setup"
        },
        {
            src: "assets/03-mission-sorting-by-number.png",
            title: "Mission sorting by number"
        },
        {
            src: "assets/04-mission-sorting-by-location.png",
            title: "Mission sorting by location"
        },
        {
            src: "assets/05-get-role-feature.png",
            title: "Get Role feature"
        },
        {
            src: "assets/06-cfms-access-list-source.png",
            title: "CFMS access list source"
        },
        {
            src: "assets/07-compute-changes-input.png",
            title: "Compute Changes input"
        },
        {
            src: "assets/08-compute-changes-recommendations.png",
            title: "Compute Changes recommendations"
        },
        {
            src: "assets/09-compute-changes-result.png",
            title: "Compute Changes result"
        },
        {
            src: "assets/10-development-in-visual-studio.png",
            title: "Development in Visual Studio"
        },
        {
            src: "assets/11-role-check-sequence.png",
            title: "Role check sequence"
        },
        {
            src: "assets/12-missing-access-check.png",
            title: "Missing access check"
        },
        {
            src: "assets/13-role-entry-validation.png",
            title: "Role entry validation"
        },
        {
            src: "assets/15-main-menu-screenshot-2.png",
            title: "Main menu screenshot"
        },
        {
            src: "assets/16-income-manager-configuration-in-cfms.png",
            title: "Income Manager configuration in CFMS"
        },
        {
            src: "assets/17-role-database-reference.png",
            title: "Role database reference"
        }
    ];

    let currentSlideIndex = 0;
    let slideshowTimer = null;
    let isPlaying = true;
    const slideshowDelay = 4000;

    const slideImage = document.getElementById("cfms-slide-image");
    const slideTitle = document.getElementById("cfms-slide-title");
    const slideCounter = document.getElementById("cfms-slide-counter");
    const dotsContainer = document.getElementById("cfms-slide-dots");
    const previousButton = document.querySelector(".slide-btn.prev");
    const nextButton = document.querySelector(".slide-btn.next");
    const playPauseButton = document.getElementById("cfms-play-pause");

    if (!slideImage || !slideTitle || !slideCounter || !dotsContainer) {
        return;
    }

    function showSlide(index) {
        if (index < 0) {
            currentSlideIndex = cfmsSlides.length - 1;
        } else if (index >= cfmsSlides.length) {
            currentSlideIndex = 0;
        } else {
            currentSlideIndex = index;
        }

        const slide = cfmsSlides[currentSlideIndex];

        slideImage.classList.add("fade-out");

        window.setTimeout(() => {
            slideImage.src = slide.src;
            slideImage.alt = slide.title;
            slideTitle.textContent = slide.title;
            slideCounter.textContent = `${currentSlideIndex + 1} / ${cfmsSlides.length}`;

            document.querySelectorAll(".slide-dot").forEach((dot, dotIndex) => {
                dot.classList.toggle("active", dotIndex === currentSlideIndex);
            });

            slideImage.classList.remove("fade-out");
        }, 160);
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function resetTimer() {
        if (slideshowTimer) {
            window.clearInterval(slideshowTimer);
        }

        if (isPlaying) {
            slideshowTimer = window.setInterval(nextSlide, slideshowDelay);
        }
    }

    function createDots() {
        dotsContainer.innerHTML = "";

        cfmsSlides.forEach((slide, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "slide-dot";
            dot.setAttribute("aria-label", `Show image ${index + 1}: ${slide.title}`);
            dot.addEventListener("click", () => {
                showSlide(index);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        });
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            showSlide(currentSlideIndex - 1);
            resetTimer();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showSlide(currentSlideIndex + 1);
            resetTimer();
        });
    }

    if (playPauseButton) {
        playPauseButton.addEventListener("click", () => {
            isPlaying = !isPlaying;
            playPauseButton.textContent = isPlaying ? "Pause slideshow" : "Play slideshow";
            resetTimer();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showSlide(currentSlideIndex - 1);
            resetTimer();
        }

        if (event.key === "ArrowRight") {
            showSlide(currentSlideIndex + 1);
            resetTimer();
        }
    });

    slideImage.addEventListener("error", () => {
        slideTitle.textContent = "Image not found. Check the filename in the assets folder.";
    });

    createDots();
    showSlide(0);
    resetTimer();
});
