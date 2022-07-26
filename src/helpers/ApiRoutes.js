const host = "http://localhost:4500";
const RegisterRoute = `${host}/api/auth/register`;
const LoginRoute = `${host}/api/auth/login`;
const AvatarRoute = `${host}/api/auth/avatar`;
const AllUsersRoute = `${host}/api/auth/allusers`;
const sendMessageRoute = `${host}/api/messages/addmsg`;
const getAllMessagesRoute = `${host}/api/messages/getmsg`;

export { RegisterRoute, LoginRoute, AvatarRoute, AllUsersRoute, sendMessageRoute, getAllMessagesRoute, host};
