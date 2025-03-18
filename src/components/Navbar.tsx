import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import DarkModeSwitch from "./DarkModeSwitch.js";
import { getLocalTimeZone } from "@internationalized/date";

import Icon from "../assets/icon.svg";

const ConvergenceNavbar: React.FC = () => {
  return (
    <Navbar className="border-b-2 border-solid border-foreground-300">
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
