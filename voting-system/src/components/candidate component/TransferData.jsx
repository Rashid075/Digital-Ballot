import React, { useState, useEffect } from "react";
import "firebase/firestore";
import getCandidatesData from "./candidate_fetch";
import { addDoc, collection } from "firebase/firestore";
import { candidateDB } from "../../Firebase";

const TransferDataToFirestore = () => {
  const [dataTransferred, setDataTransferred] = useState(false);

  useEffect(() => {
    const transferData = async () => {
      try {
        if (!dataTransferred) {
          const candidates = await getCandidatesData(); 
          const valRef = collection(candidateDB, "CandidatesData");
          for (const candidate of candidates) {
            await addDoc(valRef, {
              name: candidate.name,
              role: candidate.role,
              image: candidate.image,
              qualification: candidate.qualification,
              position: candidate.position,
              country: candidate.country,
              voteCount: 0,
            });
          }
          console.log("Data transferred to Firestore successfully");
          setDataTransferred(true); // Update state after data transfer
        }
      } catch (error) {
        console.error("Error transferring data to Firestore:", error);
      }
    };

    transferData();
  }, [dataTransferred]); // Add dataTransferred to dependency array

  return (
    <div>
      <h1>Data Transfer to Firestore</h1>
      <p>Please wait while the data is being transferred...</p>
    </div>
  );
};

export default TransferDataToFirestore;
