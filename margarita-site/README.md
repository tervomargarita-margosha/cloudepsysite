# Сайт-визитка психолога Маргариты

Одностраничный сайт на чистом HTML, CSS и JavaScript — без фреймворков и сборщиков. Работает на GitHub Pages.

## Структура

```
/
├── index.html            главная страница
├── blog.html             список всех статей
├── article-template.html шаблон статьи
├── privacy.html          политика конфиденциальности (черновик)
├── style.css             все стили
├── script.js             все скрипты
├── images/               фото, дипломы, постер, og-image.jpg
├── media/                сюда положить intro-video.mp4
└── articles/             сюда — файлы статей
```

## Что нужно сделать перед публикацией

1. **Видео.** Положите файл в `media/intro-video.mp4` (вертикальное 9:16, лучше до 20–30 МБ, кодек H.264). Если имя другое — поправьте `src` в блоке «Видеовизитка» в `index.html`. Постер: `images/video-poster.jpg`.
2. **Адрес сайта.** Во всех HTML-файлах найдите `https://USERNAME.github.io/REPO/` и замените на реальный адрес (поиск и замена по всем файлам в редакторе). Это нужно для canonical, Open Graph и Schema.org.
3. **Форма.** Зарегистрируйтесь на [formspree.io](https://formspree.io), создайте форму, скопируйте адрес вида `https://formspree.io/f/xxxxxxxx` и замените `YOUR_ID` в `action` формы (`index.html`, блок «Связаться со мной»). Пока не заменено, форма покажет подсказку.
4. **Подписи к дипломам.** В блоке «Дипломы и сертификаты» замените `alt="Диплом 1"` и т.д. на конкретные названия.
5. **Политика конфиденциальности.** Проверьте и дополните `privacy.html` (это черновик).

## Как редактировать контент

Весь текст находится в `index.html`, блоки подписаны комментариями (`БЛОК 1`, `БЛОК 2` …). Цвета, шрифты и скругления меняются в начале `style.css` в разделе `:root`.

- **Цены:** блок «Форматы работы».
- **Контакты:** блок «Связаться со мной» и подвал.
- **Фото в Hero:** `images/margarita.png` (PNG с прозрачным фоном; если замените на JPG — поправьте `src`).

## Как заменить видео

Замените файл `media/intro-video.mp4` на новый с тем же именем. Для нового превью замените `images/video-poster.jpg`.

## Как добавить новую статью

1. Скопируйте `article-template.html` в папку `articles/` и назовите латиницей через дефис, например `articles/kak-spravitsya-s-trevogoi.html`.
2. В скопированном файле раскомментируйте строку `<base href="../">` в `<head>` — иначе не загрузятся стили и картинки.
3. Заполните `title`, `description`, Open Graph, `canonical`, блок Schema.org (`Article`), заголовок, дату и текст.
4. Добавьте карточку статьи в начало списка в `blog.html` (скопируйте любую карточку и поменяйте ссылку, заголовок, описание, дату, картинку).
5. На главной (`index.html`, блок «Статьи») оставьте 3 самые свежие карточки.
6. Картинки для статей кладите в `images/articles/`.

## Как загрузить на GitHub Pages

1. Создайте аккаунт на [github.com](https://github.com) и новый репозиторий (например, `margarita-psy`), публичный.
2. Загрузите все файлы проекта в корень репозитория: **Add file → Upload files**, перетащите содержимое папки (папки `images`, `media`, `articles` вместе с файлами), нажмите **Commit changes**.
   Либо через терминал:
   ```bash
   git init
   git add .
   git commit -m "Первая версия сайта"
   git branch -M main
   git remote add origin https://github.com/ВАШ_ЛОГИН/margarita-psy.git
   git push -u origin main
   ```
3. Откройте **Settings → Pages**. В разделе *Build and deployment* выберите **Source: Deploy from a branch**, ветка **main**, папка **/ (root)**, нажмите **Save**.
4. Через 1–2 минуты сайт откроется по адресу `https://ВАШ_ЛОГИН.github.io/margarita-psy/`. Подставьте этот адрес вместо `https://USERNAME.github.io/REPO/` (шаг 2 выше).
5. Свой домен: **Settings → Pages → Custom domain**.

> Видео больше 25 МБ через веб-загрузку GitHub не примет — используйте `git push` или сожмите видео (например, в HandBrake).

## Что внутри (кратко)

- Адаптивность mobile-first: breakpoints 320 / 768 / 1024 / 1440 px.
- Шрифты: Playfair Display (заголовки) и Inter (текст) через Google Fonts.
- Иконки — inline SVG, без внешних библиотек.
- SEO: title, description, canonical, Open Graph, Schema.org (`Person`, `LocalBusiness`, `Article`).
- Lightbox для дипломов (закрытие по Esc, стрелки для перелистывания).
