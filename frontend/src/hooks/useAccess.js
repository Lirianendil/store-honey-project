import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Получение данных о пользователе из локального хранилища
        const userString = localStorage.getItem("user");

        // Проверка наличия данных о пользователе в локальном хранилище
        if (userString) {
            try {
                // Попытка распарсить JSON-строку с данными пользователя
                const user = JSON.parse(userString);
                // Ваш код обработки пользователя
            } catch (error) {
                // Обработка ошибки парсинга JSON
                console.error("Ошибка при парсинге JSON:", error);
                // Перенаправление на страницу входа в случае ошибки
                navigate("/login");
            }
        } else {
            // Перенаправление на страницу входа, если данные о пользователе отсутствуют в локальном хранилище
            navigate("/login");
        }

        // Очистка эффекта, если необходимо
        return () => {};
    }, [navigate]);
};