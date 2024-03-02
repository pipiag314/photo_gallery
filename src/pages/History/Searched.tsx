import { Link, useParams } from "react-router-dom";
import style from "./Searched.module.css";
import { useGetPhotos } from "../../hooks/useGetPhotos";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchedContext } from "../../context/SearchedContext";
import PhotoCard from "../../components/PhotoCard";
import { PhotoType } from "../../types/photoType";
import Dialog from "../../components/Dialog";
import { useInView } from "../../hooks/useInView";

const Searched = () => {
  const { query } = useParams();

  const [photoOnModal, setPhotoOnModal] = useState<PhotoType | null>(null);

  const [page, setPage] = useState(1);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastPhotoRef = useRef<HTMLDivElement>(null);

  const inView = useInView(lastPhotoRef, { threshold: 0.5 });

  const { searchedText } = useContext(SearchedContext);
  const [text] = searchedText.filter((t) => t.includes(query!));

  const { result, isLoading, hasNextPage, isError, error } = useGetPhotos(
    page,
    text
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  const toggleModal = (photo?: PhotoType) => {
    if (!dialogRef.current) return;
    if (dialogRef.current.hasAttribute("open") && photoOnModal) {
      setPhotoOnModal(null);
      dialogRef.current.close();
    } else {
      if (!photo) return;
      setPhotoOnModal(photo);
      dialogRef.current.showModal();
    }
  };

  if(isError) {
    return <div>{error.message}</div>
  }
  
  return (
    <div className={style.container}>
      <Link className={style.back} to="/history">
        Back
      </Link>
      <div className={style.gallery_container}>
        {result.map((photo, i) => (
          <div
            className={style.photoCard_container}
            onClick={() => toggleModal(photo)}
            key={photo.id + i}>
            {result.length === i + 1 ? (
              <PhotoCard ref={lastPhotoRef} photo={photo} />
            ) : (
              <PhotoCard photo={photo} />
            )}
          </div>
        ))}
      </div>
      {isLoading && <div>Loading...</div>}
      <Dialog
        ref={dialogRef}
        toggleModal={toggleModal}
        photoOnModal={photoOnModal}
      />
    </div>
  );
};
export default Searched;
