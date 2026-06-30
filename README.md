# Loan Tracker

## Modelagem do Sistema

**Entidades:**

- Empréstimo
- Pagamento

**Estrutura dos dados:**

```js
{
  id: 1,
  name: "João",
  loanAmount: 2000,
  interestRate: 0.05,
  installments: 4,
  amortization: "installments" || "final-capital",
  dueDay: 7,
  loanDate: "2025-11-24",
}
```

```js
{
  id: 1,
  loanId: 1,
  amountPaid: 600,
  paymentDate: "2026-01-05",
  notes: "Pagou adiantado",
}
```

## Estrutura
```
src
├── pages
│   ├── Dashboard
│   ├── Loans
│   ├── LoanDetails
│   └── NewLoan
│
├── components
│   ├── LoanCard
│   ├── PaymentHistory
│   ├── SummaryCard
│   └── ProgressBar
│
├── context
│   └── LoansContext
│
├── reducers
│   └── loansReducer
│
├── services
│   └── storage.js
│
└── utils
    ├── calculations.js
    └── formatters.js
```

**Reducer:**
```js
ADD_LOAN
UPDATE_LOAN
ADD_PAYMENT
SET_LOAN_STATUS
```

**Context:**
```js
LoansContext
LoansProvider
useLoans()
```

**Principais Métricas:**
```
Capital em Aberto
A Receber
Recebimentos do Mês
Lucro do Mês
```

---

## Dados das Páginas

### Dashboard
**Visão Geral:** O cálculo deve ser feito considerando apenas os empréstimos ativos, fazendo diferença entre empréstimos com tipos de amortização diferente.

- Capial em aberto
- Total a receber

**Projeção Mensal:** O cálculo deve ser feito considerando os empréstimos ativos que possuem pagamentos no mês atual e fazer diferenciação entre tipos de amortização.

- Recebimentos Previstos
- Lucro Previsto

**Resultado do Mês:** Usar os dados do pagamentos e usar apenas os pagamentos do mês atual.

- Rebecido do Mês
- Lucro Recebido

### Empréstimos

Para a página de empréstimos eu preciso saber os seguintes dados do empréstimo:

- id
- name
- valor restante (capital aberto + juros)
- status (ativo ou quitado)
- parcelas pagas
- parcelas pendentes
- próximo pagamento (no formato dia/mês)

### Detalhes de um Empréstimo

A página de detalhes de um empréstimo está divida em 5 partes e 4 dessas partes precisam de dados específicos a respeito do empréstimo.

**Visã Geral:**

- id (será passado via Params)
- name
- status
- valor emprestado
- valor rebecer
- tipo de amortização
- dia de vencimento
- data do empréstimo
- taxa de juros
- número de parcelas
- valor da parcela

**Progresso:**

- parcelas pagas
- numero de parcelas 
- valor recebido (com juros)
- valor restante (com juros)

**Histórico de Pagamentos:**

- numero da parcela
- data de pagamento 
- valor pago

**Informações Financeiras:**

- Capital em aberto
- Lucro previsto
- Lucro rebido
- Lucro restante