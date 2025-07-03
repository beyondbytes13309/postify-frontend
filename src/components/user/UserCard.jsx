

export default function UserCard({ user: {_id, username, email, bio, profilePicURL }}) {
    /* 
    This will greet the user
    show their pfp, their userID
    */


    return (
        <>
 
            <h2>Hello {username}</h2>
            <p>Your userID is {_id}</p>
            <p>Your pfp is at {profilePicURL}</p>
            <p>Your email is {email}</p>
            <p>Your bio is "{bio}"</p>

            
        </>
    )
}