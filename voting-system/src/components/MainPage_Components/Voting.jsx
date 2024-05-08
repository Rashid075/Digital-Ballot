// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Image,
//   Table,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   Heading,
//   useDisclosure,
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogOverlay,
//   AlertDialogBody,
//   AlertDialogCloseButton,
//   AlertDialogFooter
// } from "@chakra-ui/react";
// import getCandidatesData from "../candidate component/candidate_fetch";
// import { useRef } from "react";

// const Voting = () => {
//   const [candidates, setCandidates] = useState([]);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const cancelRef = useRef();

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getCandidatesData();
//       setCandidates(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <Heading as="h1" size="xl" my={4}>
//         Please Cast Your Vote Here
//       </Heading>
//       <div>
//         <Box maxW="800px" mx="auto" boxShadow="md">
//           <Table variant="simple" borderWidth="1px">
//             <Thead>
//               <Tr>
//                 <Th>S.No</Th>
//                 <Th>Name</Th>
//                 <Th>Photo</Th>
//                 <Th>Vote</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {candidates.map((candidate, index) => (
//                 <Tr key={candidate.id}>
//                   <Td>{index + 1}</Td>
//                   <Td>{candidate.name}</Td>
//                   <Td>
//                     <Image
//                       src={candidate.image}
//                       alt={candidate.name}
//                       maxH="100px"
//                     />
//                   </Td>
//                   <Td>
//                     <Button onClick={onOpen} colorScheme="green">Vote</Button>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </Box>
//       </div>
//       <AlertDialog
//         motionPreset="slideInBottom"
//         leastDestructiveRef={cancelRef}
//         onClose={onClose}
//         isOpen={isOpen}
//         isCentered
//       >
//         <AlertDialogOverlay />

//         <AlertDialogContent>
//           <AlertDialogHeader>Are you sure want to vote?</AlertDialogHeader>
//           <AlertDialogCloseButton />
//           <AlertDialogBody>
//             If you cast your vote once, you cant be able to cast your vote again.   
//           </AlertDialogBody>
//           <AlertDialogFooter>
//             <Button ref={cancelRef} onClick={onClose}>
//               Close
//             </Button>
//             <Button colorScheme="green" ml={3}>
//               Okay
//             </Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default Voting;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { candidateDB, voteDB } from "../../Firebase";
import { auth } from "../../Firebase";
import { useToast } from "@chakra-ui/react";

const Voting = () => {
  const { currentUser } = auth;
  const [candidates, setCandidates] = useState([]);
  const [castedVote, setCastedVote] = useState(null); // renamed for clarity
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserVote = async () => {
      if (!currentUser) return; // handle case where user is not logged in

      try {
        const userVotesRef = collection(voteDB, "UserVotes");
        const q = query(userVotesRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          const userVoteDoc = querySnapshot.docs[0];
          setCastedVote(userVoteDoc.data().vote);
        }
      } catch (error) {
        console.error("Error fetching user vote:", error);
      }
    };

    fetchUserVote();
  }, [currentUser]);

  const handleVote = async (candidateId) => {
    if (castedVote) {
      toast({
        title: "Already Voted",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const candidateRef = doc(candidateDB, "CandidatesData", candidateId);
      await updateDoc(candidateRef, {
        voteCount: candidates.find((candidate) => candidate.id === candidateId).voteCount + 1,
      });

      const userVoteRef = collection(voteDB, "UserVotes");
      await addDoc(userVoteRef, { userId: currentUser.uid, vote: candidateId });

      setCastedVote(candidateId);
      toast({
        title: "Vote Casted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  return (
    <Box backgroundImage="url('https://img.freepik.com/premium-photo/skin-leather-background_76539-302.jpg?size=626&ext=jpg&ga=GA1.1.134294676.1694251365&semt=ais')"
    backgroundSize="cover" 
    backgroundPosition="center"
    minHeight="100vh" 
    padding="20px">
      <div style={{ textAlign: "center" }} >
      <Heading as="h1" size="xl" my={4}>
        Please Cast Your Vote Here
      </Heading>
      <div>
        <Box maxW="800px" mx="auto" boxShadow="md" bg='white'>
          <Table variant="simple" borderWidth="1px">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Name</Th>
                <Th>Photo</Th>
                <Th>Vote</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates.map((candidate, index) => (
                <Tr key={candidate.id}>
                  <Td>{index + 1}</Td>
                  <Td>{candidate.name}</Td>
                  <Td>
                    <Image src={candidate.image} alt={candidate.name} maxH="100px" />
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleVote(candidate.id);
                        onOpen();
                      }}
                      colorScheme="green"
                      isDisabled={castedVote !== null}
                    >
                      {castedVote !== null ? "Already Voted" : "Vote"}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </div>
    </div>
    </Box>
  );
};

export default Voting;

