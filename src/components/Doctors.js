import { Link } from "react-router-dom";
import { Box,Text,Flex } from "@mantine/core";
function Doctors(){
    return <Flex justify={'space-between'}>
    <Link to={'/doctor1'}>
    <Box w={300}>
<img width='100%' src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg" />
    </Box>
   <Text align='center'>Doctor 1</Text> 
    </Link>
    <Link to={'/doctor2'}>
    <Box w={300}>
<img width='100%' src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg" />
    </Box>
    <Text align='center' >Doctor 2</Text>
    </Link>
    </Flex>
}
export default Doctors;