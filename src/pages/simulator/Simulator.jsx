import { useState } from "react";
import Section from "../../components/shared/Section";
import { FaCalculator } from "react-icons/fa";
import { FiPlay } from "react-icons/fi";

function Result({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-sm text-text-muted">{label}</span>

      <span className="font-semibold text-text">R$ {value.toFixed(2)}</span>
    </div>
  );
}

function Simulator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [installments, setInstallments] = useState("");
  const [result, setResult] = useState(null);

  const isEmpty = !amount || !interest || !installments;

  function handleSimulate() {
    const safeAmount = Number(amount) || 0;
    const safeInterest = Number(interest) || 0;
    const safeInstallments = Number(installments) || 0;

    const totalReceivable =
      safeAmount * (1 + (safeInterest / 100) * safeInstallments);

    const installment = totalReceivable / safeInstallments;

    const totalProfit = totalReceivable - safeAmount;

    const monthlyProfit = totalProfit / safeInstallments;

    setResult({
      totalReceivable,
      installment,
      totalProfit,
      monthlyProfit,
    });
  }

  return (
    <Section>
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-accent">
          <FaCalculator size={24} />
          Simulador de Empréstimos
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <div>
              <label className="text-sm text-text-muted">
                Valor do Empréstimo
              </label>

              <input
                type="number"
                placeholder="Ex: 1000"
                defaultValue={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">
                Juros (% ao mês)
              </label>

              <input
                type="number"
                placeholder="Ex: 5 (mensal)"
                defaultValue={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-text-muted">Parcelas</label>

              <input
                type="number"
                placeholder="Ex: 6"
                defaultValue={installments}
                onChange={(e) => setInstallments(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-surface p-3 text-text outline-none focus:border-primary"
              />
            </div>

            <button
              onClick={handleSimulate}
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

              cursor-pointer
            "
            >
              <FiPlay size={18} />
              Simular Empréstimo
            </button>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <h3 className="text-lg font-semibold text-accent">
              Resultado da Simulação
            </h3>

            {isEmpty ? (
              <p className="text-sm text-text-muted">
                Preencha os campos para simular o empréstimo.
              </p>
            ) : !result ? (
              <p className="text-sm text-text-muted">
                Clique em{" "}
                <span className="font-medium text-primary">
                  "Simular Empréstimo"
                </span>{" "}
                para gerar o resultado.
              </p>
            ) : (
              <>
                <Result
                  label="Total a receber"
                  value={result.totalReceivable}
                />
                <Result label="Valor da parcela" value={result.installment} />
                <Result label="Lucro total" value={result.totalProfit} />
                <Result label="Lucro mensal" value={result.monthlyProfit} />
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Simulator;

// Melhorias:
// useRef()
// salvar simulações (histórico)
// comparar 2 cenários lado a lado
// transformar isso em “criar empréstimo real”
