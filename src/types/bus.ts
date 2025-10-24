export interface Bus {
  id: string;
  companyName: string;
  busName: string;
  startTime: string;
  arrivalTime: string;
  seatsLeft: number;
  totalSeats: number;
  price: number;
  from: string;
  to: string;
  journeyDate: string;
}

export interface Seat {
  id: string;
  number: string;
  row: number;
  status: 'available' | 'booked' | 'sold' | 'selected';
}

export interface BookingDetails {
  boardingPoint: string;
  droppingPoint: string;
  name: string;
  mobileNumber: string;
  selectedSeats: Seat[];
}

export interface BoardingPoint {
  id: string;
  time: string;
  location: string;
}
