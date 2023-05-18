//THIRD PARTY MODULES
import { redirect } from "next/navigation";
//UTILS
import { getUrlOnServer } from "_@/utils/getUrlOnServer";

export default function Page() {
  const url = getUrlOnServer();

  if (url?.pathname === "/users") {
    redirect("/users/all");
  }

  return null;
}
