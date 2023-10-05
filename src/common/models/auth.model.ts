/**
 * Represents the login form 
 */
export interface LoginInput {
    /** Username or email of the user */
    username: string | null

    /** User's password */
    password: string | null
}