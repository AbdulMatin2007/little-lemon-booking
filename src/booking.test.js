import { describe, expect, it } from "vitest";
import { getAvailableTimes, validateBooking } from "./booking.js";

describe("getAvailableTimes", () => {
  it("returns no times when no date is supplied", () => {
    expect(getAvailableTimes("")).toEqual([]);
  });

  it("returns the available reservation times for a date", () => {
    expect(getAvailableTimes("2099-06-15")).toContain("18:00");
    expect(getAvailableTimes("2099-06-15").length).toBeGreaterThan(0);
  });
});

describe("validateBooking", () => {
  it("requires a name and valid booking details", () => {
    const errors = validateBooking({
      name: " ",
      date: "",
      time: "",
      guests: "0",
      occasion: "Birthday"
    });
    expect(errors.name).toBeTruthy();
    expect(errors.date).toBeTruthy();
    expect(errors.time).toBeTruthy();
    expect(errors.guests).toBeTruthy();
  });

  it("accepts a complete booking with a future date", () => {
    const errors = validateBooking({
      name: "Alex Morgan",
      date: "2099-06-15",
      time: "18:00",
      guests: "2",
      occasion: "Birthday"
    });
    expect(errors).toEqual({});
  });

  it("rejects more than ten guests", () => {
    const errors = validateBooking({
      name: "Alex Morgan",
      date: "2099-06-15",
      time: "18:00",
      guests: "11",
      occasion: "Other"
    });
    expect(errors.guests).toBeTruthy();
  });
});
