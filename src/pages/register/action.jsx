import { redirect } from "react-router";
import { signUp } from "../../services/auth";

export async function registerAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  await signUp(email, password);

  return redirect("/login");
}