import { redirect, Form } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { formatDate } from "../utils/formatDate";
import Section from "../components/Section";
import { createPayment } from "../services/payments";

function NewPayment() {
  return (
    <Section>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-accent">Registrar Pagamento</h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <Form
            method="post"
            className="space-y-4 rounded-xl border border-border bg-surface p-5"
          >
            <div>
              <label className="text-sm text-text-muted">
                Valor do pagamento
              </label>

              <input
                type="number"
                name="amountPaid"
                placeholder="Ex: 350"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">
                Data do pagamento
              </label>

              <input
                type="date"
                name="paymentDate"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">
                Observação (opcional)
              </label>

              <textarea
                placeholder="Ex: pagamento antecipado"
                name="notes"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary resize-none"
                rows={3}
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
              <FiCheckCircle size={18} />
              Registrar Pagamento
            </button>
          </Form>

          {/* <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <h3 className="text-lg font-semibold text-accent">
              Prévia do Pagamento
            </h3>

            <Preview label="Valor" value={safeAmount} />
            <Preview label="Data" value={formatDate(date) || "-"} />
            <Preview label="Observação" value={note || "-"} />
          </div> */}
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

export async function newPaymentLoader({ request, params }) {
  const formData = await request.formData();
  const { loanId } = params;

  const amountPaid = formData.get("amountPaid");
  const paymentDate = formData.get("paymentDate");
  const notes = formData.get("notes");

  const safeAmount = Number(amountPaid) || 0;

  const payment = {
    loanId,
    amountPaid: safeAmount,
    paymentDate,
    notes,
  };

  createPayment(payment);

  return redirect(`/loans/${loanId}`);
}

export default NewPayment;
