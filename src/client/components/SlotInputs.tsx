import { Button, Calendar, DatePicker, Form, Input } from "@heroui/react";
import {
  parseAbsoluteToLocal,
  getLocalTimeZone,
  toTimeZone,
  ZonedDateTime,
  now,
} from "@internationalized/date";
import e from "express";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import SlotInput from "./SlotInput";
import { DateTimeSlot } from "../lib/dateTime";

interface Props {
  slots: DateTimeSlot[];
  onSlotsChange: (slots: DateTimeSlot[]) => void;
  readOnly?: boolean;
}

const SlotInputs: React.FC<Props> = ({
  slots,
  onSlotsChange,
  readOnly = false,
}) => {
  const addNewSlot = () => {
    const newSlots = [...slots];
    if (newSlots[-1]) {
      newSlots.push({ ...slots[-1] });
    } else {
      newSlots.push({
        start: now(getLocalTimeZone()),
        end: now(getLocalTimeZone()).add({ hours: 1 }),
      });
    }
    onSlotsChange(newSlots);
  };

  const renderSlots = () => {
    return slots.map((slot, index) => {
      const onChange = (newSlot?: DateTimeSlot) => {
        const newSlots = [...slots];

        if (!newSlot) {
          // remove slot
          newSlots.splice(index, 1);
          onSlotsChange(newSlots);
        } else {
          // change slot
          newSlots[index] = newSlot;
          onSlotsChange(newSlots);
        }
      };

      return (
        <SlotInput
          key={index}
          readOnly={readOnly}
          slot={slot}
          onSlotChange={onChange}
        />
      );
    });
  };

  return (
    <div className="w-fit flex-row flex-wrap p-2">
      {renderSlots()}
      {!readOnly && (
        <Button className="w-auto" variant="ghost" onPress={addNewSlot}>
          Add new slot
        </Button>
      )}
    </div>
  );
};

export default SlotInputs;
