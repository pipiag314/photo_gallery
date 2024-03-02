import { useState, useEffect, useContext } from "react";

import { getPhotos, getPhotosByQuery } from "../api/getPhotos";
import { PhotoType } from "../types/photoType";
import { SearchedContext } from "../context/SearchedContext";

export const useGetPhotos = (pageNumber = 1, query = "") => {
  const [result, setResult] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({message: ""});
  const [hasNextPage, setHasNextPage] = useState(false);

  const clearResult = () => {
    setResult([]);
  }

  const { addSearchedText } = useContext(SearchedContext)
  

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({message: ""});

    const controller = new AbortController();
    const { signal } = controller;

    if(query.length === 0) {
      getPhotos(pageNumber, { signal })
          .then((data) => {
              setResult(prev => [...prev, ...data])
              setHasNextPage(Boolean(data.length))
              setIsLoading(false)
          })
          .catch(error => {
              setIsLoading(false);
              if(signal.aborted) return
              setIsError(true);
              setError({ message: error.message})
          })
    } else {
      let typingTimer;

      clearTimeout(typingTimer)
      
      typingTimer = setTimeout(() => {
        getPhotosByQuery(query, pageNumber, {
          signal,
        }).then(data => {
          setResult(prev => [...prev, ...data.results])
          setHasNextPage(Boolean(data.total_pages !== pageNumber))
          setIsLoading(false)
          
          addSearchedText(query);
        }).catch(error => {
          setIsLoading(false);
          if(signal.aborted) return;
          setIsError(true);
          setError({ message: error.message });
        })

      }, 1000)
    }


    return () => controller.abort();
  }, [pageNumber, query]);

  return {
    result,
    isLoading,
    isError,
    error,
    hasNextPage,
    clearResult
  };
};