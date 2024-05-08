import React from 'react';
import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const HomePage = () => {
    return (
        <div className='bg-teal-200' style={{ display: 'flex', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', padding: '50px' }}>
            {/* Signup/Login Section */}
            <Container maxW='xl' centerContent>
                <Box w='100%' p={4} borderRadius='lg' borderWidth="1px" className="bg-white" >
                    <Text fontSize="4xl" className='bg-gray-900 text-white rounded-lg p-3' textAlign={'center'} mb={8}>Digital Ballot</Text>
                    <Tabs variant='soft-rounded' colorScheme='teal' >
                        <TabList>
                            <Tab width="50%">SignUp</Tab>
                            <Tab width="50%">Login</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </div>
    );
};

export default HomePage;
