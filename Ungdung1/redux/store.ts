// import { configureStore } from '@reduxjs/toolkit';
// // import categoryReducer from './path/to/categorySlice';
// import categorySlice from './Reducer/categorySlice';

// const store = configureStore({
//   reducer: {
//     category: categorySlice,
//     // Nếu bạn có các slice khác, hãy thêm chúng vào đây
//   },
// });

// export default store;
// export type AppDispatch = typeof store.dispatch
import {applyMiddleware, createStore} from 'redux';
// import rootReducer from './reducer/rootReducer';
import rootReducer from './Reducer/RootReducer';
import {thunk} from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
