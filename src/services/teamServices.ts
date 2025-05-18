import axios from "axios";

type JoinTeamByCodeParams = {
  code: String;
};
type CreateTeamParams = {
  name: String;
};

export const joinTeamByCode = async ({ code }: JoinTeamByCodeParams) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/join-team`,
    { code },
    { withCredentials: true },
  );
  return response;
};

export const CreateTeam = async ({ name }: CreateTeamParams) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/create-team`,
    { name },
    { withCredentials: true },
  );
  return response;
};
export const GetAllTeams = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/getallteams`,
    { withCredentials: true },
  );
  return response;
};
export const GetTeam = async ({teamId}:{teamId:String}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/${teamId}`,
    { withCredentials: true },
  );
  return response;
};
export const DeleteTeam = async ({teamId}:{teamId:String}) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/delete/${teamId}`,
    { withCredentials: true },
  );
  return response;
};
export const LeaveTeam = async ({teamId}:{teamId:String}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/leave/${teamId}`,
    {},
    { withCredentials: true },
  );
  return response;
};


