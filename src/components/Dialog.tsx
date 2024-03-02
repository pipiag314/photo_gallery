import { forwardRef } from "react";
import { PhotoType } from "../types/photoType";
import style from "./Dialog.module.css";

interface DialogProps {
  toggleModal: () => void;
  photoOnModal: PhotoType | null;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ toggleModal, photoOnModal }, ref) => {

    if(photoOnModal) {
      console.log(photoOnModal.id)
    }
    
    
    return (
      <dialog
        className={style.dialog}
        ref={ref}
        onClick={(e) => e.currentTarget === e.target && toggleModal()}>
        <img
          src={photoOnModal?.urls.full}
          alt={photoOnModal?.alt_description}
        />
        <div>
          <button className={style.close} onClick={() => toggleModal()}>Close</button>
        </div>
      </dialog>
    );
  }
);
export default Dialog;
