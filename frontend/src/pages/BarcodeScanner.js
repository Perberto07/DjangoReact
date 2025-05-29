import  { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = ({ onScanned }) => {
  const html5QrCodeRef = useRef(null);
  const isScannerRunningRef = useRef(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const qrRegionId = "html5qr-code-region";
    const config = {
      fps: 15,
      qrbox: 300, // square scanning box 300x300
      experimentalFeatures: { useBarCodeDetectorIfSupported: true },
    };
    let isComponentMounted = true;

    html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0 && isComponentMounted) {
          // Prefer back camera if available
          const backCamera = devices.find((device) =>
            device.label.toLowerCase().includes("back")
          );
          const cameraId = backCamera ? backCamera.id : devices[0].id;

          html5QrCodeRef.current
            .start(
              cameraId,
              config,
              (decodedText) => {
                console.log("Decoded text:", decodedText);
                if (onScanned) onScanned(decodedText);

                if (isScannerRunningRef.current) {
                  html5QrCodeRef.current
                    .stop()
                    .then(() => {
                      console.log("Scanner stopped");
                      isScannerRunningRef.current = false;
                      setIsScanning(false);
                    })
                    .catch((err) => {
                      console.error("Error stopping scanner:", err);
                    });
                }
              },
              (errorMessage) => {
                // Scan failure feedback (normal during scanning)
                console.debug("Scan error:", errorMessage);
              }
            )
            .then(() => {
              if (isComponentMounted) {
                isScannerRunningRef.current = true;
                setIsScanning(true);
              }
            })
            .catch((err) => {
              console.error("Failed to start scanner:", err);
            });
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });

    return () => {
      isComponentMounted = false;
      if (html5QrCodeRef.current && isScannerRunningRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => {
            html5QrCodeRef.current.clear();
            isScannerRunningRef.current = false;
            setIsScanning(false);
          })
          .catch((err) => {
            console.warn("Error stopping scanner on cleanup:", err);
          });
      }
    };
  }, [onScanned]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Scan Barcode</h3>
      <div id="html5qr-code-region" style={{ width: "320px", margin: "auto" }} />
      {!isScanning && <p>Loading camera...</p>}
    </div>
  );
};

export default BarcodeScanner;
