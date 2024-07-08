import { Image } from "@/types/dataTypes";
import { Carousel } from "antd";

interface Props {
  image: Image[] | undefined;
}

export default function CarouselImage({ image }: Props): JSX.Element {
  if (!image) return <></>;

  const contentStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
    color: "black",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <Carousel
      autoplay
      infinite
      arrows
      initialSlide={0}
    >
      {image?.map((image) => (
        <div
          key={image.id}
          style={contentStyle}
        >
          <img
            src={image.image}
            alt={image?.image}
          />
        </div>
      ))}
    </Carousel>
  );
}
