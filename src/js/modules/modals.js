const modals = () => {
    let btnPressed;
    function bindModal(triggerSelector, modalSelector, closeSelector, animationSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              present = document.querySelector('.fixed-gift'),
              scroll = calcScroll();
        
    

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault(); 
                }
                
                btnPressed = true;

                if (destroy) {
                    item.remove();
                }


                windows.forEach(item => {
                    item.style.display = "none";
                });
                    
                modal.classList.add('animated', animationSelector);
                modal.style.display = 'block';
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                present.style.marginRight = `${scroll}px`;

            }); 
        });


        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = "none";
            });
            modal.classList.remove('animated', animationSelector);
            present.style.marginRight = `0px`;
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.style.display === 'block') {
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                present.style.marginRight = `0px`;
                modal.classList.remove('animated', animationSelector);
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = "none";
                });
                modal.classList.remove('animated', animationSelector);
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                present.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);

    }

    function calcScroll() {
        let div = document.createElement('div');
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function showByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - 5;
            
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    
    }
    
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close', 'fadeInRight');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close', 'fadeInDown');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', 'fadeInLeft', true);
    showByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);
};

export default modals;