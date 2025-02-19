const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config(); // Загружаем переменные окружения из файла .env

const app = express();
const port = 3001;

// Служим статические файлы (например, HTML, CSS, JS) из папки 'public'
app.use(express.static('public'));

// Маршрут для получения данных о погоде
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'London';  // По умолчанию 'London', если город не указан
  const apiKey = process.env.API_KEY; // Используем API-ключ из .env файла
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data); // Отправляем данные о погоде обратно на клиент
  } catch (error) {
    res.status(500).send('Ошибка при получении данных о погоде');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});