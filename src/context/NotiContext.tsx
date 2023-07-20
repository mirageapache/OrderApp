import { createContext, useContext, useState } from "react";

// 定義noti_message型別
interface notiMsgType {
  type: string;
  message: string;
}
// 定義Context的型別
interface NotiContextType {
  is_alert:boolean ;
  setIsAlert: (mode: boolean) => void;
  noti_message:notiMsgType ;
  setNotiMessage: (mode: notiMsgType) => void;
}
// 定義Provider 元件 Props 的型別
interface ProviderProps {
  children: React.ReactNode;
}

const defaultValue = {
  is_alert: false,
  setIsAlert: ()=>{},
  noti_message: {type:'',message:''},
  setNotiMessage: ()=>{}
};
// noti_message: {type:'success',message:'登入成功！'}
// type: 'success' / 'error' / 'warning' / 'info'

const NotiContext = createContext<NotiContextType>(defaultValue);
export const useNoti = () => useContext(NotiContext);

export const NotiProvider = ({ children }:ProviderProps) => {
  const [is_alert, setIsAlert] = useState<boolean>(false); //顯示通知
  const [noti_message, setNotiMessage] = useState<notiMsgType>({type:'',message:''}); //通知內容
  return (
    <NotiContext.Provider 
      value={{
          is_alert,
          setIsAlert,
          noti_message,
          setNotiMessage
        }}
      >
      {children}
    </NotiContext.Provider>
  );
};
