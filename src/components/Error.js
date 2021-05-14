import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

function Error({ error,setError }) {
  return (
    <Alert status="error" maxW="md" m="auto" mt={4}>
      <AlertIcon />
      {error}
      <CloseButton
        onClick={() => setError("")}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>
  );
}

export default Error;
