import { createContext, useContext, useState } from "react";

// 定義 Context 中 value 的型別
interface SettingContextType {
  menuMode: string;
  setmenuMode: (mode: string) => void;
  modelState: boolean;
  setModelState: (mode: boolean) => void;
  itemId: string;
  setItemId: (mode: string) => void;
}

// 設定context變數的初始值
const defaultValue: SettingContextType = {
  menuMode: "list-mode",
  setmenuMode: () => {},
  modelState: false,
  setModelState: () => {},
  itemId: '',
  setItemId: () => {}
};

// 定義 Provider 元件 Props 的型別
interface ProviderProps {
  children: React.ReactNode;
}

const SettingContext = createContext<SettingContextType>(defaultValue);
export const useSetting = () => useContext(SettingContext);

export const SettingProvider = ({children}:ProviderProps) => {
  const [menuMode, setmenuMode] = useState<string>('list-mode'); // menu顯示模式 list & grid
  const [modelState, setModelState] = useState<boolean>(false); // 控制item model 開啟/關閉
  const [itemId, setItemId] = useState<string>(''); // 儲存item model欲顯示的item id

  return (
    <SettingContext.Provider 
      value={{
          menuMode,
          setmenuMode,
          modelState,
          setModelState,
          itemId,
          setItemId
        }}
      >
      {children}
    </SettingContext.Provider>
  );
};
