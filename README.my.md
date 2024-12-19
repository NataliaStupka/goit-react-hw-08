Створення/налаштування проекту:

1. New репозиторій(порожній) на github.com;
2. Клонуємо на комп
3. відкрити термінал, зайті в папку проекту(pwd - де знаходимось, cd -
   навігація(наприклад cd goit-react-hw-02), ls - список папок)
4. npm create vite@latest
5. .(створити проєкт у поточній папці) або назву (тоді створе нову папку)
6. React, JS + SWS (потім typescript)
7. npm install
8. npm run dev (Запустить проєкт)
9. ctrl + С (зупине сервер)
10. відкриваємо VScode
11. в index.html змінитит title з 'Vite + React' на свій
12. додати файл .prettier.json
13. нормалізація стилів (npm i modern-normalize). В main.jsx імпортуємо стилі
    нормалізації (import "modern-normalize");
14. в файлі index.css, скид/додавання деяких глобальних стилів для елементів;
15. Перевірка якості коду: Розширення ESLint + налаштування файлу ESLint: Замінили вміст файлу eslint.config.js; Або 'точково':
    <!-- ''' -->
    rules: {
    ...
    "react/prop-types": 0,
    ...
    }
    <!-- ''' -->
16. в файлі vite.config.js замінили вміст
17. npm i clsx - додавання декількох класів на елемент
18. Formik(npm i formik) + yup(npm i yup) валідація;
<!--  -->
19. npm install axios (запит на бекенд замість fetch)
20. npm install react-hot-toast ((сповіщення)). Toaster в main біля App

- npm i nanoid (генерування id) - автоматично є в Redux

21. npm i react-icons
22. npm i react-loader-spinner

<!-- Redux -->

22. npm install @reduxjs/toolkit (встановлення Redux Toolkit);
23. npm install react-redux (Для використання React та Redux разом);
24. npm i redux-persist - бібліотека як LocalStorige для Redux

<!-- 8 -->

**--- Виконання д/з #8 - Register/Login user---**
_Скопіювали 7 дз._

- працюємо через https://connections-api.goit.global/docs/ (бекенд);
- slice, operations, selectors

- **UI**:

1. App: додаємо маршрутизатор <BrowserRouter><App/></BrowserRouter>
2. додамо сторінки (**pages**): в App з компонентів на <Routes><Route path='/' element={}></Route></Routes>
   2.1. в App додаємо компонент Loyout (в компоненті Loyout: AppBar(HomePage, Contacts, Login, Register, Logout), Outlet)
   2.2. в App Loyout: маршрути HomePage, Contact; за Layout: Register, Login
3. є маршрути (<Route path='/' element={<HomePage/>}/>) - є переходи (<Navlink to='/'/>)

- **логіка**:

4.  redux: папки(auth: slice(інформація про користувача); operations(дії); selector(інформация із slice));
5.  в store імпортуємо reducer з slice
6.  якщо декілька окремих бекендів, то створюється окремі axios: const goitApi = axios.create()
7.  реєстрація: в operation, в slice зберігаємо дані, та на RegisterationForm
8.  логінізація: -//-
    8.1. якщо **юзер залогінився** перекидауємо його на контакти (через <Navigate to='/contacts/'/>
    або dispatch().unwrap().then(() => {navigate('/contacts')}))
9.  **logout**: для виходу використовуємо token.
    при виході повернути кнопки логаут и реєстрації кнопку виходу прибираємо;
10. Після **виходу** з акаунту: очистити initialState user (slice auth), і сторінку з контактами (slice contact)!!
11. **Refresh** - Зберігаємо дані користувача, викор. token
    11.0. const savedToken = thunkAPI.getState().auth; - поверне весь store(auth(isLoggedIn, token), user, ...)
    11.1. Persist: в store, main. Зберігаємо тільки whitelist: ['token']
    11.2. auth/operation: refresh.
    11.3. Ініціалізуємо в App (тому, що це точка входу)  
     useEffect(() => {
    dispatch(refreshUser()); //goitApi.get("/users/current");
    }, [dispatch]);

    11.4. оновлюэмо UI. В slice: addCase(refreshUser.fulfilled)

12. чистка інтерфейсу, при перезавантаженні щоб не блимало isRefreshing
13. приватний маршрут **PrivateRoute**.jsx
14. публичній маршрут **RestrictedRoute**.jsx (заборона для зареєстрованих користувачам, наприклад заборона на login/register)

15. **Деплой на Vercel**, при маршрутизації додати файл.
    Для правильної роботи додатка з маршрутизацією після розгортання на Vercel, слід додати файл налаштувань vercel.json в кореневу папку проекту.

**--- Виконання д/з #7 ---**

- При створенні нового контакту додавати йому унікальний ідентифікатор більше не потрібно,
  це буде робити сам бекенд і повертати у відповідь об’єкт нового контакту.
  ЗАВДАННЯ:

- замінити reducers на extraReducers filter **?????**
- Мемоізація

_Скопіювали 6 дз._

1. в запитах (файл **operations**) використовуємо **createAsyncThunk**(рядок, функція-запит)
2. (GET) fetchContacts - викликаємо в **contactList** через dispatch та useEffect(()=>{},[])-запускається на стадії монтування
3. також відловлюємо цей запит в **slice**, через extraReducers: (builder) {
   **builder.addCase**(fetch.fulfield(або pending, або rejected), (state, action) => {state.items = action.payload})
   } - builder будує випадки для роботи
4. в **slice** замінить старий selectContacts, рендерить контакти з бекенду
5. для опрацьовування помилки запиту використовуємо **thunkAPI.rejectWithValue()**
6. - прибрати персіст (так як працюємо з сервером, LocalStorage не потрібен)
7. Логіку з компонентив перенесено в selectors.js;
8. селектор створений за допомогою **createSelector** буде **мемоізований**,
   // тобто який перераховує contacts, коли змінюється значення state.contacts
   //або state.filter;
9. createSelector([інші селектрои, що будемо використовувати], (результат виконання селектрорів) => {
   return 'що потрібно зробити'
   })
   <!--  -->
   <!--  -->
   <!--  -->

**--- Виконання д/з #6 ---**

9. створюємо папку redux, в ній файли:
   1.1. store.js,
   1.2. contactSlise.js(initialState, slice(name; initialState,
   reducers) + import { createSlice } from '@reduxjs/toolkit'; selectors (не завжди зручно в slice))
10. експортуємо slice як contactReducer і пидключаємо його в store
11. на **store.js** використовуємо configureStore - для створення store, повертає новий
    об'єкт store
12. на **main** огорнути <Provider store={store}>, (приймає **пропс store**) - зв'язує store з компонентами React, щоб вони могли отримувати доступ до його стану та методів. обертаємо Provider все дерево компонентів (щоб будь-який компонент у додатку міг використовувати стор);
13. useSelector в slice
14. const dispatch = useDispatch(); dispatch(addContact(newContact)) - приклад; newContact - як аргумент. в slice буде action.payload. Відправка екшенів
15. useSelector() - витягуємо дані
16. actions передаємо у компоненти
17. **redux-persist** - (npm i redux-persist) бібліотека як _LocalStorige_
    для Redux (документацію можна знайти в redux-toolkit через пошук 'Use with
    Redux-Persist). (1)другий та третій імпорт з докум.Redux-Persist вставляємо в
    **store**; (2) копіюємо persistConfig, persistedReducer, middleware, persistor -
    вставляємо в **store**; Огорнути App в main; <PersistGate loading={null} persistor={persistor}><App/></PersistGate>

---- Home work #5 маршрутизатор, перехід по сторінкам;

21. **Маршрутизатор React** (npm install react-router-dom); 22. Для правильної роботи додатка з маршрутизацією після розгортання на Vercel: файл налаштувань vercel.json в кореневу папку проекту. Вміст:
    {
    "rewrites": [
    {"source": "/(.*)", "destination": "/"}
    ]
    }

   <!--  ------>

- Loader - npm install react-loader-spinner --save;
- Modal - npm install react-modal
- npm i prop-types - для PropTypes;
- npm install react-router-dom - Маршрутизатор

- **Redux DevTools** (вкладка Redux) - розширення інструментів

<!--  -->

import { IoMdStar } from "react-icons/io";
<IoMdStar />
