import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import styles from "../styles/Modal.module.css";

import Button from "./Button";

export default forwardRef(function Modal(
  { visibility = true, setVisibility },
  ref,
) {
  const [localConfig, setLocalConfig] = useState({
    variant: "alert",
    buttonTexts: [],
    title: "Default title",
    text: "Default text",
    setButtonClick: () => {
      console.warn(
        "You're seeing this probably because you didn't pass 'setButtonClick' function as a prop to the Modal component",
      );
    },
    modalInput: "",
    setModalInput: () => {
      console.warn(
        "You're seeing this probably because you didn't pass the 'setModalInput' function as a prop to the Modal component",
      );
    },
  });

  const handleButtonClick = (btnNum) => {
    localConfig.setButtonClick?.(btnNum);
    setVisibility(false);
  };

  useImperativeHandle(ref, () => ({
    modifyModal: (newConfig) => {
      setLocalConfig((prev) => ({ ...prev, ...newConfig }));
    },
  }));

  const variants = {
    alert: "alertModal",
    warning: "warningModal",
    input: "inputModal",
  };

  return (
    <>
      {visibility && (
        <div className={styles.modalOverlay}>
          <div
            className={`${styles.wrapper} ${styles[variants[localConfig.variant] || "alertModal"]}`}
          >
            <h2 className={styles.title}>{localConfig.title}</h2>

            <p className={styles.text}>{localConfig.text}</p>

            {localConfig.variant == "warning" ? (
              <div className={styles.buttons}>
                <Button
                  variant="destructive"
                  onClick={() => handleButtonClick(0)}
                >
                  {localConfig.buttonTexts[0] || "Yes"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleButtonClick(1)}
                >
                  {localConfig.buttonTexts[1] || "Cancel"}
                </Button>
              </div>
            ) : localConfig.variant == "alert" ? (
              <div className={styles.buttons}>
                <Button variant="success" onClick={() => handleButtonClick(0)}>
                  {localConfig.buttonTexts[0] || "Okay"}
                </Button>
              </div>
            ) : localConfig.variant == "input" ? (
              <div className={styles.miniWrapper}>
                <input
                  type="text"
                  onChange={(e) => localConfig.setModalInput(e.target.value)}
                  value={localConfig.modalInput}
                />
                <div>
                  <Button
                    variant="primary"
                    onClick={() => handleButtonClick(0)}
                  >
                    {localConfig.buttonTexts[0] || "Done"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleButtonClick(1)}
                  >
                    {localConfig.buttonTexts[1] || "Cancel"}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
});
