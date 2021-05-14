import { Box, Button, HStack, Image, SimpleGrid } from "@chakra-ui/react";

function ImageGallary({ images, removeImage }) {
  return (
    <SimpleGrid columns={[1, 2]} spacing={3} mt={10}>
      {images.map((image) => (
        <Box shadow="md" p={2} key={image.id}>
          <Image src={image.blobURL} alt="Image" />
          <HStack mt={2}>
            <Button
              colorScheme="red"
              size="xs"
              onClick={() => removeImage(image.id)}
            >
              Remove
            </Button>
            <Button
              as="a"
              href={image.base64Data}
              colorScheme="blue"
              size="xs"
              download={image.id + ".png"}
            >
              Download
            </Button>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ImageGallary;
