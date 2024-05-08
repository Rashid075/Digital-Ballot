import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, textDB } from "../Firebase";
import { voteImg } from "../Firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [phno, setPhNo] = useState("");
  const [voterId, setVoterId] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(e.target.files[0]);
    const imgs = ref(voteImg, `Imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImage(val);
      });
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!fname && !lname) {
      toast({
        title: "Error",
        description: "Please fill your First name and Last name.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!password && password.length < 6) {
      toast({
        title: "Error",
        description: "Password length should be greater than 6.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (age && parseInt(age) < 18) {
      toast({
        title: "Error",
        description: "Age must be 18 or above.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!voterId) {
      toast({
        title: "Error",
        description: "Please Enter your VoterID number.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!file) {
      toast({
        title: "Error",
        description: "Please upload your voter ID photo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      if (userCredential) {
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          toast({
            title: "Registration successful",
            description: "You have successfully registered.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }, 1000);
        navigate("/main");
      } else {
        toast({
          title: "Error",
          description: "Registration Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/main");
      }
    } catch (err) {
      console.log(err);
    }

    const valRef = collection(textDB, "txtData");
    await addDoc(valRef, {
      f_name: fname,
      l_name: lname,
      age: age,
      ph_no: phno,
      voteID: voterId,
      img: image,
      Email: email,
    });
    toast({
      title: "Data Added successfully",
      description: "Your data is added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div >
      <VStack spacing="10px">
        <FormControl id="first-name" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="Enter Your First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </FormControl>

        <FormControl id="last-name" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Enter Your Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </FormControl>

        <FormControl id="age" isRequired>
          <FormLabel>Age</FormLabel>
          <Input
            placeholder="Enter Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormControl>

        <FormControl id="ph-no" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Enter Your Number"
            value={phno}
            onChange={(e) => setPhNo(e.target.value)}
          />
        </FormControl>

        <FormControl id="voter-id" isRequired>
          <FormLabel>Voter ID</FormLabel>
          <Input
            placeholder="Enter Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            pattern="[a-zA-Z0-9]+"
            title="Please enter alphanumeric characters only"
          />
        </FormControl>

        {/* File input field */}
        <FormControl id="voter-id-photo" isRequired>
          <FormLabel>Voter ID Photo</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Call handleFileChange on file selection
          />
        </FormControl>

        <FormControl id="signup-email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="signup-pwd" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="teal"
          width="100%"
          marginTop="15px"
          onClick={submitHandler}
        >
          SignUp
        </Button>
      </VStack>
    </div>
  );
};

export default Signup;
