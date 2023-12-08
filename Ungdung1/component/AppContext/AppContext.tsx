import React, {createContext, useState} from 'react';

//const AppContext = createContext(defaultValue);
//export const AppContext = React.createContext();
interface AppContextType {
  emailname: string;
  setEmailname: (emailname: string) => void;
  idProduct: string;
  setIdproduct: (idProduct: string) => void;
}

export const AppContext = createContext<AppContextType>({
  emailname: '',
  setEmailname: () => {},
  idProduct: '',
  setIdproduct: () => {},
});
const AppProvider = ({children}:any) => {
  const [emailname, setEmailname] = useState('');
  const [idProduct, setIdproduct] = useState('');


  return (
    <AppContext.Provider value={{emailname, setEmailname, idProduct, setIdproduct}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;