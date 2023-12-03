import React, {createContext, useState} from 'react';

//const AppContext = createContext(defaultValue);
//export const AppContext = React.createContext();
interface AppContextType {
  emailname: string;
  setEmailname: (emailname: string) => void;
}

export const AppContext = createContext<AppContextType>({
  emailname: '',
  setEmailname: () => {},
});
const AppProvider = ({children}:any) => {
  const [emailname, setEmailname] = useState('');

  return (
    <AppContext.Provider value={{emailname, setEmailname}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;