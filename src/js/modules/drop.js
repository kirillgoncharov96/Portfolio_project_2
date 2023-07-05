import { postData } from "../services/requests";

const drop = () => {

    const fileInputs = document.querySelectorAll('[name="upload"]'),
          upload = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.backgroundColor = "#d6c3db";
        item.closest('.file_upload').style.borderRadius = "5px";
        item.closest('.file_upload').style.border = "2px solid #c87bdb";
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if (item.closest('.row')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        }  else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    const clearInputs = () => {
        fileInputs.forEach(item => {
            item.value = '';
        });

        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].lenght > 6 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;

            if (input.closest('.row')) {
                const formData = new FormData();
                formData.append('file', input.files[0]);

                postData('assets/server.php', formData)
                .then(result => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    clearInputs();
                });
            }
        });
    });

};

export default drop;