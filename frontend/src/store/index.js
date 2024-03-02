import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'; // Импорт middleware для RTK-Query
import authReducer from '../redux/slices/authSlice';
import { productApi } from '../redux/api/productApi'; // Импорт вашего API RTK-Query

const store = configureStore({
    reducer: {
        auth: authReducer,
        [productApi.reducerPath]: productApi.reducer, // Добавление редюсера для API RTK-Query
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware), // Добавление middleware для API RTK-Query
});

setupListeners(store.dispatch);

export default store;