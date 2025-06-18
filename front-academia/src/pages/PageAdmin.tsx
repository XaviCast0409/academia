import ActivityForm from "../components/form/CreateActivityForm";
import parseJwt from "../utils/parseJwt";

export const PageAdmin = () => {
  const token = localStorage.getItem("auth-storage");
  const user = parseJwt(token || "");
  
  return (
    <>
      <ActivityForm professorId={user.id} />
    </>
  );
}