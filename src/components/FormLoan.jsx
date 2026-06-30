import { Form } from "react-router";
import Section from "../components/Section";
import { FiPlusCircle } from "react-icons/fi";

function FormLoan() {
  return (
    <Section>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-accent">Editar Empréstimo</h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <Form
            method="post"
            className="space-y-4 rounded-xl border border-border bg-surface p-5"
          >
            <div>
              <label className="text-sm text-text-muted">Nome do Cliente</label>

              <input
                type="text"
                name="name"
                placeholder="Ex: João Silva"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">Valor</label>

              <input
                type="number"
                name="loanAmount"
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
                placeholder="Ex: 5"
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">Parcelas</label>

              <input
                type="number"
                name="installments"
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
              Criar Empréstimo
            </button>
          </Form>

          {/* <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <h3 className="text-lg font-semibold text-accent">Prévia</h3>

            <Preview label="Cliente" value={name || "-"} />
            <Preview label="Total a receber" value={totalReceivable} />
            <Preview label="Parcela" value={installment} />
          </div> */}
        </div>
      </div>
    </Section>
  );
}

export default FormLoan;
