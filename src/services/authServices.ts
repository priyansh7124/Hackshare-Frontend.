import axios from "axios";

type LoginParams = {
  email: string;
  password: string;
};
type SignupParams = {
  fullName: String;
  username: String;
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginParams) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}users/login`,
    { email, password },
    { withCredentials: true },
  );

  return response;
};

export const signupUser = async ({
  fullName,
  username,
  email,
  password,
}: SignupParams) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}users/register`,
    { fullName, username, email, password },
    { withCredentials: true },
  );

  return response;
};
