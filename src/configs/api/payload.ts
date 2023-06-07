export type SignUpPayload = {
  username: string;
  password: string;
  fullName: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type ApiEndPointPayload = SignUpPayload | LoginPayload;
