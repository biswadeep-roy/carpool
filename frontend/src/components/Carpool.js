import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isSameDay } from 'date-fns';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './FindCarpoolers.css';

const validFromLocations = [
  'chennai campus', 'vellore campus', 'amravti campus', 'bhopal campus',
  'chennai airport', 'vellore airport', 'amravti airport', 'bhopal airport',
  'chennai railway station', 'vellore railway station', 'amravthi railway station', 'bhopal railway station'
];

const validToLocations = [
  'chennai campus', 'vellore campus', 'amravti campus', 'bhopal campus',
  'chennai airport', 'vellore airport', 'amravti airport', 'bhopal airport',
  'chennai railway station', 'vellore railway station', 'amravthi railway station', 'bhopal railway station'
];

const validCampusOptions = ['chennai', 'vellore', 'amravati', 'bhopal'];

const apiUrl = process.env.REACT_APP_API_URL || '';

const Carpool = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    emailAddress: '',
    campus: '',
    fromLocation: '',
    toLocation: '',
    startTime: null,
    endTime: null,
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [showTermsPopup, setShowTermsPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = null;

    if (name === 'contactNumber' && !isValidPhoneNumber(value)) {
      errorMessage = 'Please enter a valid contact number.';
    } else if (name === 'emailAddress' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = 'Please enter a valid email address.';
    }

    setFormData({ ...formData, [name]: value });
    setSubmitMessage(errorMessage);
  };

  const handleTimeChange = (field, selectedTime) => {
    const currentDate = new Date();
    if (selectedTime < currentDate) {
      setSubmitMessage('Please select a date and time that is today or in the future.');
      return;
    }

    if (field === 'startTime') {
      setFormData({ ...formData, startTime: selectedTime, endTime: null });
    } else if (field === 'endTime') {
      if (!isSameDay(selectedTime, formData.startTime)) {
        setSubmitMessage('End time must have the same date as the start time.');
        return;
      }
      setFormData({ ...formData, endTime: selectedTime });
    }
  };


  const handleSubmit = async () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && typeof formData[key] === 'string' && formData[key].trim() === '') {
        setSubmitMessage(`Please fill in the "${key === 'fromLocation' ? 'From Location' : key}" field.`);
        return;
      }
    }

    if (!validFromLocations.includes(formData.fromLocation.toLowerCase())) {
      setSubmitMessage('Invalid "From Location". Please choose from airport, campus, or railway.');
      return;
    }

    if (!validToLocations.includes(formData.toLocation.toLowerCase())) {
      setSubmitMessage(
        'Invalid "To Location". Please choose from airport, campus, railway, chennai, vellore, amravati, or bhopal.'
      );
      return;
    }

    if (!isSameDay(formData.startTime, formData.endTime)) {
      setSubmitMessage('End date must be the same as the start date.');
      return;
    }

    if (!isValidPhoneNumber(formData.contactNumber)) {
      setSubmitMessage('Please enter a valid contact number.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    if (!agreeTerms) {
      setSubmitMessage('Please agree to our terms and conditions before submitting.');
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/carpools`, formData);
      setSubmitMessage('Carpool entry submitted successfully.');
      setFormData({
        firstName: '',
        lastName: '',
        contactNumber: '',
        emailAddress: '',
        campus: '',
        fromLocation: '',
        toLocation: '',
        startTime: null,
        endTime: null,
      });
      setAgreeTerms(false);
    } catch (error) {
      console.error('Error submitting carpool entry:', error);
      setSubmitMessage('Error submitting carpool entry. Please try again.');
    }
  };

  return (
    <div className="container custom-container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Carpool Registration</h1>
              <form>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Contact Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email Address:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Campus:</label>
                    <select className="form-select" name="campus" value={formData.campus} onChange={handleInputChange}>
                      <option value="">Select Campus</option>
                      {validCampusOptions.map((campusOption) => (
                        <option key={campusOption} value={campusOption}>
                          {campusOption}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">From Location:</label>
                    <select className="form-select" name="fromLocation" value={formData.fromLocation} onChange={handleInputChange}>
                      <option value="">Select From Location</option>
                      {validFromLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">To Location:</label>
                    <select className="form-select" name="toLocation" value={formData.toLocation} onChange={handleInputChange}>
                      <option value="">Select To Location</option>
                      {validToLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Carpool Timing (Start Time - End Time):</label>
                    <div className="d-flex">
                      <DatePicker
                        selected={formData.startTime}
                        onChange={(date) => handleTimeChange('startTime', date)}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={new Date()} 
                        className="form-control"
                        placeholderText="Select Start Time"
                      />
                      <span className="mx-2">-</span>
                      <DatePicker
                        selected={formData.endTime}
                        onChange={(date) => handleTimeChange('endTime', date)}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={new Date()} 
                        className="form-control"
                        placeholderText="Select End Time"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="form-check text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeTerms"
                        checked={agreeTerms}
                        onChange={() => setAgreeTerms(!agreeTerms)}
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the terms and conditions
                        <span
                          className="text-primary ms-1"
                          style={{ cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => setShowTermsPopup(true)}
                        >
                          Read Terms and Conditions
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {showTermsPopup && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document" style={{ maxWidth: '400px', maxHeight: '500px' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Terms and Conditions</h5>
          <button type="button" className="btn-close" onClick={() => setShowTermsPopup(false)}></button>
        </div>
        <div className="modal-body">
          <p>Terms: Welcome to Vit Carpool! We prioritize data security, user accuracy, and responsible use. By using our site, you consent to data collection and agree to liability limitations. We may update terms; continued use implies acceptance. For questions, contact <a href="mailto:biswadeeproy1230@gmail.com">biswadeeproy1230@gmail.com</a>.</p>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowTermsPopup(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

                {submitMessage && (
                  <div className={`alert ${submitMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {submitMessage}
                  </div>
                )}

                <div className="d-grid justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={handleSubmit}
                    style={{ width: '100px', height: '40px' }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carpool;
