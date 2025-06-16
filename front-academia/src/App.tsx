import "./App.css";
import { RolesPage } from "./pages/RolePage/RolePage";
import { Login } from "./pages/loginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import { CreateUserForm } from "./components/form/CreateUserForm";
import { PageAdmin } from "./pages/PageAdmin";
import { ProductsPage } from "./components/products/ProductsPage";
import { ActivityPage } from "./components/activity/ActivityPage";
import { RegistroPerActivityPage } from "./components/registro/RegistroPerActivityPage";
import { AvailableActivities } from "./components/activity/ActivityPerStudentPage";
import { SendEvidence } from "./components/activity/SendEvidence";
import { UserProfilePage } from "./components/user/UserProfilePage";
import { ProductsUserPage } from "./components/productsUser/ProductUserPage"
import { UserTransactionsList } from "./components/transaction/TransactionPage";
import { ViewActivityPage } from "./components/activity/ViewActivityPage";
import { ProfessorEvidenceList } from "./components/evidence/EvidencePerProfessor";
import { EvidencePerStudents } from "./components/evidence/EvidencePerStudents";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/create-user" element={<CreateUserForm />} />
        {/* Rutas de usuario */}
        <Route path="/users" element={<UserLayout />}>
          <Route path="actividades" element={<AvailableActivities />} />
          <Route path="actividades/evidence/:id" element={<SendEvidence />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="shop" element={<ProductsUserPage />} />
          <Route path="transactions" element={<UserTransactionsList />} />
          <Route path="actividades/ver/:id" element={<ViewActivityPage />} />
          <Route path="evidences" element={<EvidencePerStudents />} />
        </Route>
        {/* profesor */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="actividad" element={<PageAdmin />} />
          <Route path="recompensa" element={<ProductsPage />} />
          <Route path="actividad-list" element={<ActivityPage />} />
          <Route path="actividad/registroEvidence/:id" element={<RegistroPerActivityPage />} />
          <Route path="evidences" element={<ProfessorEvidenceList />} />
        </Route>

        {/* <Route path="/evidences" element={<ImageCloudinary />} /> */}
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </>
  );
}

export default App;
