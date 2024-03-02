import { forwardRef, useEffect, useState } from "react";
import { PhotoType } from "../types/photoType";
import style from "./Dialog.module.css";
import { getPhotosStatistics } from "../api/getPhotos";

interface DialogProps {
  toggleModal: () => void;
  photoOnModal: PhotoType | null;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ toggleModal, photoOnModal }, ref) => {

    const [likes, setLikes] = useState(0);
    const [downloads, setDownloads] = useState(0);
    const [views, setViews] = useState(0);
    
    useEffect(() => {
      setLikes(0)
      setDownloads(0)
      setViews(0)
      
      if (photoOnModal) {
        getPhotosStatistics(photoOnModal.id)
          .then(data => {
            setLikes(data.likes.total)
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
          Close
        </button>
        <div className={style.stats}>
          <p>Likes: {likes}</p>
          <p>Downloads: {downloads}</p>
          <p>Views: {views}</p>
        </div>
      </dialog>
    );
  }
);
export default Dialog;
