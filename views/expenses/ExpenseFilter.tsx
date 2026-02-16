"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { type DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

export default function ExpenseFilter() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  return (
    <>
      <Card className="w-full">
        <CardContent className="flex items-center gap-5 flex-wrap">
          {/* Search */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              placeholder="Search by title or description"
              className=""
            />
          </div>

          {/* Category Select Dropdown */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col gap-2">
            <Label>Date Range</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-muted-foreground">
                      Pick a date range
                    </span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
