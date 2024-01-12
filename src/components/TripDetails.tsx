import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
interface UserData {
  uid: string;
  email: string;
  gender: string;
}
interface SeatLayout {
  seat_number: number;
  is_female_only: boolean;
  gender: string;
}

interface Ticket {
  seatsLayout: SeatLayout[];
  // other properties of Ticket
}
interface SelectedSeat {
  seatNumber: number;
  isFemaleOnly: boolean;
}
const TripDetails = () => {
  const [passenger, setPassenger] = useState<UserData | null>(null);
  const [ticketLayout, setTicketLayout] = useState<SeatLayout[] | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const fetchData = async () => {
    try {
      // Get email from localStorage
      const localStorageData = localStorage.getItem("user");
      const userEmail = localStorageData
        ? JSON.parse(localStorageData).email
        : null;
      console.log("User Email:", userEmail);

      // Check if email is available
      if (userEmail) {
        // Initialize Firestore
        const db = firebase.firestore();
        const userCollection = db.collection("users");

        // Query Firestore for user with matching email
        const querySnapshot = await userCollection
          .where("email", "==", userEmail)
          .get();

        if (!querySnapshot.empty) {
          // User with matching email found
          const userData = querySnapshot.docs[0].data() as UserData;
          setPassenger(userData);
          console.log("User Data:", userData);
          // Do further processing with userData
        } else {
          console.log("User with email not found in Firestore.");
        }
      } else {
        console.log("User email not available in localStorage.");
      }
    } catch (err) {
      console.error("Error occurred when fetching user data:", err);
    }
  };
  const getTicketDetails = () => {
    const ticketString = Cookies.get("selectedTicket");

    if (ticketString) {
      const ticket: Ticket = JSON.parse(ticketString);
      setTicketLayout(ticket.seatsLayout);
    }
  };
  const selectSeat = (
    seatNumber: number,
    isFemaleOnly: boolean,
    gender: string
  ) => {
    if (selectedSeats.length <= 5) {
      // Check if the seat is empty
      const isSeatEmpty = gender === "";

      // Check gender restrictions
      if (!isSeatEmpty || (passenger?.gender === "male" && isFemaleOnly)) {
        toast.error(
          `Seat ${seatNumber} is not available for selection for male passengers.`
        );
      } else if (passenger?.gender === "female" && !isFemaleOnly) {
        toast.error(
          `Seat ${seatNumber} is not available for selection for female passengers.`
        );
      } else {
        const isAlreadySelected = selectedSeats.some(
          (seat) => seat.seatNumber === seatNumber
        );

        if (isAlreadySelected) {
          // If the seat is already selected, remove it from the selectedSeats array
          const updatedSeats = selectedSeats.filter(
            (seat) => seat.seatNumber !== seatNumber
          );
          setSelectedSeats(updatedSeats);
          toast.info(`Seat ${seatNumber} removed.`);
        } else {
          // If the seat is not already selected, add it to the selectedSeats array
          setSelectedSeats([...selectedSeats, { seatNumber, isFemaleOnly }]);
          toast.success(`Seat ${seatNumber} selected.`);
        }
      }
    } else {
      toast.error("Maximum seat limit reached.");
    }
  };
  useEffect(() => {
    fetchData();
    getTicketDetails();
    console.log(selectedSeats);
  }, [selectedSeats]);
  if (!ticketLayout) {
    return <div>Loading...</div>; // or any loading indicator
  }
  return (
    <div className="space-y-8">
      <h2>Seat Picker</h2>

      {/* Seat Selection */}
      <div className="grid grid-cols-4 gap-8">
        {ticketLayout.map((seat) => (
          <div
            key={seat.seat_number}
            className="border-2 p-5 bg-white rounded-md"
            style={{
              backgroundColor:
                seat.gender === "male"
                  ? "lightblue"
                  : seat.gender === "female"
                  ? "pink"
                  : "gray",
            }}
            onClick={() =>
              selectSeat(seat.seat_number, seat.is_female_only, seat.gender)
            }
          >
            Seat {seat.seat_number}
            {selectedSeats.some(
              (selectedSeat) => selectedSeat.seatNumber === seat.seat_number
            ) && (
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripDetails;
