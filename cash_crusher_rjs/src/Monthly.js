import React from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";

export const Monthly = () => {
  return (
    <div>
      <FullCalendar plugins={[daygridPlugin]} />
    </div>
  );
};
