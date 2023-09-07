import React, { useState, useEffect } from 'react';
import AddPassenger from './Addpassenger';
import Logout from './logoutButton'

export default function Passenger() {
  const [isAddPassengerOpen, setAddPassengerOpen] = useState(false);
  const [passengers, setPassengers] = useState([]);

  const openPassengerModal = () => {
    setAddPassengerOpen(true);
  };

  const closePassengerModal = () => {
    setAddPassengerOpen(false);
  };

  const fetchPassengers = () => {
    fetch(`${process.env.REACT_APP_API}/getpassenger`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Passenger data:', data);
        setPassengers(data);
      })
      .catch((error) => {
        console.error('Error fetching passengers:', error.message);

      });
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const toggleAccordion = (index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].expanded = !updatedPassengers[index].expanded;
    setPassengers(updatedPassengers);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Total Passenger: {passengers.length}</h2>
        <Logout />
      </div>
      <h2>Passengers allotted food:</h2>
      <div className='container mx-auto border-2 border-black my-4 p-4'>
        {passengers.map((passenger, index) => (
          <div key={index} className="border rounded-lg mb-2">
            <button
              className={`w-full text-left px-4 py-2 ${passenger.expanded
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-black'
                } focus:outline-none focus:ring focus:ring-blue-300`}
              type="button"
              onClick={() => toggleAccordion(index)}
            >
              {passenger.name}
            </button>
            {passenger.expanded && (
              <div className="px-4 py-2">
                <strong>Destination:</strong> {passenger.destination}<br />
                <strong>Seat Number:</strong> {passenger.seatNumber}

              </div>
            )}
          </div>
        ))}
      </div>
      <div className='container mx-auto border-2 border-black my-4 p-4'>
        <div className="container border-2 border-black p-2">
          <p>Total price:</p>
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Total payment collected
          </button>
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={openPassengerModal}
        >
          Add Passenger
        </button>
        {isAddPassengerOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-8 w-1/2">

              <AddPassenger closeModal={closePassengerModal} updatePassengers={fetchPassengers} />

            </div>
          </div>
        )}
      </div>
    </>
  );
}
