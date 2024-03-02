import { useEffect, useRef, useState } from "react";

import style from "./Home.module.css";
import { useGetPhotos } from "../../hooks/useGetPhotos";
import PhotoCard from "../../components/PhotoCard";
import { useInView } from "../../hooks/useInView";
import { PhotoType } from "../../types/photoType";
import Dialog from "../../components/Dialog";

const Home = () => {
  const [photoOnModal, setPhotoOnModal] = useState<PhotoType | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { result, isLoading, isError, error, hasNextPage, clearResult } =
    useGetPhotos(page, query);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const lastPhotoRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lastPhotoRef, { threshold: 0.5 });

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearResult();
    setQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.searchbox}>
        <h1>Search Photo</h1>
        <input
          onChange={handleSearch}
          value={query}
          type="text"
          placeholder="Search photos"
        />
      </div>
      <div className={style.gallery_container}>
        {result.map((photo, i) => (
          <div className={style.photoCard_container} onClick={() => toggleModal(photo)} key={photo.id + i}>
            {result.length === i + 1 ? (
              <PhotoCard ref={lastPhotoRef} photo={photo} />
            ) : (
              <PhotoCard photo={photo} />
            )}
          </div>
        ))}
      </div>
      {(result.length === 0 && !isLoading) && <h1>No Photos Found</h1>}
      {isLoading && <h1>Loading...</h1>}
      <Dialog
        ref={dialogRef}
        toggleModal={toggleModal}
        photoOnModal={photoOnModal}
      />
    </div>
  );
};
export default Home;
