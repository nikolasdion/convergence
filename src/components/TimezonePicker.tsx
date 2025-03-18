import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useContext } from "react";

import { timezones } from "../lib/dateTime";
import { TimezoneContext } from "../TimezoneContext";

interface Props {
  onSelectedTimezoneChane: (timezone: string) => void;
}

const TimezonePicker: React.FC<Props> = ({ onSelectedTimezoneChane }) => {
  const timezone = useContext(TimezoneContext);
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        className="w-fit"
        label="Timezone"
        labelPlacement="outside-left"
        selectedKey={timezone}
        onSelectionChange={(a) => {
          if (a) onSelectedTimezoneChane(a as string);
        }}
        defaultInputValue={timezone}
      >
        {timezones.map((timezone) => (
          <AutocompleteItem key={timezone}>{timezone}</AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default TimezonePicker;
