import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <p>Main App layout (turn it off later)</p>
      <Outlet />
    </div>
  );
}

export default AppLayout;
