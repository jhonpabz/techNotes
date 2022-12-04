import { useEffect } from "react";

//Used to change title. You can set title in every pages
const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
