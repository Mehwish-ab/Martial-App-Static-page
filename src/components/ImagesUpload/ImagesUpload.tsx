import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ImagesUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);

  const selectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let images: Array<string> = [];
    let files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }
      setSelectedFiles(files);
      setImagePreviews(images);
    }
  };

  const responsive = {
    0: { items: 1 },
  };

  const items = imagePreviews
    ? imagePreviews.map((img, i) => {
        return <img className="preview" src={img} alt={"image-" + i} key={i} />;
      })
    : [];

  console.log({ selectedFiles });
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*, video/*"
        onChange={selectImages}
      />
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        disableDotsControls
        controlsStrategy="alternate"
      />
    </>
  );
};

export default ImagesUpload;
