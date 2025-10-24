import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Seat, BoardingPoint, BookingDetails } from "@/types/bus";
import { toast } from "sonner";
import { Armchair, MapPin, User, Phone } from "lucide-react";

interface SeatPlanProps {
  seats: Seat[];
  boardingPoints: BoardingPoint[];
  droppingPoints: BoardingPoint[];
  seatPrice: number;
  onBooking: (details: BookingDetails) => void;
  onBack: () => void;
}

const SeatLegend = () => {
  const statuses = [
    { status: "Available", color: "bg-available" },
    { status: "Booked", color: "bg-booked" },
    { status: "Sold", color: "bg-sold" },
    { status: "Selected", color: "bg-selected" },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {statuses.map(({ status, color }) => (
        <div key={status} className="flex items-center gap-2">
          <div className={`w-6 h-6 ${color} rounded`}></div>
          <span className="text-sm font-medium">{status}</span>
        </div>
      ))}
    </div>
  );
};

export const SeatPlan = ({
  seats,
  boardingPoints,
  droppingPoints,
  seatPrice,
  onBooking,
  onBack,
}: SeatPlanProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked" || seat.status === "sold") {
      toast.error("This seat is not available");
      return;
    }

    const isSelected = selectedSeats.find((s) => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, status: "selected" }]);
    }
  };

  const handleSubmit = () => {
    if (!boardingPoint || !droppingPoint || !name || !mobile) {
      toast.error("Please fill all required fields");
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    if (mobile.length !== 11) {
      toast.error("Please enter a valid 11-digit mobile number");
      return;
    }

    onBooking({
      boardingPoint,
      droppingPoint,
      name,
      mobileNumber: mobile,
      selectedSeats,
    });

    toast.success("Booking confirmed successfully!");
  };

  const getSeatColor = (seat: Seat) => {
    const isSelected = selectedSeats.find((s) => s.id === seat.id);
    if (isSelected) return "bg-selected text-selected-foreground";

    switch (seat.status) {
      case "available":
        return "bg-available text-available-foreground hover:bg-available/80";
      case "booked":
        return "bg-booked text-booked-foreground cursor-not-allowed";
      case "sold":
        return "bg-sold text-sold-foreground cursor-not-allowed";
      default:
        return "bg-muted";
    }
  };

  const totalPrice = selectedSeats.length * seatPrice;
  const serviceCharge = selectedSeats.length * 20;
  const pgwCharge = selectedSeats.length * 28;

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-4"
      >
        ← Back to Results
      </Button>

      <Card className="p-6 shadow-card">
        <SeatLegend />

        {/* Seat Grid */}
        <div className="mb-8 overflow-x-auto">
          <div className="inline-grid grid-cols-4 gap-3 min-w-max mx-auto">
            {seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => toggleSeat(seat)}
                disabled={seat.status === "booked" || seat.status === "sold"}
                className={`w-12 h-12 rounded-lg font-semibold text-sm transition-all flex items-center justify-center ${getSeatColor(
                  seat
                )} ${
                  seat.status === "available" || selectedSeats.find((s) => s.id === seat.id)
                    ? "hover:scale-110"
                    : ""
                }`}
              >
                {seat.number}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="boarding" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Boarding Point *
            </Label>
            <Select value={boardingPoint} onValueChange={setBoardingPoint}>
              <SelectTrigger id="boarding" className="bg-background">
                <SelectValue placeholder="Select boarding point" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {boardingPoints.map((point) => (
                  <SelectItem key={point.id} value={point.id}>
                    [{point.time}] {point.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropping" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Dropping Point *
            </Label>
            <Select value={droppingPoint} onValueChange={setDroppingPoint}>
              <SelectTrigger id="dropping" className="bg-background">
                <SelectValue placeholder="Select dropping point" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {droppingPoints.map((point) => (
                  <SelectItem key={point.id} value={point.id}>
                    [{point.time}] {point.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Mobile Number *
            </Label>
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="01XXXXXXXXX"
              maxLength={11}
              className="bg-background"
            />
          </div>
        </div>

        {/* Price Summary */}
        {selectedSeats.length > 0 && (
          <Card className="p-4 mb-6 bg-muted/50">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Seat Fare ({selectedSeats.length} seats):</span>
                <span className="font-semibold">৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Service Charge:</span>
                <span>৳{serviceCharge}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>PGW Charge:</span>
                <span>৳{pgwCharge}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary">
                  ৳{totalPrice + serviceCharge + pgwCharge}
                </span>
              </div>
            </div>
          </Card>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
          disabled={selectedSeats.length === 0}
        >
          <Armchair className="mr-2 h-5 w-5" />
          Confirm Booking ({selectedSeats.length} seat
          {selectedSeats.length !== 1 ? "s" : ""})
        </Button>
      </Card>
    </div>
  );
};
