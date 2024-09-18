
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const {fetchProduct, products} = useProductStore();

    useEffect(() => {
        fetchProduct()
    }, [fetchProduct]);

    console.log("List de products", products);
  return (
    <Container maxW="container.xl" py={12}>
        <VStack spacing={4}>
            <Text
                fontSize={"30"}
                fontWeight={"bod"}
                // bgGradient={"linear(to-r, cyan.400, blue.500"}
                textAlign={"center"}
            >
                Liste de produits
            </Text>


            {products.length ? (
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w={"full"}
                
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}

                </SimpleGrid>
            ) : (
                <Text>Il n'y a pas de produits

                    <Link to={"/create"}>
                        <Text as={"span"} color={"blue.500"} _hover={{textDecoration: "underline"}}>Créer un produit</Text>
                    </Link>
                </Text>
            )}
        </VStack>
    </Container>
  )
}

export default HomePage