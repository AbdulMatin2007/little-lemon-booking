import { useMemo, useState } from "react";
import { getAvailableTimes, validateBooking } from "./booking.js";

function todayString() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export default function App() {
  const [form, setForm] = useState({
    name: "",
    date: todayString(),
    time: "18:00",
    guests: "2",
    occasion: "Birthday",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const availableTimes = useMemo(() => getAvailableTimes(form.date), [form.date]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setConfirmation(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateBooking(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setConfirmation(null);
      return;
    }
    setConfirmation({ ...form });
  }

  function handleReset() {
    setForm({
      name: "",
      date: todayString(),
      time: "18:00",
      guests: "2",
      occasion: "Birthday",
      notes: ""
    });
    setErrors({});
    setConfirmation(null);
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="brand-mark" aria-hidden="true">🍋</span>
          <span>LITTLE LEMON</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a className="nav-current" href="#booking" aria-current="page">Reservations</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">CHICAGO · MEDITERRANEAN</p>
            <h1 id="hero-title">A little taste<br /><em>of sunshine.</em></h1>
            <p>Fresh ingredients, bold Mediterranean flavors, and a table waiting just for you.</p>
            <a className="button button-yellow" href="#booking">Reserve a table</a>
          </div>
          <div className="hero-art" role="img" aria-label="Illustration of a Mediterranean meal with lemon and vegetables">
            <div className="sun"></div>
            <div className="plate">
              <div className="food food-one"></div>
              <div className="food food-two"></div>
              <div className="food food-three"></div>
              <div className="lemon lemon-one"></div>
              <div className="leaf leaf-one"></div>
              <div className="leaf leaf-two"></div>
            </div>
            <span className="art-caption">Fresh · Seasonal · Delicious</span>
          </div>
        </section>

        <section className="booking-section" id="booking" aria-labelledby="booking-title">
          <div className="section-intro">
            <p className="eyebrow">YOUR TABLE IS WAITING</p>
            <h2 id="booking-title">Book a table</h2>
            <p>Tell us a little about your visit. We’ll take care of the rest.</p>
          </div>

          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field field-wide">
                <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
                <input
                  id="name" name="name" type="text" autoComplete="name"
                  placeholder="e.g. Alex Morgan" value={form.name}
                  onChange={updateField} aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                />
                {errors.name && <p className="error" id="name-error" role="alert">{errors.name}</p>}
              </div>

              <div className="field">
                <label htmlFor="date">Choose date <span aria-hidden="true">*</span></label>
                <input
                  id="date" name="date" type="date" min={todayString()}
                  value={form.date} onChange={updateField}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "date-error" : undefined} required
                />
                {errors.date && <p className="error" id="date-error" role="alert">{errors.date}</p>}
              </div>

              <div className="field">
                <label htmlFor="time">Choose time <span aria-hidden="true">*</span></label>
                <select id="time" name="time" value={form.time} onChange={updateField}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? "time-error" : undefined} required>
                  {availableTimes.map((time) => <option key={time} value={time}>{time}</option>)}
                </select>
                {errors.time && <p className="error" id="time-error" role="alert">{errors.time}</p>}
              </div>

              <div className="field">
                <label htmlFor="guests">Number of guests <span aria-hidden="true">*</span></label>
                <select id="guests" name="guests" value={form.guests} onChange={updateField}
                  aria-invalid={Boolean(errors.guests)}
                  aria-describedby={errors.guests ? "guests-error" : undefined} required>
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((number) =>
                    <option key={number} value={String(number)}>
                      {number} {number === 1 ? "guest" : "guests"}
                    </option>
                  )}
                </select>
                {errors.guests && <p className="error" id="guests-error" role="alert">{errors.guests}</p>}
              </div>

              <div className="field">
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" name="occasion" value={form.occasion} onChange={updateField}>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Other</option>
                </select>
                {errors.occasion && <p className="error" id="occasion-error" role="alert">{errors.occasion}</p>}
              </div>

              <div className="field field-wide">
                <label htmlFor="notes">Special requests <span className="optional">(optional)</span></label>
                <textarea id="notes" name="notes" rows="3" maxLength="300"
                  placeholder="Allergies, accessibility needs, or other requests…"
                  value={form.notes} onChange={updateField} />
                <p className="field-hint">Up to 300 characters.</p>
              </div>
            </div>

            <div className="form-actions">
              <button className="button button-yellow" type="submit">Confirm reservation</button>
              <button className="button button-quiet" type="button" onClick={handleReset}>Clear form</button>
            </div>
            <p className="required-note">Fields marked with * are required.</p>
          </form>

          {confirmation && (
            <section className="confirmation" role="status" aria-live="polite">
              <div className="confirmation-icon" aria-hidden="true">✓</div>
              <div>
                <h3>Thanks, {confirmation.name.trim()}!</h3>
                <p>Your booking request is ready.</p>
                <p><strong>{confirmation.date}</strong> at <strong>{confirmation.time}</strong> · {confirmation.guests} {Number(confirmation.guests) === 1 ? "guest" : "guests"} · {confirmation.occasion}</p>
                {confirmation.notes.trim() && <p>Request: {confirmation.notes.trim()}</p>}
                <p className="demo-note">Demo project: this confirmation is shown locally and is not sent to a restaurant.</p>
              </div>
            </section>
          )}
        </section>
      </main>

      <footer className="site-footer" id="about">
        <a className="brand footer-brand" href="#home"><span aria-hidden="true">🍋</span> LITTLE LEMON</a>
        <p>Fresh Mediterranean food, made with a little sunshine.</p>
        <p>© {new Date().getFullYear()} Little Lemon · Student capstone project</p>
      </footer>
    </div>
  );
}
