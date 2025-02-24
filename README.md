📩 Messaging App

Messaging App – это приложение для обмена сообщениями в реальном времени, работающее на Node.js, Express, MongoDB, WebSockets и React.
🚀 Стек технологий

    Backend: Node.js, Express, MongoDB (без ORM), WebSockets (ws), Redis
    Frontend: React, React Query, Ant Design
    API: RESTful API для работы с сообщениями
    Хранение данных: MongoDB (сообщения), Redis (буфер сообщений)

📌 Функционал

    📬 Создание и получение сообщений через REST API
    📡 WebSocket в реальном времени – получение новых сообщений без перезагрузки страницы
    🕒 Буферизация сообщений в Redis с отправкой в MongoDB пачками по 10 сообщений или раз в 1 секунду
    📜 Сохранение позиции Change Stream в Redis для восстановления работы после перезапуска сервера
    🎨 UI с Ant Design – авто-прокрутка сообщений, ввод имени перед чатом, аватарка с первой буквой имени