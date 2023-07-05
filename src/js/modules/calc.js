import { getResource } from "../services/requests";

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result),
          btnClearValue = document.querySelector('#button-order');
     
    let sum = 0,
        priceSizeValue = '',
        priceMaterialValue = '',
        priceOptionsValue = '';

    sizeBlock.addEventListener('change', (e) => {
        priceFunc(e.target.value);
    });

    materialBlock.addEventListener('change', (e) => {
        priceFunc(e.target.value);
    });

    optionsBlock.addEventListener('change', (e) => {
        priceFunc(e.target.value);
    });

    promocodeBlock.addEventListener('input', (e) => {
        calcFunc(e.target.value);
    });

    function priceFunc(response) { 
        let urlsize = 'http://localhost:3000/size',
            urlmaterial = 'http://localhost:3000/material',
            urloptions = 'http://localhost:3000/options';
        getResource(urlsize)
        .then(item => {
            Object.keys(item).forEach((key, i) => {
                if (response == key) {
                    getResource(urlsize)
                    .then(item => {
                        calcFunc(priceSizeValue = Object.values(item)[i]);
                    });
                }
            });   
        })
        .catch(error => console.log(error));
        
        getResource(urlmaterial)
        .then(item => {
            Object.keys(item).forEach((key, i) => {
                if (response == key) {
                    getResource(urlmaterial)
                    .then(item => {
                        calcFunc(priceMaterialValue = Object.values(item)[i]);
                    });
                }
            });   
        })
        .catch(error => console.log(error));

        getResource(urloptions)
        .then(item => {
            Object.keys(item).forEach((key, i) => {
                if (response == key) {
                    getResource(urloptions)
                    .then(item => {
                        calcFunc(priceOptionsValue = Object.values(item)[i]);
                    });
                }
            });   
        })
        .catch(error => console.log(error));
 
    } 

    const calcFunc = () => {

       sum = Math.round((priceSizeValue) * (priceMaterialValue) + (priceOptionsValue));

       if (priceSizeValue == '' || priceMaterialValue == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === "IWANTPOPART") {
            resultBlock.textContent = Math.round(sum * 0.7) + `\u20bd`;
        } else {
            resultBlock.textContent = sum + `\u20bd`;
        }

    }

    btnClearValue.addEventListener('click', () => {
        priceSizeValue = 0;
        priceMaterialValue = 0;
        priceOptionsValue = 0;
    });

};

export default calc;
