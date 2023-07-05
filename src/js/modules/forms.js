import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]'),
          textareas = document.querySelectorAll('textarea'),
          size = document.querySelector('#size'),
          material = document.querySelector('#material'),
          options = document.querySelector('#options'),
          price = document.querySelector('.calc-price');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с Вами свяжемся...',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };   

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };



    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
        textareas.forEach(item => {
            item.value = '';
        });
        size.selectedIndex = 0;
        options.selectedIndex = 0;
        material.selectedIndex = 0;
        price.textContent = 'Для расчета нужно выбрать размер картины и материал картины';

    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    
    });
    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.style.textAlign = 'center';
            statusMessage.style.justifyContent = 'center';
            item.parentNode.appendChild(statusMessage);
           
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            // item.parentNode.style.height = getComputedStyle(item.parentNode).height;
        
            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);
            if (size.options[size.selectedIndex].text != 'Выберите размер картины') {
                formData.append('size', size.options[size.selectedIndex].text);
            } 
            if (material.options[material.selectedIndex].text != 'Выберите материал картины') {
                formData.append('material', material.options[material.selectedIndex].text);
            } 
            if (options.options[options.selectedIndex].text != 'Дополнительные услуги') {
                formData.append('options', options.options[options.selectedIndex].text);
            }
            if (isNaN(+price.textContent)) {
                formData.append('price', price.textContent);
            }

            for (let key of formData.entries()) {
                console.log(key);
            }

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    formData.delete('price');
                    formData.delete('material');
                    formData.delete('size');
                    formData.delete('options');
                    formData.delete('promocode');
                    formData.delete('upload');
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        // item.parentNode.style.removeProperty('height');
                    }, 5000);
                });
        });
    });
};

export default forms;


