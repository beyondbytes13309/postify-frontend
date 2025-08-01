import { useEffect, useRef } from "react";
import styles from "../styles/Options.module.css";
import { createPortal } from "react-dom";

export default function Options({ options = [], position, setShowOptions }) {
  const menuRef = useRef()

  useEffect(() => {
    const handleClick = (event) => {
      if (!menuRef?.current?.contains(event.target)) {
        setShowOptions(false)
      } 
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const menu = (
    <div
      className={styles.optionWrapper}
      style={{ top: position.y+4 || 0, left: position.x+4 || 0 }}
      ref={menuRef}
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
