
import { Sidebar } from "flowbite-react";
import { HiInbox, HiTable, HiUser } from "react-icons/hi";

export const Sidebars = () => {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/trails" icon={HiInbox}>
            Trails
          </Sidebar.Item>
          <Sidebar.Item href="/profile" icon={HiUser}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default Sidebars