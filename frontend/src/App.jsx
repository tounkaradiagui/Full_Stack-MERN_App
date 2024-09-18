import { Box, useColorModeValue } from "@chakra-ui/react"
import Navbar from './components/Navbar';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProduct from './pages/CreateProduct';


function App() {

  return (
    <Box minH={"100vh"}  bg={useColorModeValue("gray.300", "gray.900")}>
      {/* Navbar */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Box>
  )
}

export default App
