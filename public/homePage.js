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
moneyManager.addMoneyCallback = function () { // Запишите в свойство addMoneyCallback функцию
    ApiConnector.addMoney((response) => { // Внутри функции выполните запрос на пополнение баланса (addMoney)
        if (response.success) {
            moneyManager.showProfile(response.data); //отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
            moneyManager.setMessage(response.success); //выведите сообщение об успехе
        } else {
            moneyManager.setMessage(response.error); //или ошибку пополнении баланса в окне отображения сообщения (setMessage) 
        }
    }); 
}

// 3. Реализуйте конвертирование валюты: