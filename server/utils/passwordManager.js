const bcrypt = require('bcryptjs');

async function generatePassword(password){
    return await bcrypt.hash(password, 8)
};
async function validPassword(userpassword,password){
    return await bcrypt.compare(password,userpassword);
};
module.exports = {generatePassword, validPassword};