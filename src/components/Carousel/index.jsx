import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import exhibit5 from "../../static/exhibit5.jpeg";
import exhibit4 from "../../static/exhibit4.png";
import exhibit3 from "../../static/exhibit3.jpeg";
import exhibit2 from "../../static/exhibit2.jpeg";

function CarouselShowcase() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        alignContent: "center",
        textAlign: "center",
        height: "500px",
      }}
    >
      <Carousel
        plugins={["arrows", "centered", "infinite"]}
        animationSpeed={250}
      >
        <img style={{ height: "500px" }} src={exhibit5} alt="exhibit5" />
        <img style={{ height: "500px" }} src={exhibit4} alt="exhibit4" />
        <img style={{ height: "500px" }} src={exhibit3} alt="exhibit3" />
        <img style={{ height: "500px" }} src={exhibit2} alt="exhibit2" />
      </Carousel>
    </div>
  );
}

export default CarouselShowcase;
