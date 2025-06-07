import React, { useEffect } from 'react';
import './SignUp.css';

const SignUp = () => {
  useEffect(() => {
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const yearSelect = document.getElementById('year-select');

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();

    monthNames.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index + 1;
      option.textContent = month;
      if (index === currentMonth) option.selected = true;
      monthSelect.appendChild(option);
    });

    for (let year = 1950; year <= 2025; year++) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      if (year === currentYear) option.selected = true;
      yearSelect.appendChild(option);
    }

    const updateDays = () => {
      const selectedYear = parseInt(yearSelect.value);
      const selectedMonth = parseInt(monthSelect.value);
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      daySelect.innerHTML = '';

      for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        if (day === currentDay) option.selected = true;
        daySelect.appendChild(option);
      }
    };

    updateDays();
    monthSelect.addEventListener('change', updateDays);
    yearSelect.addEventListener('change', updateDays);
  }, []);

  return (
    <div className="signup-container">
      <h2>Create a new account</h2>
      <form>
        <div className="name-fields">
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last name" required />
        </div>

        <input type="email" placeholder="Mobile number or email" required />
        <input type="password" placeholder="New password" required />

        <label>Birthday</label>
        <div className="birthday-select">
          <select id="month-select"></select>
          <select id="day-select"></select>
          <select id="year-select"></select>
        </div>

        <label>Gender</label>
        <div className="gender-options">
          <label><input type="radio" name="gender" /> Female</label>
          <label><input type="radio" name="gender" /> Male</label>
        </div>

        <p className="terms">
          By clicking Sign Up, you agree to our <a href="#">Terms</a>, 
          <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
        </p>

        <button type="submit">Sign Up</button>
        <p className="login-link"><a href="/">Already have an account?</a></p>
      </form>
    </div>
  );
};

export default SignUp;
