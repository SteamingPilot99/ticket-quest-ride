import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus as BusIcon, Clock, Users } from "lucide-react";
import { Bus } from "@/types/bus";

interface BusResultCardProps {
  bus: Bus;
  onViewSeats: (busId: string) => void;
}

export const BusResultCard = ({ bus, onViewSeats }: BusResultCardProps) => {
  return (
    <Card className="p-4 md:p-6 shadow-card hover:shadow-hover transition-all hover:scale-[1.01]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BusIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{bus.companyName}</h3>
              <p className="text-sm text-muted-foreground">{bus.busName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Departure</p>
                <p className="font-semibold">{bus.startTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Arrival</p>
                <p className="font-semibold">{bus.arrivalTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Seats Left</p>
                <Badge
                  variant={bus.seatsLeft > 10 ? "default" : "destructive"}
                  className="font-semibold"
                >
                  {bus.seatsLeft}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col items-center md:items-end gap-3 justify-between md:justify-start">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">৳{bus.price}</p>
          </div>
          <Button
            onClick={() => onViewSeats(bus.id)}
            className="bg-gradient-primary hover:opacity-90 transition-opacity font-semibold"
          >
            View Seats
          </Button>
        </div>
      </div>
    </Card>
  );
};
