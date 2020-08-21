# byazrov-news-api
## Сервис новостей. Бэкенд часть. 
### Возможные запросы, которые обрабатываются сервером: 
- https://api.byazrov-news.ga/signup - регистрация нового пользователя  
`{  
    "email": "youremail@yandex.ru",  
    "password": "topsecret",  
    "name": "Tony Stark"  
}`  

- https://api.byazrov-news.ga/signin - залогиниться  
`{  
    "email": "youremail@yandex.ru",  
    "password": "topsecret"  
}`  

- https://api.byazrov-news.ga/articles - создать новую статью  
`{  
    "keyword": "Пингвины",  
    "title": "Из зоопарка сбежали пингвины",  
    "text": "Из зоопарка сбежали пингвины и грабанули магазин с дорогой рыбой. Никто не постарадал Кроме рыбы",  
    "source": "Журнал животный криминал",  
    "link": "https://ria.ru/keyword_pingviny",  
    "image": "https://static.tildacdn.com/tild3664-3163-4230-b535-643539613231/12.jpg"  
}`  

- https://api.byazrov-news.ga/articles/cardID - удалить карточку
- https://api.byazrov-news.ga/articles - показать все карточки
- https://api.byazrov-news.ga/users/me - показать мой профиль

### Так же к серверу можно обратиться по публичному ip-адресу `84.201.166.130`

#### Чтобы развернуть проект локально, нужно склонировать себе проект и запустить один из скриптов `start` или `dev`. Сборка start `npm run start` запустит проект на локальном сервере `localhost:3000`. Скрипт run `npm run dev` запустит проект на локальном сервере `localhost:3000` с возможностью хот релоуд.

### Важно. Если проект запускается локально, надо в модуле userController у функции login(signin) надо закомментировать параметры:
- sameSite: 'none', // требования браузера при кросс-доменных запросах
- secure: true, // требования браузера при кросс-доменных запросах
### иначе авторизация не работает. Надо решить этот вопрос позднее
