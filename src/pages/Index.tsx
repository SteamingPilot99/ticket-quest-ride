import { useState } from "react";
import { SearchBusForm } from "@/components/SearchBusForm";
import { BusResultCard } from "@/components/BusResultCard";
import { SeatPlan } from "@/components/SeatPlan";
import { Bus, Seat, BoardingPoint, BookingDetails } from "@/types/bus";
import { Button } from "@/components/ui/button";
import { Bus as BusIcon } from "lucide-react";

// Mock data for demonstration
const mockBuses: Bus[] = [
  {
    id: "1",
    companyName: "National Travels",
    busName: "AC Sleeper",
    startTime: "6:00 AM",
    arrivalTime: "1:30 PM",
    seatsLeft: 36,
    totalSeats: 40,
    price: 700,
    from: "Dhaka",
    to: "Rajshahi",
    journeyDate: "2025-10-23",
  },
  {
    id: "2",
    companyName: "Hanif Enterprise",
    busName: "AC Business",
    startTime: "6:00 AM",
    arrivalTime: "1:15 PM",
    seatsLeft: 40,
    totalSeats: 40,
    price: 700,
    from: "Dhaka",
    to: "Rajshahi",
    journeyDate: "2025-10-23",
  },
  {
    id: "3",
    companyName: "Grameen Travels",
    busName: "Non-AC Seater",
    startTime: "6:01 AM",
    arrivalTime: "12:51 PM",
    seatsLeft: 36,
    totalSeats: 40,
    price: 700,
    from: "Dhaka",
    to: "Rajshahi",
    journeyDate: "2025-10-23",
  },
  {
    id: "4",
    companyName: "Shyamoli Paribahan",
    busName: "AC Sleeper",
    startTime: "7:30 AM",
    arrivalTime: "2:00 PM",
    seatsLeft: 15,
    totalSeats: 40,
    price: 750,
    from: "Dhaka",
    to: "Rajshahi",
    journeyDate: "2025-10-23",
  },
];

const mockSeats: Seat[] = Array.from({ length: 40 }, (_, i) => ({
  id: `seat-${i + 1}`,
  number: `${i + 1}`,
  row: Math.floor(i / 4) + 1,
  status: i % 7 === 0 ? "booked" : i % 11 === 0 ? "sold" : "available",
}));

const mockBoardingPoints: BoardingPoint[] = [
  { id: "bp1", time: "06:00 AM", location: "Kallyanpur Counter" },
  { id: "bp2", time: "06:30 AM", location: "Gabtoli Counter" },
  { id: "bp3", time: "07:00 AM", location: "Mohakhali Counter" },
];

const mockDroppingPoints: BoardingPoint[] = [
  { id: "dp1", time: "10:30 AM", location: "Baneshore Counter" },
  { id: "dp2", time: "12:30 PM", location: "Rajshahi Counter" },
  { id: "dp3", time: "01:00 PM", location: "Rajabari Counter" },
];

const Index = () => {
  const [searchResults, setSearchResults] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showSeatPlan, setShowSeatPlan] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (from: string, to: string, date: Date) => {
    // Filter mock buses based on search criteria
    const results = mockBuses.filter(
      (bus) => bus.from === from && bus.to === to
    );
    setSearchResults(results);
    setSearchPerformed(true);
    setShowSeatPlan(false);
  };

  const handleViewSeats = (busId: string) => {
    const bus = searchResults.find((b) => b.id === busId);
    if (bus) {
      setSelectedBus(bus);
      setShowSeatPlan(true);
    }
  };

  const handleBooking = (details: BookingDetails) => {
    console.log("Booking details:", details);
    // Here you would typically send this to your backend API
    setShowSeatPlan(false);
    setSelectedBus(null);
    setSearchPerformed(false);
    setSearchResults([]);
  };

  const handleBack = () => {
    setShowSeatPlan(false);
    setSelectedBus(null);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <BusIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bus Ticket Reservation
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!showSeatPlan ? (
          <div className="space-y-8">
            <SearchBusForm onSearch={handleSearch} />

            {searchPerformed && (
              <div>
                {searchResults.length > 0 ? (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          Available Buses
                        </h2>
                        <p className="text-muted-foreground">
                          Total Buses Found: {searchResults.length} | Total
                          Seats Available:{" "}
                          {searchResults.reduce(
                            (acc, bus) => acc + bus.seatsLeft,
                            0
                          )}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSearchPerformed(false)}
                      >
                        Modify Search
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {searchResults.map((bus) => (
                        <BusResultCard
                          key={bus.id}
                          bus={bus}
                          onViewSeats={handleViewSeats}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                      No buses found for this route. Please try a different
                      search.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          selectedBus && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedBus.companyName} - {selectedBus.busName}
                </h2>
                <p className="text-muted-foreground">
                  {selectedBus.from} to {selectedBus.to} | {selectedBus.startTime}{" "}
                  - {selectedBus.arrivalTime}
                </p>
              </div>
              <SeatPlan
                seats={mockSeats}
                boardingPoints={mockBoardingPoints}
                droppingPoints={mockDroppingPoints}
                seatPrice={selectedBus.price}
                onBooking={handleBooking}
                onBack={handleBack}
              />
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Index;
