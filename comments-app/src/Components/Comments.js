import React, { useState} from "react";
import styled from "styled-components";
import CommentSection  from "./CommentSection";

function Comments () {

    const [fullName, setFullName] = useState("");
    const [emailAddress, setEmailAdress] = useState("");
    const [userComment, setUserComment] = useState("");
    const [confirmation, setConfirmation] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (state, ev) => {
        state(ev.target.value);
      };

    const handleConfirmation = () => {
        setConfirmation(true);
        submit();

      };

    const submit = e => {
        //e.preventDefault();
        let postData = {
            "name": fullName,
            "email": emailAddress,
            "comment": userComment
        };
        fetch('http://localhost:5000/comment', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log("comments from POST API :: ", json))
    };

    let checkIsValid = (ev) => {
        ev.preventDefault();
        
        if (!fullName) {
          setErrorMsg("fullName_error");
        } else if (!emailAddress || !emailAddress.includes("@")) {
          setErrorMsg("email_error");
        } else if (!userComment) {
          setErrorMsg("comment_error");
        } else {
            setErrorMsg(null);
            handleConfirmation();
          }
       };

    return (
        <>
        <Title>Comments:</Title>

        <CommentsContainer>
            {confirmation && (

            <CommentSection 
                fullName={fullName}
                userComment={userComment}
            />
        )}
        </CommentsContainer>

        <CommentForm>
            <Title>Leave a Comment</Title>
            <Info>
                <InfoLabel required>Your Name*</InfoLabel>
                <UserInput onChange={(ev) => {
                    handleChange(setFullName, ev);
                  }}></UserInput>
            </Info>
            <Info>
                <InfoLabel required>Your Email Address*</InfoLabel>
                <UserInput 
                    type="email"
                    onChange={(ev) => {
                    handleChange(setEmailAdress, ev);
                  }}></UserInput>
            </Info>
            <Info>
                <InfoLabel required>Your Comment*</InfoLabel>
                <UserCommentArea 
                onChange={(ev) => {
                    handleChange(setUserComment, ev);
                  }}
                ></UserCommentArea>
            </Info>

            {errorMsg === "fullName_error" && (
              <ErrorBox> Please enter your name </ErrorBox>
            )}
            {errorMsg === "email_error" && (
              <ErrorBox> Please enter a valid email address </ErrorBox>
            )}
            {errorMsg === "comment_error" && (
              <ErrorBox> Please enter a comment </ErrorBox>
            )}

            <SubmitButton type="submit" onClick={checkIsValid}>Submit Comment</SubmitButton>

        </CommentForm>
        </>

    )
}


const Title = styled.div`
margin: 20px 0px 20px 20px;
font-size: 30px;
font-weight: bold;
`;

const CommentsContainer = styled.div`
border: black solid 3px;
border-radius: 10px;
margin-left: 20px;
margin-right: 20px;
height: 400px;
`;

const CommentForm = styled.div`
margin-bottom: 20px;
`;

const Info = styled.div`
display: flex;
flex-direction: column;
`;

const InfoLabel = styled.label`
  /* flex: 1;
  text-align: left; */
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const UserInput = styled.input`
  /* flex: 1; */
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  border: 2px solid black;
  width: 30%;
`;

const UserCommentArea = styled.textarea`
  margin-left: 20px;
  margin-right: 20px;
  border: 2px solid black;
  border-radius: 10px;
  /* width: 50%; */
  height: 200px;
`;

const ErrorBox = styled.div `
  border: 2px solid red;
  border-radius: 12px;
  margin: 10px 20px 10px 20px;
  padding: 10px;
`;

const SubmitButton = styled.button`
margin: 20px;
background-color: red;
font-weight: bold;
border: 0px;
border-radius: 25px;
padding: 10px 10px;
color: white;
cursor: pointer;
transition: 0.5s;
box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.75);
&:hover {
    transform: scale(1.2);
    }
&:active{
    background-color: green;
}    
`;

export default Comments;