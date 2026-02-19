// Domain entity for User

export type User = {
    email: string,
    auth0_id: string,   
    nickname: string
    user_id?: number
    avatar_url?: string
}

/*
  validateUser is a domain-level function
  It checks if User entity meets the required validation rules
  It throws errors if any rules are violated and ViewModel catches these errors
*/

export const validateUser = (user: User) => {
    const { email, nickname } = user

    // every input needs to be filled
    if (!email || !nickname) {
      throw new Error('Email and nickname are required')
    }

    // email check
    if (!email.includes('@')) {
      throw new Error('Email needs to be in form: example@example.com')
    }

    // password check
    /* Must contain:
        - minimum 8 characters
        - a lowercase letter
        - a uppercase letter
        - a number
    
    if (password.length < 8 || password.search(/[a-z]/) < 0 || password.search(/[A-Z]/) < 0 || password.search(/[0-9]/) < 0) {
      throw new Error('Password must contain at least 8 characters, including an uppercase letter, a lowercase letter and a number')
    }*/
}