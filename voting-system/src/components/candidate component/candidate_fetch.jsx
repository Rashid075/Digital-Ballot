// candidatesData.js
const getCandidatesData = async () => {
    try {
      const response = await fetch('/src/Candidates.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching candidates data:', error);
      return [];
    }
  };
  
  export default getCandidatesData;
  