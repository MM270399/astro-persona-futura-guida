
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(props.selected as Date || new Date());

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];

  const handleYearChange = (year: number) => {
    const newDate = new Date(month);
    newDate.setFullYear(year);
    setMonth(newDate);
  };

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(month);
    newDate.setMonth(monthIndex);
    setMonth(newDate);
  };

  return (
    <div className="bg-black/90 text-white border border-purple-500/50 rounded-lg p-3">
      {/* Selettori Anno e Mese */}
      <div className="flex gap-2 mb-4 justify-center">
        <select 
          value={month.getFullYear()} 
          onChange={(e) => handleYearChange(parseInt(e.target.value))}
          className="bg-black/70 border border-purple-500/50 text-white px-2 py-1 rounded text-sm"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        
        <select 
          value={month.getMonth()} 
          onChange={(e) => handleMonthChange(parseInt(e.target.value))}
          className="bg-black/70 border border-purple-500/50 text-white px-2 py-1 rounded text-sm"
        >
          {months.map((monthName, index) => (
            <option key={index} value={index}>{monthName}</option>
          ))}
        </select>
      </div>

      <DayPicker
        {...props}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        className={cn("pointer-events-auto", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center text-white",
          caption_label: "text-sm font-medium text-white",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-purple-500/50 text-white hover:bg-white/10"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-purple-200 rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-purple-600/50 [&:has([aria-selected])]:bg-purple-600/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-white hover:bg-white/10 hover:text-white"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-purple-600 text-white hover:bg-purple-700 hover:text-white focus:bg-purple-600 focus:text-white",
          day_today: "bg-purple-800/50 text-purple-200 font-semibold",
          day_outside:
            "day-outside text-gray-400 opacity-50 aria-selected:bg-purple-600/50 aria-selected:text-gray-300 aria-selected:opacity-30",
          day_disabled: "text-gray-500 opacity-50",
          day_range_middle:
            "aria-selected:bg-purple-600/50 aria-selected:text-white",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4 text-white" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4 text-white" />,
        }}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
