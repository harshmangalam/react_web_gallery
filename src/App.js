import React, { useRef, useState } from "react";
import shortid from "shortid";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import Error from "./components/Error";
import ImageCapture from "./components/ImageCapture";
import ImageGallary from "./components/ImageGallary";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import theme from "./theme";

function App() {
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [showCapture, setShowCapture] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  const streamRef = useRef();

  async function startMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setShowCapture(true);
    } catch (error) {
      setShowCapture(false);
      setError(error.message);
    }
  }

  function stopMedia() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowCapture(false);
  }

  function handleCapture() {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const base64Data = canvasRef.current.toDataURL();

    canvasRef.current.toBlob((blob) => {
      const blobURL = URL.createObjectURL(blob);
      setImages((images) => [
        { id: shortid.generate(), blobURL, base64Data },
        ...images,
      ]);
    });
  }

  function removeImage(id) {
    const filterImages = images.filter((img) => img.id !== id);

    setImages(filterImages);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        d="flex"
        flexDir="column"
        justifyContent="space-between"
        minH="100vh"
        py={4}
      >
        <header>
          <AppHeader />
          {error && <Error error={error} setError={setError} />}
        </header>

        <Container>
          <ImageCapture
            canvasRef={canvasRef}
            videoRef={videoRef}
            startMedia={startMedia}
            stopMedia={stopMedia}
            handleCapture={handleCapture}
            showCapture={showCapture}
          />
          <ImageGallary images={images} removeImage={removeImage} />
        </Container>
        <AppFooter />
      </Box>
    </ChakraProvider>
  );
}

export default App;
