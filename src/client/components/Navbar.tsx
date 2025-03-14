import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import { getLocalTimeZone } from "@internationalized/date";

import Icon from "../assets/icon.svg";

const ConvergenceNavbar: React.FC = () => {
  return (
    <Navbar className="bg-primary-100 bg-opacity-50">
      <NavbarBrand>
        <img src={Icon} className="h-10"></img>
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
        <NavbarItem>Timezone: {getLocalTimeZone()}</NavbarItem>
        <NavbarItem>
          <DarkModeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default ConvergenceNavbar;
