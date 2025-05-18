import React, { useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

const BarcodeScanner = ({ onScanned }) => {
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          onScanned(code.data);
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [onScanned]);

  useEffect(() => {
    intervalRef.current = setInterval(capture, 1000); // scan every 1 sec
    return () => clearInterval(intervalRef.current);
  }, [capture]);

  return (
    <div>
      <h3>Scan Barcode</h3>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        height={300}
      />
    </div>
  );
};

export default BarcodeScanner;
