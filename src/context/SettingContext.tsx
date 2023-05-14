import { createContext, useContext, useState } from "react";

// 定義 Context 中 value 的型別
interface SettingContextType {
  menuMode: string;
  setmenuMode: (mode: string) => void;
}

const defaultValue: SettingContextType = {
  menuMode: "list",
  setmenuMode: () => {}
};

// 定義 Provider 元件 Props 的型別
interface ProviderProps {
  children: React.ReactNode;
}

const SettingContext = createContext<SettingContextType>(defaultValue);
export const useSetting = () => useContext(SettingContext);

export const SettingProvider = ({children}:ProviderProps) => {
  const [menuMode, setmenuMode] = useState<string>('list'); //menu顯示模式 list & grid

  return (
    <SettingContext.Provider 
      value={{
          menuMode,
          setmenuMode
        }}
      >
      {children}
    </SettingContext.Provider>
  );
};
