"use strict";

// Выход из личного кабинета
const logoutBtn = new LogoutButton(); //Создайте объект класса LogoutButton

logoutBtn.action = function () { // В свойство action запишите функцию
    ApiConnector.logout((response) => { // которая будет вызывать запрос деавторизации
        if (response.success) { // если запрос выполнился успешно
            location.reload(); // обновите страницу
        }
    });   
}

// Получение информации о пользователе
ApiConnector.current((response) => { // Выполните запрос на получение текущего пользователя
    if (response.success) {
        ProfileWidget.showProfile(response.data); // вызовите метод отображения данных профиля, в () данные ответа от сервера
    }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard(); // Создайте объект типа RatesBoard

function getRates() { // Напишите функцию
    ApiConnector.getStocks((response) => { // которая будет выполнять запрос получения курсов валют.
        if (response.success) {
            ratesBoard.clearTable();// очищайте таблицу с данными
            ratesBoard.fillTable(response.data);// заполняйте её полученными данными
        }
    });
}

// Вызовите данную функцию для получения текущих валют.
// Напишите интервал, который будет многократно выполняться (раз в минуту) 
// и вызывать вашу функцию с получением валют.
getRates();
setInterval(getRates, 60000);


// Операции с деньгами
const moneyManager = new MoneyManager();

// 2. Реализуйте пополнение баланса:
moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, addMoneyFn); // Запишите в свойство addMoneyCallback функцию

function addMoneyFn (response) { // Внутри функции выполните запрос на пополнение баланса (addMoney)
    if (response.success) {
        ProfileWidget.showProfile(response.data); //отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
        moneyManager.setMessage(response.success, 'Баланс успешно пополнен!'); //выведите сообщение об успехе
    } else {
        moneyManager.setMessage(response.success, 'Ошибка, баланс не пополнен.'); //или ошибку пополнении баланса в окне отображения сообщения (setMessage) 
    }
}

// 3. Реализуйте конвертирование валюты:
moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, convertMoneyFn); 

function convertMoneyFn(response) { 
    if (response.success) {
        ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(response.success, 'Конвертирование валюты выполнено успешно!'); 
    } else {
        moneyManager.setMessage(response.success, 'Ошибка, конвертирование не выполнено.'); 
    }
}

// Реализуйте перевод валюты:
moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, sendMoneyCallbackFn);

function sendMoneyCallbackFn(response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Перевод валюты успешно выполнен!');
    } else {
        moneyManager.setMessage(response.success, 'Ошибка, перевод не выполнен.');
    }
}

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

// Реализуйте добавления пользователя в список избранных:
favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, addUserToFavoritesFn);

function addUserToFavoritesFn(response) {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, 'Пользователь успешно добавлен в список избранных!');
    } else {
        moneyManager.setMessage(response.success, 'Ошибка, не удалось добавить пользователя в список избранных!. Заполните имя и ID.');
    }
}
// Реализуйте удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, removeUserFromFavoritesFn);

function removeUserFromFavoritesFn(response) {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, 'Пользователь успешно удален из списка избранных!');
    } else {
        moneyManager.setMessage(response.success, 'Ошибка, не удалось удалить пользователя из списка избранных!.');
    }
}