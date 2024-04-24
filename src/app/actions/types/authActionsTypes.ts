import { Account, Profile } from "next-auth";

export interface ExtendedProfile extends Profile {
  picture: string;
}

export interface OAuthSignInArgs {
  account: Account;
  profile: ExtendedProfile;
}

export interface UserByEmailArgs {
  email: string;
}

export interface CredentialsSignInArgs {
  email: string;
  password: string;
}
