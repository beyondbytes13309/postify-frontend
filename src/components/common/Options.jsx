import styles from "../styles/Options.module.css";
import { createPortal } from "react-dom";

export default function Options({ options = [], position, setShowOptions }) {
  const menu = (
    <div
      className={styles.optionWrapper}
      style={{ top: position.y || 0, left: position.x || 0 }}
    >
      {options.map((option, index) => (
        <button
          className={styles.option}
          key={index}
          onClick={() => {
            typeof option.callback == "function" && option?.callback?.();
            setShowOptions(false);
          }}
        >
          {option.text || "Default Text"}
        </button>
      ))}
    </div>
  );

  return <>{createPortal(menu, document.body)}</>;
}
