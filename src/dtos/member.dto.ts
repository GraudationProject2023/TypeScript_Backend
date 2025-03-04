export interface MemberRegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface CredentialDto {
  email: string;
  password: string;
}

export interface MemberExitDto {
  pw: string;
}

export interface ChangeMemberInfoDto {
  pw?: string;
  types?: string[];
}
