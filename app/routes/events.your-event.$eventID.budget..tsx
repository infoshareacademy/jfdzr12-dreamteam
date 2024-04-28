import { BudgetForm } from "~/blocks/budgetForm";



export default function BudgetPage() {
  return (
    <div >
      <BudgetForm onSubmit={(e) => { console.log(e) }} />
    </div>

  )
}