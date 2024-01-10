import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { DocumentData } from 'firebase/firestore';

// interface cateState {
//     cate: DocumentData[];
//   }
const initialState  = {
    cateList: [],
  };
// // Tạo async thunk để lấy danh sách category từ Firestore
// export const fetchCategories = createAsyncThunk(
//   'category/fetchCategories',
//   async () => {
//     const snapshot = await firestore().collection('Category').get();
//     const items = snapshot.docs.map(doc => doc.data());
//     return items;
//   }
// );

// Khởi tạo slice cho category
// const categorySlice = createSlice({
//   name: 'category',
//   initialState,
// // initialState: [] as DocumentData[],
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(fetchCategories.fulfilled, (state, action) => {
//         return {
//             ...state,
//             items: action.payload,
//           };
//     });
//   }
// });
const Reducer = (state=initialState, action) =>{
  switch (action.type) {
    case 'GET_CATEGORY':
      return {
        ...state,
        cateList: action.payload,
      };
      default:
        return state;
    }
}

// Export action và selector từ slice
// export const {} = categorySlice.actions;
// export const selectCategories = (state: { category: any; }) => state.category;
export default Reducer
// export const {} = Reducer.actions;
// export default Reducer.reducer;
// Export reducer của slice
// export default categorySlice.reducer;