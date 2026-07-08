import { redirect } from "react-router";
import { signIn } from "../../services/auth";

export async function loginAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  await signIn(email, password);

  return redirect("/");
}
