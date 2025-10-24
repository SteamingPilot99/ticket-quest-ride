import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

interface SearchBusFormProps {
  onSearch: (from: string, to: string, date: Date) => void;
}

const cities = [
  "Dhaka",
  "Rajshahi",
  "Barisal",
  "Cox's Bazar",
  "Chittagong",
  "Chapainawabganj",
  "Sylhet",
  "Khulna",
];

const trendingSearches = [
  "Dhaka → Rajshahi",
  "Dhaka → Barisal",
  "Dhaka → Cox's Bazar",
  "Dhaka → Chittagong",
  "Dhaka → Chapainawabganj",
];

export const SearchBusForm = ({ onSearch }: SearchBusFormProps) => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const handleSearch = () => {
    if (from && to && date) {
      onSearch(from, to, date);
    }
  };

  return (
    <div className="w-full space-y-8">
      <Card className="p-6 md:p-8 shadow-card hover:shadow-hover transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="from" className="text-base font-semibold">
              Going From
            </Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger
                id="from"
                className="h-12 bg-background border-2 focus:border-primary"
              >
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to" className="text-base font-semibold">
              Going To
            </Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger
                id="to"
                className="h-12 bg-background border-2 focus:border-primary"
              >
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-base font-semibold">
              Journey Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal border-2 hover:border-primary",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          disabled={!from || !to || !date}
          className="w-full mt-6 h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <Search className="mr-2 h-5 w-5" />
          Search Bus
        </Button>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Trending Searches:
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((search) => (
            <Button
              key={search}
              variant="secondary"
              size="sm"
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => {
                const [fromCity, toCity] = search.split(" → ");
                setFrom(fromCity);
                setTo(toCity);
              }}
            >
              {search}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
