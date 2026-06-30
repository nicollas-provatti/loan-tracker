import { useState } from "react";
import { Form, redirect, useLoaderData } from "react-router";
import Section from "../components/Section";
import { FiPlusCircle } from "react-icons/fi";
import { getLoan, updateLoan } from "../services/loans";
import { getLoanPreview } from "../utils/selectores";

function EditLoan() {
  const loan = useLoaderData();

  const [loanForm, setLoanForm] = useState(loan);

  const preview = getLoanPreview(loanForm);

  const totalReceivable = preview?.totalReceivable;
  const installmentAmount = preview?.installmentAmount;

  const {
    name,
    loanAmount,
    interestRate,
    installments,
    amortization,
    dueDay,
    loanDate,
  } = loan;

  function handleInput(e) {
    const form = new FormData(e.currentTarget);

    setLoanForm({
      name: form.get("name"),
      loanAmount: Number(form.get("loanAmount")),
      interestRate: Number(form.get("interestRate") / 100),
      installments: Number(form.get("installments")),
      amortization: form.get("amortization"),
      dueDay: form.get("dueDay"),
      loanDate: form.get("loanDate"),
    });
  }

  return (
    <Section>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-accent">Editar Empréstimo</h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <Form
            method="post"
            onInput={handleInput}
            className="space-y-4 rounded-xl border border-border bg-surface p-5"
          >
            <div>
              <label className="text-sm text-text-muted">Nome do Cliente</label>

              <input
                type="text"
                name="name"
                defaultValue={name}
                placeholder="Ex: João Silva"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">Valor</label>

              <input
                type="number"
                name="loanAmount"
                defaultValue={loanAmount}
                placeholder="Ex: 1000"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">
                Juros (% ao mês)
              </label>

              <input
                type="number"
                name="interestRate"
                defaultValue={interestRate * 100}
                placeholder="Ex: 5"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">Parcelas</label>

              <input
                type="number"
                name="installments"
                defaultValue={installments}
                placeholder="Ex: 6"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">
                Tipo de Amortização
              </label>

              <select
                name="amortization"
                defaultValue={amortization}
                className="
                  w-full
                  rounded-lg
                  border
                  border-border
                  bg-surface
                  p-3
                  text-text
                  outline-none
                  focus:border-primary
                  cursor-pointer
                "
              >
                <option value="installments">Parcelado</option>

                <option value="final-capital">Capital no Final</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-text-muted">
                Dia de pagamento
              </label>

              <input
                type="number"
                name="dueDay"
                defaultValue={dueDay}
                placeholder="Ex: 10"
                min={1}
                max={31}
                className="
                w-full
                rounded-lg
                border
                border-border
                bg-surface
                p-3
                text-text
                outline-none
                focus:border-primary
              "
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">Data de Início</label>

              <input
                type="date"
                name="loanDate"
                defaultValue={loanDate}
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <button
              className="
              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-lg
              bg-primary
              px-4
              py-3

              font-medium
              text-white

              transition-all
              hover:bg-primary-dark
              hover:shadow-md

              active:scale-[0.98]
            "
            >
              <FiPlusCircle size={18} />
              Salvar Alterações
            </button>
          </Form>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <h3 className="text-lg font-semibold text-accent">Prévia</h3>

            <Preview label="Cliente" value={loanForm.name || "-"} />
            <Preview label="Total a receber" value={totalReceivable || 0} />
            <Preview label="Parcela" value={installmentAmount || 0} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Preview({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-sm text-text-muted">{label}</span>

      <span className="font-semibold text-text">
        {typeof value === "number" ? `R$ ${value.toFixed(2)}` : value}
      </span>
    </div>
  );
}

export async function editLoanLoader({ params }) {
  const loan = await getLoan(params.loanId);

  return loan;
}

export async function editLoanAction({ request, params }) {
  const formData = await request.formData();
  const { loanId } = params;

  const name = formData.get("name");
  const loanAmount = formData.get("loanAmount");
  const interestRate = formData.get("interestRate");
  const installments = formData.get("installments");
  const amortization = formData.get("amortization");
  const dueDay = formData.get("dueDay");
  const loanDate = formData.get("loanDate");

  const safeAmount = Number(loanAmount) || 0;
  const safeInterest = (Number(interestRate) || 0) / 100;
  const safeInstallments = Number(installments) || 0;

  const loanUpdate = {
    name,
    loanAmount: safeAmount,
    interestRate: safeInterest,
    installments: safeInstallments,
    amortization,
    dueDay,
    loanDate,
  };

  await updateLoan(loanId, loanUpdate);

  return redirect("/loans");
}

export default EditLoan;
