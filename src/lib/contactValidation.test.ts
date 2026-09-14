import { describe, expect, it } from "vitest";
import { isContactTopic, validateContact } from "@/lib/contactValidation";

describe("validateContact", () => {
  it("accepts a complete enquiry", () => {
    expect(validateContact({ name: "Anna", email: "anna@firma.pl", message: "Potrzebuję strony dla gabinetu." })).toEqual({});
  });

  it("returns the spec's messages for each broken field", () => {
    expect(validateContact({ name: "  ", email: "anna@firma", message: "krótko" })).toEqual({
      name: "Podaj imię, żebyśmy wiedzieli jak się zwracać.",
      email: "Ten adres e-mail wygląda na niepełny.",
      message: "Napisz choć jedno zdanie o projekcie.",
    });
  });

  it("trims before checking the message length", () => {
    expect(validateContact({ name: "Jan", email: "jan@firma.pl", message: "   123456789   " }).message).toBe("Napisz choć jedno zdanie o projekcie.");
    expect(validateContact({ name: "Jan", email: "jan@firma.pl", message: "1234567890" }).message).toBeUndefined();
  });
});

describe("isContactTopic", () => {
  it("knows the four topics", () => {
    expect(["strona", "sklep", "dedykowany", "nie-wiem"].every(isContactTopic)).toBe(true);
    expect(isContactTopic("wordpress")).toBe(false);
  });
});
