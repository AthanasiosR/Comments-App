import React from "react";
import styled from "styled-components";

function CommentSection ({fullName, userComment, emailAddress, comments}) {

    const convTime = (UNIX_timestamp) => {
        let a = new Date(UNIX_timestamp * 1000);
        let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate();
        let time = year + '-' + month + '-' + date ;

        date = new Date(time);
  
        if ( isNaN( date .getTime() ) ) 
        {
            return time;
        }
        else
        {
            let month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            let day = date.getDate();
            
            if(day < 10)
            {
                day = "0"+day;
            }
        
            return    day  + " " +month[date.getMonth()] + " " + date.getFullYear();
        }
    }

    return (
        <>
        {comments.map((item, index) => (
            <>
            <PeoplesComments>
            <CommentDetailsLeft>
                {convTime(item.time)} <br></br> by {""}
                <a href={`mailto:${item.email}`}>{item.name}</a>
            </CommentDetailsLeft>
            <CommentDetailsRight>
                {item.comment}
            </CommentDetailsRight>
            </PeoplesComments>
            </>
        ))}
        </>
    );
};

const PeoplesComments = styled.div`
width: 95%;
margin: 10px auto 10px auto;
padding: 20px;
height: auto;
border: solid 2px;
border-radius: 10px;
display: flex;
background-color: #E0017A;
color: white;
overflow-y: hidden;
`;

const CommentDetailsLeft = styled.div`
width: 20%;
text-align: center;
`;

const CommentDetailsRight = styled.div`
width: 80%;
`;

export default CommentSection;