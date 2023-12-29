import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FindCarpoolers.css';

const validCampusOptions = ['chennai', 'vellore', 'amravati', 'bhopal'];
const validLocations = ['chennai campus', 'vellore campus', 'amravati campus', 'bhopal campus', 'chennai airport', 'vellore airport', ' amravati airport', 'bhopal airport', 'chennai railway station', 'vellore railway station', 'amravathi railway station', 'bhopal railway station'];
const validFromLocations = ['chennai campus', 'vellore campus', 'amravati campus', 'bhopal campus', 'chennai airport', 'vellore airport', ' amravati airport', 'bhopal airport', 'chennai railway station', 'vellore railway station', 'amravathi railway station', 'bhopal railway station'];
const apiUrl = process.env.REACT_APP_API_URL || '';

const FindCarpoolers = () => {
  const [searchData, setSearchData] = useState({
    startTime: null,
    endTime: null,
    campus: '',
    fromLocation: '',
    toLocation: '',
  });

  const [matchingCarpoolers, setMatchingCarpoolers] = useState([]);
  const [searchMessage, setSearchMessage] = useState(null);

  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (field, selectedTime) => {
    const currentDate = new Date();
    if (selectedTime < currentDate) {
      setSearchMessage('Please select a date and time that is today or in the future.');
      return;
    }

    if (field === 'startTime') {
      setSearchData({ ...searchData, startTime: selectedTime, endTime: selectedTime });
    } else if (field === 'endTime') {
      if (selectedTime < searchData.startTime) {
        setSearchMessage('End time must be after the start time.');
        return;
      }
      setSearchData({ ...searchData, endTime: selectedTime });
    }
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/findCarpoolers`, searchData);

      if (response.data.success) {
        const isMatching =
          response.data.carpoolers.length > 0 &&
          response.data.carpoolers.every(
            (carpooler) =>
              carpooler.campus === searchData.campus &&
              carpooler.fromLocation === searchData.fromLocation &&
              carpooler.toLocation === searchData.toLocation
          );

        if (isMatching) {
          setMatchingCarpoolers(response.data.carpoolers);
          setSearchMessage("Carpoolers found! Below are their details please do not misuse any information");
        } else {
          setMatchingCarpoolers([]);
          setSearchMessage('No matching carpoolers found. Please try different slots, and also enter your slot to the database so that people can find you to carpool');
        }
      } else {
        setMatchingCarpoolers([]);
        setSearchMessage('No matching carpoolers found. Please try different slots, and also enter your slot to the database so that people can find you to carpool');
      }
    } catch (error) {
      console.error('Error searching for carpoolers:', error);
      setSearchMessage('Error searching for carpoolers. Please try again.');
    }
  };

  return (
    <div className="container custom-container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Find Carpoolers</h1>
              <div className="mb-3">
                <label htmlFor="startTime" className="form-label">
                  Start Time:
                </label>
                <DatePicker
                  selected={searchData.startTime}
                  onChange={(date) => handleTimeChange('startTime', date)}
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={new Date()}
                  className="form-control"
                  placeholderText="Select Start Time"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endTime" className="form-label">
                  End Time:
                </label>
                <DatePicker
                  selected={searchData.endTime}
                  onChange={(date) => handleTimeChange('endTime', date)}
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={new Date()}
                  className="form-control"
                  placeholderText="Select End Time"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="campus" className="form-label">
                  Campus:
                </label>
                <select className="form-select" name="campus" value={searchData.campus} onChange={handleSearchChange}>
                  <option value="">Select Campus</option>
                  {validCampusOptions.map((campusOption) => (
                    <option key={campusOption} value={campusOption}>
                      {campusOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="fromLocation" className="form-label">
                  From Location:
                </label>
                <select className="form-select" name="fromLocation" value={searchData.fromLocation} onChange={handleSearchChange}>
                  <option value="">Select From Location</option>
                  {validFromLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="toLocation" className="form-label">
                  To Location:
                </label>
                <select className="form-select" name="toLocation" value={searchData.toLocation} onChange={handleSearchChange}>
                  <option value="">Select To Location</option>
                  {validLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 text-center">
                <button type="button" className="btn btn-primary" onClick={handleSearchSubmit}>
                  Search
                </button>
              </div>

              {searchMessage && (
                <p className={`text-${matchingCarpoolers.length > 0 ? 'success' : 'danger'}`}>{searchMessage}</p>
              )}
              {matchingCarpoolers.length > 0 && (
                <div>
                  <h2>Matching Carpoolers:</h2>
                  <ul>
                    {matchingCarpoolers.map((carpooler) => (
                      <li key={carpooler._id}>
                        <strong>Name:</strong> {carpooler.firstName} {carpooler.lastName} <br />
                        <strong>Contact Number:</strong> {carpooler.contactNumber} <br />
                        <strong>Email Address:</strong> {carpooler.emailAddress}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCarpoolers;
