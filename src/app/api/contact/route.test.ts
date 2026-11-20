import { beforeEach, describe, expect, it, vi } from "vitest";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));

import { POST } from "./route";

const VALID_MESSAGE = {
  name: "Anna Nowak",
  email: "anna@example.com",
  topic: "strona",
  message: "Potrzebuję nowej strony dla firmy.",
};

function post(body: unknown) {
  return POST(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RESEND_FROM = "Blueport <ci@example.com>";
  process.env.NOTIFICATION_EMAIL = "owner@example.com";
  delete process.env.OWNER_EMAIL;
  send.mockResolvedValue({ data: { id: "email-1" }, error: null });
});

describe("POST /api/contact", () => {
  it.each([
    ["name", { ...VALID_MESSAGE, name: "" }],
    ["message", { ...VALID_MESSAGE, message: "" }],
    ["topic", { ...VALID_MESSAGE, topic: "inne" }],
  ])("rejects a missing or invalid %s", async (_field, body) => {
    const response = await post(body);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Brakuje wymaganych pól" });
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects a malformed email", async () => {
    const response = await post({ ...VALID_MESSAGE, email: "anna@" });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Nieprawidłowy format email" });
  });

  it("returns 500 when no owner address is configured", async () => {
    delete process.env.NOTIFICATION_EMAIL;
    const response = await post(VALID_MESSAGE);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Brak wymaganych zmiennych środowiskowych" });
  });

  it("notifies the owner with a reply-to and confirms to the sender", async () => {
    const response = await post(VALID_MESSAGE);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0][0]).toMatchObject({ to: "owner@example.com", replyTo: "anna@example.com", subject: "[Blueport] Nowe zapytanie od Anna Nowak" });
    expect(send.mock.calls[1][0]).toMatchObject({ to: "anna@example.com", subject: "Otrzymałem Twoją wiadomość — Blueport Studio" });
  });

  it("prefers OWNER_EMAIL over NOTIFICATION_EMAIL", async () => {
    process.env.OWNER_EMAIL = "boss@example.com";
    await post(VALID_MESSAGE);
    expect(send.mock.calls[0][0]).toMatchObject({ to: "boss@example.com" });
  });

  it("escapes HTML in the owner notification", async () => {
    await post({ ...VALID_MESSAGE, name: "<b>Anna</b>" });
    const { html } = send.mock.calls[0][0] as { html: string };
    expect(html).toContain("&lt;b&gt;Anna&lt;/b&gt;");
    expect(html).not.toContain("<b>Anna</b>");
  });

  it("returns 500 when a send rejects", async () => {
    send.mockRejectedValueOnce(new Error("network"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await post(VALID_MESSAGE);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Błąd wysyłki wiadomości" });
  });

  // Known defects, fixed in Plan B (audit A2, A3, A8).
  it.todo("returns an error when Resend responds with { error } instead of throwing");
  it.todo("enforces the client's minimum message length and trimming");
  it.todo("rejects honeypot submissions, foreign origins, oversized bodies and rate-limited IPs");
});
