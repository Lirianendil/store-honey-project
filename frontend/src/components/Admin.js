import { useAdmin } from "../hooks/useAdmin";

export const Admin = () => {
  useAdmin();

  return (
    <div>
      <h2>Admin</h2>
    </div>
  );
};

export default Admin;
