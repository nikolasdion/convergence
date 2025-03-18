import { Link, Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import DarkModeSwitch from "./DarkModeSwitch.js";

import TimezonePicker from "./TimezonePicker.js";

interface Props {
  onTimezoneChange: (timezone: string) => void;
}

const ConvergenceNavbar: React.FC<Props> = ({ onTimezoneChange }) => {
  return (
    <Navbar className="border-b-2 border-solid border-foreground-300">
      <NavbarContent>
        <TimezonePicker onSelectedTimezoneChane={onTimezoneChange} />
      </NavbarContent>

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
