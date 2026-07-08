import { useLoaderData } from "react-router";
import FormLoan from "../../components/shared/FormLoan";

function EditLoan() {
  const loan = useLoaderData();

  return <FormLoan editMode={true} loan={loan} />;
}

export default EditLoan;
