import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import "./TripDetails.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
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
}
interface SelectedSeat {
  seatNumber: number;
  isFemaleOnly: boolean;
}
interface TripData {
  company: string;
  arrival: string;
  departure: string;
  date: string;
  busNumber: string;
  amenities: string[];
  price: number;
}
const TripDetails = () => {
	const navigate = useNavigate();
  const [passenger, setPassenger] = useState<UserData | null>(null);
  const [ticketLayout, setTicketLayout] = useState<SeatLayout[] | null>(null);
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const fetchData = async () => {
    try {
      // Get email from localStorage
      const localStorageData = localStorage.getItem("user");
      const userEmail = localStorageData
        ? JSON.parse(localStorageData).email
        : null;

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
  const getTripDetails = () => {
    const ticketString = Cookies.get("selectedTicket");

    if (ticketString) {
      const parsedTripData = JSON.parse(ticketString) as TripData;

      setTripData(parsedTripData);
    }
  };
  const calculateTotalPrice = (): {
    subtotal: number;
    tax: number;
    total: number;
  } => {
    const seatPrice = tripData?.price;
    const taxRate = 0.1;
    if (seatPrice !== undefined) {
      const subtotal = selectedSeats.length * seatPrice;
      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      return { subtotal, tax, total };
    }

    return { subtotal: 0, tax: 0, total: 0 };
  };
  const Abort = () => {
    Cookies.remove("selectedTicket");
    setTripData(null);
	navigate("/");
  };
  const updateTotalPrice = () => {
    if (tripData && selectedSeats.length > 0) {
      const { subtotal, tax, total } = calculateTotalPrice();
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };
const HandleCheckout=(selectedSeats : any) => {
	Cookies.set("selectedSeats", JSON.stringify(selectedSeats));
	navigate('/Payment')
}
  const selectSeat = (
    seatNumber: number,
    isFemaleOnly: boolean,
    gender: string
  ) => {
    if (selectedSeats.length <= 5) {
      const isSeatEmpty = gender === "";
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
          const updatedSeats = selectedSeats.filter(
            (seat) => seat.seatNumber !== seatNumber
          );
          setSelectedSeats(updatedSeats);
          toast.info(`Seat ${seatNumber} removed.`);
        } else {
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
    getTripDetails();
  }, [selectedSeats]);
  useEffect(() => {
    if (tripData && selectedSeats.length > 0) {
      updateTotalPrice();
    } else {
      setTotalPrice(0);
    }
  }, [tripData, selectedSeats]);
  if (!ticketLayout) {
    return <div className="text-white">There's no selected travel found</div>;
  }
  return (
    <div className="space-y-8 seat-layout sm:grid grid-cols-2 gap-8">
      <div>
        <div className="border border-white rounded-md bg-slate-700 sm:w-1/2 flex p-5 justify-around">
          <div className="bg-pink-300 rounded-md p-2">Taken by Female</div>
          <div className="bg-sky-300 rounded-md p-2">Taken by Male</div>
          <div className="bg-slate-500 rounded-md p-2">Available</div>
        </div>
        <div className="border border-white rounded-md bg-slate-700 sm:w-1/2 h-1/2 mt-10">
          <div className="steerinclass flex justify-around">
            <img
              className="steering"
              src="https://cdn4.iconfinder.com/data/icons/automotive-glyph/64/automotive_vehicle-18-512.png"
            />
            <div className="flex">
              {tripData?.amenities && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </>
              )}
            </div>
          </div>

          <div
            className="grid grid-cols-4 gap-8 mt-20"
            style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            {ticketLayout.map((seat, index) => (
              <div
                key={seat.seat_number}
                className={`w-3/4 border-2 p-5 bg-white rounded-md cursor-pointer hover:opacity-75 transition ease-in-out delay-150 ${
                  index % 4 === 0 || index % 4 === 2 ? "ml-auto" : ""
                }`}
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
                <span className="flex justify-around">
                  {seat.seat_number}
                  {selectedSeats.some(
                    (selectedSeat) =>
                      selectedSeat.seatNumber === seat.seat_number
                  ) && (
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mt-4 sm:flex sm:justify-end sm:flex-none">
          <button
            onClick={Abort}
            type="button"
            className="flex rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Abort
          </button>
        </div>
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>
          {tripData && (
            <>
              <div className="flex justify-around">
                <p> {tripData.company}</p>
                <p> {tripData.departure}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>

                <p> {tripData.arrival}</p>
                <p className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  {tripData.date}
                </p>
              </div>
            </>
          )}
          <p>{selectedSeats.length} seats selected</p>
          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                {" "}
                ${calculateTotalPrice().subtotal.toFixed(2)}
              </dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a
                  href="#"
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">
                    Learn more about how tax is calculated
                  </span>
                  <QuestionMarkCircleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                ${calculateTotalPrice().tax.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
                ${calculateTotalPrice().total.toFixed(2)}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              onClick={() => HandleCheckout(selectedSeats)}
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TripDetails;
