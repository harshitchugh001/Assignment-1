import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPassenger = ({ closeModal, updatePassengers }) => {
  const [passenger, setPassenger] = useState({
    name: '',
    destination: '',
    seatNumber: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prevPassenger) => ({
      ...prevPassenger,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
  
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/addpassenger`,
      data: passenger,
    })
      .then((response) => {
        console.log('Passenger added successfully', response);
        toast.success('Passenger added successfully');
        setPassenger({
          name: '',
          destination: '',
          seatNumber: '',
        });
        closeModal();
        updatePassengers(); 
      })
      .catch((error) => {
        console.error('Error adding passenger:', error.response.data);
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  
  

  return (
    <div className="modal">
      <>
        <h2 className="text-2xl font-bold mb-4">Add Passenger</h2>

        <form>
          <div className="my-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={passenger.name}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 bg-slate-100"
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <input
              type="text"
              name="destination"
              id="destination"
              value={passenger.destination}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 bg-slate-100"
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="seatNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Seat Number
            </label>
            <input
              type="text"
              name="seatNumber"
              id="seatNumber"
              value={passenger.seatNumber}
              onChange={handleInputChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 bg-slate-100"
            />
          </div>

          <button
            type="button"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Adding Passenger...' : 'Add Passenger'}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
            onClick={closeModal}
          >
            Close
          </button>
        </form>
      </>
    </div>
  );
};

export default AddPassenger;
