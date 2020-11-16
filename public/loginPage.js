"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => ApiConnector.login(data, loginFn); //{логин и пароль}, функция, которая должна выполняться после выполнения запроса

function loginFn(response) { //функция, которая будет выполняться при попытке авторизации
    if (response.success) {
        location.reload(); // В случае успеха запроса обновите страницу
    } else {
        userForm.setLoginErrorMessage(response.error); //В случае провала запроса выведите ошибку в окно для ошибок.
    }
}


userForm.registerFormCallback = (data) => ApiConnector.register(data, registerFn);

function registerFn(response) { //функция, которая будет выполняться при попытке регистрации
    if (response.success) {
        location.reload(); // В случае успеха запроса обновите страницу
    } else {
        userForm.setRegisterErrorMessage(response.error); //В случае провала запроса выведите ошибку в окно для ошибок.
    }
}

// loginFormAction() — обработчик события сабмита формы авторизации
// registerFormAction() — обработчик события сабмита формы регистрации
// getData(form) — метод получения данных из переданной формы