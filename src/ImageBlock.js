import React, { useState, useEffect, useCallback } from "react";
import NonceBox from "./NonceBox";
import Hash from "./Hash";
import Image from "./Image";
import exifr from "exifr";
import { useDrop } from "react-dnd";

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

const ImageBlock = ({ blockId, prevHash, hashes, setHashes }) => {
  const [nonce, setNonce] = useState(0);
  const [exifrData, setExifrData] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [hash, setHash] = useState("");

  const [blockImage, setBlockImage] = useState(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "picture",
    drop: (item) => addImageToBlock(item),
  }));

  const addImageToBlock = (image) => {
    setBlockImage(image);
  };

  const getHash = useCallback(() => {
    if (isMining) {
      exifr
        .parse(blockImage.src)
        .then((data) => setExifrData(JSON.stringify(data)));
      digestMessage(exifrData.concat(nonce).concat(prevHash)).then(
        (digestHex) => {
          if (!digestHex.startsWith("000")) {
            setNonce((prev) => prev + 1);
          } else {
            //setIsMining((prev) => !prev);
            setIsMining(false);
            setHash(digestHex);
            setHashes([...hashes, digestHex]);
          }
        }
      );
    }
  }, [
    blockImage?.src,
    nonce,
    exifrData,
    isMining,
    hashes,
    setHashes,
    prevHash,
  ]);

  const handleClick = () => {
    //setIsMining((prev) => !prev);
    setIsMining(true);
  };

  useEffect(() => {
    getHash();
  }, [getHash]);

  return (
    <>
      <div className="foo">
        <div className="frame" ref={drop}>
          <div className="block">
            <NonceBox nonce={nonce} setNonce={setNonce} />
            <button className="btn" onClick={handleClick}>
              Mine
            </button>
          </div>
          <Hash blockId={blockId} hash={hash} prev={prevHash} />
          <div className="picture-frame">
            {blockImage && <Image img={blockImage?.src} id={blockImage?.id} />}
          </div>
        </div>
        <div className="debug">
          State (debug) :<p>isMining: {isMining.toString()}</p>
        </div>
      </div>
    </>
  );
};

export default ImageBlock;
