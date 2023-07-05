const sliders = (slides, dir , prev, next) => {
    const items = document.querySelectorAll(slides);
    let slideIndex = 1,
        paused = false;

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;     
        }
    
        if (n < 1) {
            slideIndex = items.length;
        }
    
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });
    
        items[slideIndex - 1].style.display = 'block';
    
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }


    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
        
    } catch (e) {}

    
    function activeSlides() {
        if (dir === 'vertical') {
            paused = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 6000);
        } else {
            paused = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 6000);
        }
    }
    activeSlides();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activeSlides();
    });


};

export default sliders;