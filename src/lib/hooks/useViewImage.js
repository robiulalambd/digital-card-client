import { BASE_URL } from "../global";

const useViewImage = () => {
  const viewImg = (img) => {
    if (img instanceof File && img.type.startsWith("image/")) {
      return URL.createObjectURL(
        new Blob([img], { type: "application/octet-stream" })
      );
    } else {
      return img;
    }
  };
  return { viewImg };
};

export default useViewImage;
