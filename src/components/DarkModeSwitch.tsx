import { Button } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="flat"
      color="default"
      isIconOnly
      onPress={onChange}
      radius="full"
      className="p-1"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default DarkModeSwitch;
