import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Heading,
  Progress,
  Stack,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { candidateDB } from "../../Firebase";

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(2);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const querySnapshot = await getDocs(collection(candidateDB, "CandidatesData"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const cardWidth = `${100 / cardsPerRow}%`;

  return (
    <Box textAlign="center" backgroundImage="url('https://img.freepik.com/free-photo/dense-azure-cloud-haze-liquid_23-2148102183.jpg?size=626&ext=jpg&ga=GA1.1.134294676.1694251365&semt=ais')"
    backgroundSize="cover" 
    backgroundPosition="center"
    minHeight="100vh" 
    padding="20px">
      <Heading as="h1" size="xl" my={6}>
        Election Results
      </Heading>
      <Stack spacing={8} direction="row" justifyContent="center" flexWrap="wrap">
        {candidates.map((candidate, index) => (
          <Flex key={candidate.id} maxW={cardWidth} justifyContent="center">
            <Box
              maxW="300px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg='white'
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-5px)" }}
            >
              <Image src={candidate.image} alt={candidate.name} borderRadius="lg" />
              <Box p={6}>
                <Box>
                  <Text fontWeight="bold" fontSize="xl">{candidate.name}</Text>
                  <Text fontSize="sm" color="gray.500">{`(${candidate.voteCount} votes)`}</Text>
                </Box>
                <Box mt={4}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.500">Votes Percentage:</Text>
                    <Text fontWeight="semibold">{((candidate.voteCount / 1000) * 100).toFixed(2)}%</Text>
                  </Flex>
                  <Progress value={candidate.voteCount} max={1000} colorScheme="teal" mt={2} />
                </Box>
              </Box>
            </Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default Results;
