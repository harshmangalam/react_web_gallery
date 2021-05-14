import {
  Button,
  Modal,
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function ImageCapture({
  videoRef,
  canvasRef,
  startMedia,
  handleCapture,
  stopMedia,
  showCapture
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleModalOpen() {
    startMedia();
    onOpen();
  }
  return (
    <>
      <Box textAlign="center" mt={4}>
      <Button onClick={handleModalOpen} colorScheme="blue">Capture Image</Button>
      </Box>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Capture Your Image</ModalHeader>
          <ModalCloseButton onClick={() => stopMedia()} />
          <ModalBody>
            <video playsInline autoPlay controls={false} ref={videoRef} />

            <canvas ref={canvasRef} hidden={true} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                stopMedia();
                onClose();
              }}
            >
              Close
            </Button>
            <Button disabled={!showCapture} colorScheme="blue" onClick={() => handleCapture()}>
              Capture
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageCapture;
