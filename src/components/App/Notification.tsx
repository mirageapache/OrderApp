import { ReactNode, useEffect } from "react";
import { useNoti } from "context/NotiContext";
import "styles/app.scss";
//svg
import { ReactComponent as IconNotiSuccess } from "assets/icons/success.svg";
import { ReactComponent as IconNotiError } from "assets/icons/error.svg";
import { ReactComponent as IconNotiWarning } from "assets/icons/warning.svg";
import { ReactComponent as IconNotiInfo } from "assets/icons/info.svg";

export default function Notification() {
  const { is_alert, setIsAlert, noti_message } = useNoti();
  let icon: ReactNode = null;

  switch (noti_message.type) {
    case "success":
      icon = (
        <span className="noti_icon success_icon">
          <IconNotiSuccess className="icon" />
        </span>
      );
      break;
    case "error":
      icon = (
        <span className="noti_icon error_icon">
          {" "}
          <IconNotiError className="icon" />
        </span>
      );
      break;
    case "warning":
      icon = (
        <span className="noti_icon warning_icon">
          {" "}
          <IconNotiWarning className="icon" />
        </span>
      );
      break;
    case "info":
      icon = (
        <span className="noti_icon info_icon">
          {" "}
          <IconNotiInfo className="icon" />
        </span>
      );
      break;
    default:
      icon = <></>;
      break;
  }

  useEffect(() => {
    if (is_alert) {
      setTimeout(() => {
        setIsAlert(false);
      }, 2500);
    }
  }, [is_alert, setIsAlert]);

  return (
    <div className="noti_panel">
      <div className="notification">
        <div>{icon}</div>
        <p className="noti_text">{noti_message.message}</p>
      </div>
    </div>
  );
}
