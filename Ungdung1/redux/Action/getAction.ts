import firestore from '@react-native-firebase/firestore';

export const getCategory = (restaurants: any) => ({
    type: 'GET_CATEGORY',
    payload: restaurants,
  });

  export const getAllCategory = () => {
    return async dispatch => {
      try {
        const snapshot = await firestore().collection('Category').get();
    const items = snapshot.docs.map(doc => (
      {
        ...doc.data(),
        id: doc.id,
      }
    ));
  
        dispatch(getCategory(items));
      } catch (error) {
        console.error('Error :', error);
      }
    };
  };