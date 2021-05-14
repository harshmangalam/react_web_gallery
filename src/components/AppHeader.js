import { Box, Heading, Text } from "@chakra-ui/layout";

function AppHeader() {
  return (
    <Box textAlign="center" mt={4}>
      <Heading color="blue.500" size="2xl" mb={2}>
        Web Image Gallary
      </Heading>
      <Text fontSize="xl">Click image and enjoy Web Gallary</Text>
    </Box>
  );
}

export default AppHeader;
