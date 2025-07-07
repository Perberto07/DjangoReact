import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = ({ onScanned }) => {
  const html5QrCodeRef = useRef(null);
  const isScannerRunningRef = useRef(false);
  const onScannedRef = useRef(onScanned);
  const [isScanning, setIsScanning] = useState(false);

  // Update the ref when onScanned changes
  useEffect(() => {
    onScannedRef.current = onScanned;
  }, [onScanned]);

  useEffect(() => {
    const qrRegionId = "html5qr-code-region";
    const config = {
      fps: 10, // Reduced for stability
      qrbox: 300,
      experimentalFeatures: { useBarCodeDetectorIfSupported: true },
    };
    let isComponentMounted = true;

    const initializeScanner = async () => {
      try {
        html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

        const devices = await Html5Qrcode.getCameras();

        if (devices && devices.length > 0 && isComponentMounted) {
          const backCamera = devices.find((device) =>
            device.label.toLowerCase().includes("back")
          );
          const cameraId = backCamera ? backCamera.id : devices[0].id;

          await html5QrCodeRef.current.start(
            cameraId,
            config,
            (decodedText) => {
              console.log("Decoded text:", decodedText);
              // Use the ref instead of the prop directly
              if (onScannedRef.current) {
                onScannedRef.current(decodedText);
              }
              // Don't stop the scanner - keep it running
            },
            (errorMessage) => {
              console.debug("Scan error:", errorMessage);
            }
          );

          if (isComponentMounted) {
            isScannerRunningRef.current = true;
            setIsScanning(true);
          }
        }
      } catch (err) {
        console.error("Failed to start scanner:", err);
      }
    };

    initializeScanner();

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
  }, []); // Remove onScanned from dependencies

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2 text-center">Scan Barcode</h3>

      <div
        id="html5qr-code-region"
        className="w-full rounded-md overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '100%',
          height: 'calc(100vw - 4rem)', // fills most of screen width minus padding
          maxHeight: '400px',
          margin: '0 auto'
        }}
      />

      {!isScanning && <p className="text-center text-gray-600 mt-2">Loading camera...</p>}
      {isScanning && <p className="text-center text-green-600 text-sm mt-2">Ready to scan</p>}
    </div>
  );

};

export default BarcodeScanner;