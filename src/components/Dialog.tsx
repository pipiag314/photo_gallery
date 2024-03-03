import { forwardRef, useEffect, useState } from "react";
import { PhotoType } from "../types/photoType";
import style from "./Dialog.module.css";
import { getPhotosStatistics } from "../api/getPhotos";
import { numberFormatter } from "../utils/numberFormatter";

interface DialogProps {
  toggleModal: () => void;
  photoOnModal: PhotoType | null;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ toggleModal, photoOnModal }, ref) => {
    const [downloads, setDownloads] = useState(0);
    const [views, setViews] = useState(0);
    
    useEffect(() => {
      setDownloads(0)
      setViews(0)
      
      if (photoOnModal) {
        getPhotosStatistics(photoOnModal.id)
          .then(data => {
            setDownloads(data.downloads.total)
            setViews(data.views.total)
          })
          .catch(error => {
            console.log(error);
          })
      }
    }, [photoOnModal])
    

    return (
      <dialog
        className={style.dialog}
        ref={ref}
        onClick={(e) => e.currentTarget === e.target && toggleModal()}>
        <img
          src={photoOnModal?.urls.full}
          alt={photoOnModal?.alt_description}
        />
        <button className={style.close} onClick={() => toggleModal()}>
          ❌
        </button>
        <div className={style.stats}>
          <p>Likes: {numberFormatter(photoOnModal?.likes!) }</p>
          <p>Downloads: {numberFormatter(downloads)}</p>
          <p>Views: {numberFormatter(views)}</p>
        </div>
      </dialog>
    );
  }
);
export default Dialog;
