import { PhotoType } from "../types/photoType";
import { forwardRef } from "react";
import style from "./PhotoCard.module.css";

interface PhotoCardProps {
  photo: PhotoType;
}

const PhotoCard = forwardRef<HTMLDivElement, PhotoCardProps>(
  ({ photo }, ref) => {
    const componentBody = <img className={style.PhotoCard_img} src={photo.urls.small} alt={photo.alt_description} />;

    const content = ref ? (
      <div ref={ref}>{componentBody}</div>
    ) : (
      <div>{componentBody}</div>
    );

    return content;
  }
);

export default PhotoCard;
