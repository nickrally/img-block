import React, { useState, useMemo } from "react";
import Image from "./Image";
import ImageBlock from "./ImageBlock";
import paintings from "./img";

function App() {
  const images = useMemo(
    () => [
      {
        id: 0,
        src: paintings.cavePainting,
      },
      {
        id: 1,
        src: paintings.lasMeninasVelazquez,
      },
      {
        id: 2,
        src: paintings.daughtersOfSargent,
      },
      {
        id: 3,
        src: paintings.lasMeninasPicasso,
      },
    ],
    []
  );

  const NUMBER_OF_BLOCKS = 3;

  const [hashes, setHashes] = useState([]);
  const zeroHash = "0".repeat(64);

  const getPrevHashById = (id) => {
    const found = hashes.filter((item) => id === item.id);
    if (found.length === 1) {
      return found[0].hash;
    }
    return "";
  };

  return (
    <div className="main">
      <div className="repo">
        {images.map((image) => (
          <Image key={image.id} img={image.src} id={image.id} />
        ))}
      </div>
      <div className="blocks">
        {[...Array(NUMBER_OF_BLOCKS)].map((e, i) => (
          <ImageBlock
            key={i}
            prevHash={i === 0 ? zeroHash : getPrevHashById(i - 1)}
            hashes={hashes}
            setHashes={setHashes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
