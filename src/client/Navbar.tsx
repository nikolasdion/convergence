import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import DarkModeSwitch from "./DarkModeSwitch";

const ConvergenceNavbar: React.FC = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Convergence</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/" underline="hover">
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <DarkModeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default ConvergenceNavbar;
