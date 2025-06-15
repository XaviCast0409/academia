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

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/create-user" element={<CreateUserForm />} />
        {/* Rutas de usuario */}
        <Route path="/users" element={<UserLayout />}>
          <Route path="/users/actividades" element={<AvailableActivities />} />
          <Route path="/users/actividades/evidence/:id" element={<SendEvidence />} />
          <Route path="/users/profile" element={<UserProfilePage />} />
          <Route path="/users/shop" element={<ProductsUserPage />} />
          <Route path="/users/transactions" element={<UserTransactionsList />} />
          <Route path="/users/actividades/ver/:id" element={<ViewActivityPage />} />

        </Route>
        {/* profesor */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="/admin/actividad" element={<PageAdmin />} />
          <Route path="/admin/recompensa" element={<ProductsPage />} />
          <Route path="/admin/actividad-list" element={<ActivityPage />} />
          <Route path="/admin/actividad/registroEvidence/:id" element={<RegistroPerActivityPage />} />
          <Route path="/admin/evidences" element={<ProfessorEvidenceList />} />
        </Route>

        {/* <Route path="/evidences" element={<ImageCloudinary />} /> */}
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </>
  );
}

export default App;
