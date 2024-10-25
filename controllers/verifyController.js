const DB = require('../models');

exports.index = async (req, res) => {
    try {
        const tokenToFind = await DB.registerToken.findOne({token: req.params.token});

        // If no token document is found, send a 404 response
        if (!tokenToFind) {
            return res.status(404).send({
                status: false,
                message: 'Token not found'
            });
        }

        // proceed to updating the user
        const updatedUser = await DB.registeredUsers.findByIdAndUpdate(tokenToFind.userID, 
            {verified: true}, 
            {new: true} // new:true is just to return the updated document.
        ); 
        console.log("================================================");
        console.log("Successfully updated user ", updatedUser.username);
        console.log("================================================");

        if (!updatedUser) {
            return res.status(404).send({
                status: false,
                message: 'User not found or update failed'
            });
        }

        // delete token if used for verification already
        const isDeleted = await DB.registerToken.findByIdAndDelete(tokenToFind._id);
        if (isDeleted) {
            console.log("Verification token deleted for user:", updatedUser.username);
            console.log("================================================");

            return res.send({
                status: true,
                message: `Successfully updated ${updatedUser.username} as VERIFIED!`
            });
        } else {
            console.warn("Token deletion failed; token not found.");

            return res.status(500).send({
                status: false,
                message: 'Failed to delete verification token'
            });
        }       

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error registering user',
            status: false
        });
    }

}