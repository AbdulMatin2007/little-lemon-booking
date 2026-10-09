export const TIMES = [
  "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00"
];

export function getAvailableTimes(date) {
  // In a real app this list would come from the restaurant's booking API.
  // Keep the function separate so it can later be replaced and tested easily.
  if (!date) return [];
  return TIMES;
}

export function validateBooking({ name, date, time, guests, occasion }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your full name.";
  if (!date) errors.date = "Please choose a date.";
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${date}T00:00:00`);
    if (Number.isNaN(chosen.getTime()) || chosen < today) {
      errors.date = "Choose today or a future date.";
    }
  }
  if (!time) errors.time = "Please choose a time.";
  const count = Number(guests);
  if (!Number.isInteger(count) || count < 1 || count > 10) {
    errors.guests = "Choose between 1 and 10 guests.";
  }
  if (!["Birthday", "Anniversary", "Other"].includes(occasion)) {
    errors.occasion = "Please choose an occasion.";
  }
  return errors;
}
