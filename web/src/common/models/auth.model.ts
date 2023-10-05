/**
 * Represents the login form 
 */
export interface LoginInput {
    /** Username or email of the user */
    username: string | null

    /** User's password */
    password: string | null
}

/** Base interface for change password */
export interface ChangePasswordBaseInput {
    /** New password */
    newPassword1: string | null,

    /** Confirm new password */
    newPassword2: string | null
}

/** Interface for change password input */
export interface ChangePasswordInput extends ChangePasswordBaseInput {
    /** Old password */
    oldPassword: string | null
}

export interface RegisterUserInput {
    /** Related email */
    username: string | null,

    /** User first name */
    firstName: string | null,

    /** User last name */
    lastName: string | null,

    /** User phone number */
    phoneNo: string | null,

    /** User date of birth */
    dateOfBirth: string | null
}


/** Interface for email only input */
export interface EmailOnlyInput {
    /** Related email */
    email: string | null
}

export interface ChangePasswordBaseInput {
    /** New password */
    newPassword1: string | null,

    /** Confirm new password */
    newPassword2: string | null
}

export interface LoginResponse {
    /** Generated access token */
    accessToken: string,

    /** Generated refresh token */
    refreshToken: string,

    /** Short user information */
    // user: AuthUser
}

/** Interface for confirm reset password input */
export interface ResetPasswordInput extends ChangePasswordBaseInput {
    /** Received uid */
    uid: number | null,

    /** Received token */
    token: string | null
}

/** Interface for refresh token input */
export interface RefreshTokenInput {
    /** Current refresh token */
    refresh: string | null
}

export interface DetailResponse {
    /** Detail */
    detail: string
}

/** Interface for token refresh */
export interface TokenRefresh {
    /** New access token */
    access: string,

    /** New refresh token */
    refresh: string,

    /** New access token expiration date */
    accessTokenExpiration: string
}

export enum TokenType {
    Access = 'access',
    Refresh = 'refresh'
}


export interface TokenDecoded {
    /** Type of token  */
    tokenType?: TokenType.Access | TokenType.Refresh,

    /** Token expiration unix timestamp  */
    exp?: number,

    /** Token issued unix timestamp  */
    iat?: number,

    /** Token unique identifier */
    jti?: string,

    /** User ID  */
    id?: number,

    /** User username  */
    username?: string,

    /** User email  */
    email?: string
}