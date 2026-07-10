import { useState } from "react";
import { Form } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";
import Section from "../../components/shared/Section";

function NewPayment() {
  const [payment, setPayment] = useState({});

  const amountPaid = payment?.amountPaid;
  const paymentDate = payment?.paymentDate;
  const notes = payment?.notes;

  function handleInput(e) {
    const form = new FormData(e.currentTarget);

    setPayment({
      amountPaid: Number(form.get("amountPaid")),
      paymentDate: form.get("paymentDate"),
      notes: form.get("notes"),
    });
  }
  return (
    <Section>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-accent">Registrar Pagamento</h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <Form
            onInput={handleInput}
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
                step="any"
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

          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <h3 className="text-lg font-semibold text-accent">
              Prévia do Pagamento
            </h3>

            <Preview label="Valor" value={amountPaid || 0} />
            <Preview label="Data" value={paymentDate ? formatDate(paymentDate) : "-"} />
            <Preview label="Observação" value={notes ||"-"} />
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

export default NewPayment;
