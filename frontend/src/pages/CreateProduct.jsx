import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

import { useToast } from '@chakra-ui/react'


const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const {createProduct} = useProductStore();

  // const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleNewProduct = async () => {
    const newProduct = {
      name: name,
      price: price,
      image: image,
    };
    const {success, message} = await createProduct(newProduct)
    if(success) {
      toast({
        title: 'Félicitations.',
        description: message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Erreur.',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    setName("");
    setPrice("");
    setImage("");
    console.log("success: ", success);
    console.log("message: ", message);
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Ajouter un nouveau produit
        </Heading>
      </VStack>

      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        rounded={"lg"}
        shadow={"md"}
      >
        <VStack spacing={4}>
          <Input
            placeholder="Nom du produit"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // value={newProduct.name}
            // onChange={(e) =>
            //   setNewProduct({ ...newProduct, name: e.target.name })
            // }
          />
          <Input
            placeholder='Prix'
            name='price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            placeholder="URL du produit"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button colorScheme={"blue"} w="full" onClick={handleNewProduct}>
            Ajouter
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreateProduct;
