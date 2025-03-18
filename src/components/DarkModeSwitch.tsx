import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";

const DarkModeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      color="default"
      isIconOnly
      onPress={onChange}
      radius="full"
      className="p-2"
      size="md"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default DarkModeSwitch;
