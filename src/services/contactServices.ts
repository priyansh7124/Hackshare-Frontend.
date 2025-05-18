import axios from "axios";

type CreateContacParams = {
  subject: string;
  message: string;
};

export const CreateContact = async ({ subject , message }: CreateContacParams) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contact/create`,
    {  subject , message },
    { withCredentials: true },
  );

  return response;
};
export const GetUserContacts = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contact/`,
    { withCredentials: true },
  );

  return response;
};


