-
- ## Установка зависимостей
- 1.  Клонируйте репозиторий (если проект в репозитории).
- 2.  Перейдите в директорию проекта.
- 3.  Выполните установку зависимостей командой:

- ### npm install
-
- ## Запуск проекта
- Запустите приложение командой:
- ### npm run dev
- или, если не настроен скрипт, можно запустить напрямую:
- ts-node app.ts
-
- По умолчанию сервер запускается на http://localhost:5000.

Настройка MongoDB для поддержки Change Streams

Change Streams в MongoDB работают только в конфигурации набора реплик (Replica Set). В стандартной одиночной установке (Standalone) они не поддерживаются. Однако, если вы используете MongoDB Atlas, эта настройка уже включена по умолчанию, и вам не нужно ничего менять.
Локальная настройка (если используется локальный MongoDB)

Если вы хотите включить Change Streams в локальной установке MongoDB, вам необходимо перевести одиночную базу в режим Replica Set.
Шаги для настройки локального MongoDB

    Открываем конфигурационный файл MongoDB (mongod.conf)
    Найдите файл mongod.conf (обычно он находится в /etc/mongod.conf или /usr/local/etc/mongod.conf в зависимости от ОС).

    Добавляем настройку набора реплик
    Добавьте в конфигурационный файл следующую секцию:

    replication:
     replSetName: "rs0"

Перезапускаем MongoDB
После внесения изменений перезапустите MongoDB, чтобы применить настройки.

        sudo systemctl restart mongod  # Для Linux (Ubuntu, CentOS)
        brew services restart mongodb  # Для macOS (если установлен через Homebrew)

        Инициируем набор реплик в MongoDB Shell
        Подключаемся к MongoDB:

        mongosh

        rs.initiate()


        При успешном запуске вы увидите что-то похожее:
        {
        "info2" : "no configuration specified. Using a default configuration for the set",
        "me" : "127.0.0.1:27017",
        "ok" : 1,
        "$clusterTime" : { ... },
        "operationTime" : Timestamp(1577545731, 1)
        }

Если используется MongoDB Atlas

В MongoDB Atlas набор реплик включён по умолчанию, поэтому дополнительных настроек не требуется. Просто используйте строку подключения MONGO_URI, и Change Streams будут работать без дополнительных шагов.

               MONGO_URL ="mongodb+srv://sasundavtyandwin:<db_password>@cluster0.zjq6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

Важно: Очистка Redis при смене базы данных

Если вы переключаете базу данных между MongoDB Atlas и локальной MongoDB, необходимо очистить Redis, чтобы удалить старые resumeToken и избежать ошибок при работе с Change Streams.

redis-cli FLUSHALL
