const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) return true;
    else return false;
};

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
};

exports.validateSignupData = (data) => {
    let errors = {};
  // checks the email see if it's empty
    if(isEmpty(newUser.email)) {
        errors.email = 'Must not be empty';
        //makes sure it's a valid email
    } else if(!isEmail(newUser.email)) {
      errors.email = 'Must be a valid email address'; 
    }
    // checks to see if password is empty
    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty';
    }
    // checks to see if email matches
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';  
    
    // checks tom see if handle is empty
    if (isEmpty(data.handle)) errors.handle = 'Must not be empty';
    
    // checks to see if errors object is empty 
    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLoginData = (data) => {
    let errors = {};

if(isEmpty(user.email)) errors.email = 'Must not be empty';
if (isEmpty(user.password)) errors.password = 'Must not be empty';

return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
}

}