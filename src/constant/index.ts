const errorMessages = {
    email: {
        missing: 'The email field is required.',
        invalid: 'Please enter a valid email address in the format example@example.com.',
        exists: 'The email address you entered is already associated with an existing account.',
        blocked: 'Your email address has been blocked from accessing our services. Please contact support for further assistance.',
        sending: 'We encountered an issue while sending an email to the provided address.'
    },
    password: {
        invalid: 'Invalid password'
    }
}

const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}

export const normalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9',
      borderRadius: '20px'
    },
};


export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9',
      borderRadius: '20px',
      height: 'calc(100vh - 2rem)',
      maxHeight: '70rem',
      overflow: 'hidden'
    },
};

export const createPropertySteps = {
    basicInformation: 1,
    branding: 2,
    confirmationScreen: 3
}

export const categories = [
    { name: 'Summary', value: 'general' },
    { name: 'Kitchen', value: 'kitchen' },
    { name: 'Laundry', value: 'laundry' },
    { name: 'Outside', value: 'outside' },
    { name: 'Safety', value: 'safety' }
]

export * from './shared';
export * from './navigation';
export {
    errorMessages,
    HTTP_METHODS
}