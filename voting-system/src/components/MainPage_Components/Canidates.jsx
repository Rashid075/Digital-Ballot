import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { candidateDB } from "../../Firebase";
import {
  Heading,
  Stack,
  Text,
  Image,
  Card,
  CardBody,
  Button,
  Box, // Import Box component from Chakra UI
} from "@chakra-ui/react";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const querySnapshot = await getDocs(collection(candidateDB, "CandidatesData"));
        const candidateData = [];
        querySnapshot.forEach((doc) => {
          candidateData.push({ id: doc.id, ...doc.data() });
        });
        setCandidates(candidateData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <Box
      backgroundImage="url('https://img.freepik.com/free-vector/watercolor-mint-background_23-2150241023.jpg?size=626&ext=jpg&ga=GA1.1.134294676.1694251365&semt=ais')"
      backgroundSize="cover" 
      backgroundPosition="center"
      minHeight="100vh" 
      padding="20px"
    >
      <div style={{ textAlign: "center" }}>
        <Heading as="h1" size="xl" my={4} > {/* Set color to white for contrast */}
          Candidates
        </Heading>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {candidates.map((candidate, index) => (
            <Card
              key={index}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              shadow="lg"
              borderRadius="md"
              my={4} 
              mx={4}
              width={{ base: "100%", sm: "calc(50% - 8px)" }} 
              maxWidth="500px" 
              bg="white"
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={candidate.image}
                alt={candidate.name}
              />
              <Stack>
                <CardBody>
                  <Heading size="md" textAlign="left">
                    {candidate.name}
                  </Heading>
                  <Text textAlign="left" py="2" color="black">Role: {candidate.role}</Text> {/* Set color to black for contrast */}
                  <Text textAlign="left" py="2" color="black">Qualification: {candidate.qualification}</Text> {/* Set color to black for contrast */}
                  <Text textAlign="left" py="2" color="black">Position: {candidate.position}</Text> {/* Set color to black for contrast */}
                  <Text textAlign="left" py="2" color="black">Country: {candidate.country}</Text> {/* Set color to black for contrast */}
                </CardBody>
                {/* <CardFooter>
                  <Button variant="solid" colorScheme="purple" style={{display:'block', margin:'auto'}} >
                    View More
                  </Button>
                </CardFooter> */}
              </Stack>
            </Card>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default CandidateList;
