import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MoonLoader from "react-spinners/MoonLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Payment = () => {
	const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [ccvNumber, setCcvNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [toggleCard, settoggleCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleBackCard = () => {
    settoggleCard((prev) => !prev);
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value.replace(/\D/g, "");
    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i % 4 === 0 && i > 0) {
        formattedInput += " ";
      }
      formattedInput += input[i];
    }
    setCardNumber(formattedInput);
  };

  const handleCcvNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value.replace(/\D/g, "");
    setCcvNumber(input);
  };

  const handleExpDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, "");
    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i % 2 === 0 && i > 0) {
        formattedInput += "/";
      }
      formattedInput += input[i];
    }
    setExpDate(formattedInput);
  };

  const handleCardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value);
  };
const handlePayment= async (e: React.FormEvent<HTMLFormElement>) =>{
	e.preventDefault();
	Cookies.remove("selectedTicket");
	localStorage.removeItem("filteredTickets");
	setLoading(true);
	try{
		await new Promise(resolve => setTimeout(resolve, 2000));
		setLoading(false);
		toast.success("Successfully paid!");
	}finally{
		navigate("/");
	}
}
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
        <form onSubmit={handlePayment} className="bg-white w-full max-w-3xl mx-auto px-4 lg:px-6 py-8 shadow-md rounded-md flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r-2 lg:border-slate-300">
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Card number:
              </label>
              <input
			  required
                id="cardNumber"
                type="text"
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                maxLength={19}
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>
            <div className="flex gap-x-2 mb-4">
              <div className="block">
                <label className="text-neutral-800 font-bold text-sm mb-2 block">
                  Exp. date:
                </label>
                <input
				required
                  id="expDate"
                  type="text"
                  className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                  maxLength={5}
                  placeholder="MM/YY"
                  value={expDate}
                  onChange={handleExpDateChange}
                />
              </div>
              <div className="block">
                <label className="text-neutral-800 font-bold text-sm mb-2 block">
                  CCV:
                </label>
                <input
				required
                  id="ccvNumber"
                  type="text"
                  className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                  maxLength={3}
                  placeholder="123"
                  value={ccvNumber}
                  onChange={handleCcvNumberChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Cardholder name:
              </label>
              <input
			  required
                id="cardName"
                type="text"
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                placeholder="John Doe"
                value={cardName}
                onChange={handleCardNameChange}
              />
            </div>
            <button

              type="submit"
              className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm Payment
            </button>
          </div>

          <div onClick={toggleBackCard}>
            <div
              className={`w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110 ${
                toggleCard ? "opacity-0 invisible" : "opacity-100"
              }`}
            >
              <img
                className="relative object-cover w-full h-full rounded-xl"
                src="https://i.ibb.co/LPLv5MD/Payment-Card-01.jpg"
              />

              <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                  <div className="pt-1">
                    <p className="font-light">Card Number</p>
                    <p className="font-medium tracking-more-wider">
                      {cardNumber}
                    </p>
                  </div>
                  <img
                    className="w-14 h-14"
                    src="https://i.imgur.com/bbPHJVe.png"
                  />
                </div>

                <div className="pt-6 pr-6">
                  <div className="flex justify-between">
                    <div className="">
                      <p className="font-light">Name</p>
                      <p className="font-medium tracking-widest">{cardName}</p>
                    </div>
                    <div className="">
                      <p className="font-light text-xs">Valid</p>
                      <p className="font-medium tracking-wider text-sm">
                        {expDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`h-56 m-auto rounded-xl text-white shadow-2xl absolute transition-opacity top-[130px] hover:scale-110 ${
                toggleCard ? "opacity-100" : "opacity-0 invisible"
              }`}
            >
              <img
                src="https://i.ibb.co/LPLv5MD/Payment-Card-01.jpg"
                className="relative object-cover w-full h-full rounded-xl"
              />
              <div className="w-full absolute top-8">
                <div className="bg-black h-10"></div>
                <div className="px-8 mt-5">
                  <div className="flex space-between">
                    <div className="flex-1 h-8 bg-red-100"></div>
                    <p
                      id="imageCCVNumber"
                      className="bg-white text-black flex items-center pl-4 pr-2 w-14"
                    >
                      {ccvNumber}
                    </p>
                  </div>
                  <p className="font-light flex justify-end text-xs mt-2">
                    security code
                  </p>
                  <div className="flex justify-end mt-2">
                    <svg
                      className="w-14 h-14"
                      width="45"
                      height="36"
                      viewBox="0 0 45 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.4164 2.97418H28.5836V24.8367H16.4164V2.97418Z"
                        fill="#FF5F00"
                      />
                      <path
                        d="M8.18925 35.8409V33.5234C8.18925 32.6348 7.64837 32.0556 6.72127 32.0556C6.2578 32.0556 5.75563 32.2101 5.40794 32.7123C5.13768 32.2873 4.75146 32.0556 4.17204 32.0556C3.78564 32.0556 3.3996 32.1714 3.09045 32.5963V32.1328H2.2793V35.8409H3.09045V33.7937C3.09045 33.1372 3.43813 32.828 3.97902 32.828C4.51955 32.828 4.79017 33.1757 4.79017 33.7937V35.8409H5.60132V33.7937C5.60132 33.1372 5.98736 32.828 6.48953 32.828C7.03042 32.828 7.30068 33.1757 7.30068 33.7937V35.8409H8.18925ZM20.2018 32.1328H18.8887V31.0127H18.0775V32.1328H17.3436V32.8666H18.0774V34.5663C18.0774 35.4162 18.4251 35.9182 19.3522 35.9182C19.6998 35.9182 20.0859 35.8024 20.3565 35.6479L20.1246 34.9525C19.8929 35.107 19.6226 35.1457 19.4294 35.1457C19.0432 35.1457 18.8887 34.914 18.8887 34.5276V32.8666H20.2018V32.1328ZM27.0774 32.0554C26.614 32.0554 26.305 32.2873 26.1118 32.5963V32.1328H25.3006V35.8409H26.1118V33.7551C26.1118 33.1372 26.3821 32.7895 26.8842 32.7895C27.0387 32.7895 27.2319 32.8282 27.3864 32.8668L27.6181 32.0943C27.4637 32.0556 27.2319 32.0556 27.0774 32.0556V32.0554ZM16.687 32.4418C16.3006 32.1714 15.7599 32.0556 15.1805 32.0556C14.2535 32.0556 13.6356 32.5191 13.6356 33.253C13.6356 33.8711 14.099 34.2186 14.9102 34.3346L15.2964 34.3733C15.7213 34.4503 15.9531 34.5663 15.9531 34.7595C15.9531 35.0298 15.6441 35.223 15.1032 35.223C14.5625 35.223 14.1376 35.0298 13.8671 34.8367L13.4809 35.4547C13.9058 35.7637 14.4853 35.9182 15.0645 35.9182C16.1461 35.9182 16.7642 35.4162 16.7642 34.7208C16.7642 34.0641 16.262 33.7164 15.4894 33.6007L15.1032 33.562C14.7555 33.5232 14.4853 33.4462 14.4853 33.2144C14.4853 32.944 14.7555 32.7895 15.1805 32.7895C15.6441 32.7895 16.1076 32.9825 16.3393 33.0985L16.687 32.4418ZM38.2405 32.0556C37.7769 32.0556 37.4679 32.2873 37.2747 32.5963V32.1328H36.4635V35.8409H37.2747V33.7551C37.2747 33.1372 37.5451 32.7895 38.0471 32.7895C38.2018 32.7895 38.395 32.8282 38.5495 32.8668L38.7812 32.0943C38.6267 32.0556 38.395 32.0556 38.2405 32.0556ZM27.8886 33.9869C27.8886 35.107 28.661 35.9182 29.8586 35.9182C30.3993 35.9182 30.7855 35.8024 31.1717 35.4934L30.7855 34.8367C30.4765 35.0685 30.1675 35.1843 29.8199 35.1843C29.1632 35.1843 28.6997 34.7208 28.6997 33.9869C28.6997 33.2917 29.1632 32.828 29.8199 32.7895C30.1675 32.7895 30.4765 32.9053 30.7855 33.1372L31.1717 32.4805C30.7855 32.1714 30.3993 32.0556 29.8586 32.0556C28.661 32.0556 27.8886 32.8668 27.8886 33.9869ZM35.3821 33.9869V32.1328H34.571V32.5963C34.3005 32.2488 33.9143 32.0556 33.4121 32.0556C32.3693 32.0556 31.5581 32.8668 31.5581 33.9869C31.5581 35.107 32.3693 35.9182 33.4121 35.9182C33.9529 35.9182 34.3392 35.7251 34.571 35.3774V35.8409H35.3821V33.9869ZM32.4078 33.9869C32.4078 33.3302 32.8327 32.7895 33.5279 32.7895C34.1846 32.7895 34.6482 33.2917 34.6482 33.9869C34.6482 34.6435 34.1846 35.1843 33.5279 35.1843C32.8327 35.1455 32.4078 34.6435 32.4078 33.9869ZM22.7127 32.0556C21.6311 32.0556 20.8585 32.828 20.8585 33.9869C20.8585 35.1457 21.6309 35.9182 22.7512 35.9182C23.292 35.9182 23.8328 35.7637 24.2578 35.4162L23.8714 34.8367C23.5624 35.0685 23.1762 35.223 22.79 35.223C22.2878 35.223 21.7856 34.9912 21.6697 34.3344H24.4123V34.0256C24.451 32.828 23.7556 32.0556 22.7125 32.0556H22.7127ZM22.7127 32.7508C23.2147 32.7508 23.5626 33.06 23.6396 33.6394H21.7084C21.7856 33.1372 22.1333 32.7508 22.7127 32.7508ZM42.837 33.9869V30.665H42.0258V32.5963C41.7554 32.2488 41.3692 32.0556 40.867 32.0556C39.8241 32.0556 39.013 32.8668 39.013 33.9869C39.013 35.107 39.8241 35.9182 40.867 35.9182C41.4079 35.9182 41.7941 35.7251 42.0258 35.3774V35.8409H42.837V33.9869ZM39.8628 33.9869C39.8628 33.3302 40.2876 32.7895 40.9829 32.7895C41.6396 32.7895 42.1031 33.2917 42.1031 33.9869C42.1031 34.6435 41.6396 35.1843 40.9829 35.1843C40.2876 35.1455 39.8628 34.6435 39.8628 33.9869ZM12.747 33.9869V32.1328H11.9359V32.5963C11.6654 32.2488 11.2792 32.0556 10.777 32.0556C9.73413 32.0556 8.92298 32.8668 8.92298 33.9869C8.92298 35.107 9.73413 35.9182 10.777 35.9182C11.3179 35.9182 11.7041 35.7251 11.9359 35.3774V35.8409H12.747V33.9869ZM9.73413 33.9869C9.73413 33.3302 10.1591 32.7895 10.8543 32.7895C11.5109 32.7895 11.9746 33.2917 11.9746 33.9869C11.9746 34.6435 11.5109 35.1843 10.8543 35.1843C10.1591 35.1455 9.73413 34.6435 9.73413 33.9869Z"
                        fill="white"
                      />
                      <path
                        d="M17.1888 13.9055C17.1888 9.46353 19.2746 5.52356 22.4805 2.97416C20.1244 1.12013 17.1503 0 13.9057 0C6.21876 0 0 6.21876 0 13.9055C0 21.5921 6.21876 27.811 13.9055 27.811C17.1501 27.811 20.1243 26.6909 22.4805 24.8367C19.2746 22.326 17.1888 18.3475 17.1888 13.9055Z"
                        fill="#EB001B"
                      />
                      <path
                        d="M44.9995 13.9055C44.9995 21.5921 38.7808 27.811 31.094 27.811C27.8494 27.811 24.8752 26.6909 22.519 24.8367C25.7636 22.2874 27.8109 18.3475 27.8109 13.9055C27.8109 9.46353 25.7249 5.52356 22.519 2.97416C24.8751 1.12013 27.8494 0 31.094 0C38.7808 0 44.9997 6.25747 44.9997 13.9055H44.9995Z"
                        fill="#F79E1B"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
		<MoonLoader
        loading={loading}
		color="#36d7b7"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </main>

    </div>
  );
};

export default Payment;
