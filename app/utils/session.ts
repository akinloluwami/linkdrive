import { useSession } from "vinxi/http";

type User = {
  email: string;
  name: string;
  password: string;
};

type SessionUser = {
  userEmail: User["email"];
};

export function useAppSession() {
  return useSession<SessionUser>({
    password: "ChangeThisBeforeShippingToProdOrYouWillBeFired",
  });
}
