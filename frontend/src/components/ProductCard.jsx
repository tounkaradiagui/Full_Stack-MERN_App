import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

//   Check const {success, message} =================>
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
        toast({
            title: 'Félicitations.',
            description: message,
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
    } else {
        toast({
            title: 'Désolé.',
            description: message,
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }
    
    
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct)
    onClose();
    if (success) {
        toast({
            title: 'Félicitations.',
            description: message,
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
    } else {
        toast({
            title: 'Désolé.',
            description: message,
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }
  }
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.image}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
            {product.name}
            </Heading>

            <Text fontSize={"xl"} fontWeight={"bold"} color={textColor} mb={4}>
            {product.price}
            </Text>

            <HStack spacing={2}>
            <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme="blue" />
            <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDeleteProduct(product._id)}
                colorScheme="red"
            />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Modifier un produit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={4}>
                <Input
                placeholder='Nom du produit'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            />
            <Input
                placeholder='Prix'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                />
            <Input
                placeholder='URL Image'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
            />
                </VStack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                    Valider
                </Button>
                <Button onClick={onClose} variant='ghost'>Annuler</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  );
};

export default ProductCard;
