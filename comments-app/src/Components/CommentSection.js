import React from "react";
import styled from "styled-components";

function CommentSection ({fullName, userComment, emailAddress}) {

    return (
        <>
        <PeoplesComments>
            <CommentDetailsLeft>
                {/* <a href="mailto:${emailAddress}">{fullName}</a> */}
                {fullName}
            </CommentDetailsLeft>
            <CommentDetailsRight>
                {userComment}
            </CommentDetailsRight>

        </PeoplesComments>
        </>
    );
};

const PeoplesComments = styled.div`
width: 95%;
margin: 10px auto 10px auto;
padding: 10px;
height: auto;
border: black solid 2px;
border-radius: 10px;
display: flex;
`;

const CommentDetailsLeft = styled.div`
width: 30%;
text-align: center;
`;

const CommentDetailsRight = styled.div`
`;

export default CommentSection;