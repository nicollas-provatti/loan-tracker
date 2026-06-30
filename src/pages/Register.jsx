import { Link, Form, redirect } from "react-router";
import { FiUser, FiLock, FiTrendingUp } from "react-icons/fi";
import { signUp } from "../services/auth";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
            <FiTrendingUp size={22} />
          </div>

          <h1 className="text-xl font-bold text-accent">LoanControl</h1>

          <p className="text-sm text-text-muted">Criar nova conta</p>
        </div>

        <Form method="post" className="space-y-4">
          <div>
            <label className="text-sm text-text-muted">Nome</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-text-muted" />
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                className="w-full rounded-lg border border-border bg-surface pl-10 p-3 text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-muted">Email</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-text-muted" />
              <input
                type="email"
                name="email"
                placeholder="email@exemplo.com"
                className="w-full rounded-lg border border-border bg-surface pl-10 p-3 text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-muted">Senha</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-text-muted" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-surface pl-10 p-3 text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-muted">Confirmar senha</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-text-muted" />
              <input
                type="password"
                name="password-confirm"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-surface pl-10 p-3 text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            className="
              w-full
              rounded-lg
              bg-primary
              py-3
              font-medium
              text-white
              transition-all
              hover:bg-primary-dark
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            Criar conta
          </button>
        </Form>

        <p className="text-center text-sm text-text-muted">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function registerAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  await signUp(email, password);

  return redirect("/login");
}
export default Register;
