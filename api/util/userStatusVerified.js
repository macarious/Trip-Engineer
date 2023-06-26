// This function verifies that the user is logged in and has a valid auth0Id.
// Returns true if user is logged in, false otherwise.
// Return error message if user is not logged in.
export default function userStatusVerified(req, res) {
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return false;
    } else {
        return true;
    };
};