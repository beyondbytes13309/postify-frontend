

export default function UserCard({ userID, username, pfpURL }) {
    /* 
    This will greet the user
    show their pfp, their userID
    */

    console.log("nicey", username)
    return (
        <>
            <h2>Hello {username}</h2>
            <p>Your userID is {userID}</p>
            <p>Your pfp is at {pfpURL}</p>
            
        </>
    )
}