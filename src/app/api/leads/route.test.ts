import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { send, insert, single } = vi.hoisted(() => {
  const single = vi.fn();
  const insert = vi.fn(() => ({ select: () => ({ single }) }));
  return { send: vi.fn(), insert, single };
});

vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));
vi.mock("@/lib/supabase", () => ({ supabase: { from: vi.fn(() => ({ insert })) } }));

import { POST } from "./route";

const VALID_LEAD = {
  name: "Jan Kowalski",
  email: "jan@example.com",
  phone: "",
  packageId: "strona-start",
  features: [],
  timeline: "standard",
  projectPriority: null,
  total: 2500,
  base: 2500,
  featuresTotal: 0,
  label: "od 2500 zł",
  estimatedTimeline: "od 7 dni roboczych",
  qualificationTags: [],
  projectDescription: "Strona start [WordPress], dodatki: brak",
  breakdown: [{ label: "Pakiet bazowy — Strona start [WordPress]", price: 2500 }],
};

function post(body: unknown) {
  return POST(new NextRequest("http://localhost/api/leads", { method: "POST", body: JSON.stringify(body) }));
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RESEND_FROM = "Blueport <ci@example.com>";
  process.env.NOTIFICATION_EMAIL = "owner@example.com";
  send.mockResolvedValue({ data: { id: "email-1" }, error: null });
  single.mockResolvedValue({ data: { id: "lead-1" }, error: null });
});

describe("POST /api/leads", () => {
  it("rejects a lead without a name", async () => {
    const response = await post({ ...VALID_LEAD, name: "" });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Brakuje wymaganych pól" });
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects a malformed email", async () => {
    const response = await post({ ...VALID_LEAD, email: "jan@" });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Nieprawidłowy format email" });
    expect(insert).not.toHaveBeenCalled();
  });

  it("stores the lead, mails the client and then the owner", async () => {
    const response = await post(VALID_LEAD);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true, id: "lead-1" });
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({
      name: "Jan Kowalski",
      email: "jan@example.com",
      phone: null,
      package_id: "strona-start",
      total: 2500,
      price_label: "od 2500 zł",
      status: "new",
    }));
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0][0]).toMatchObject({ to: "jan@example.com", subject: "Twoja wycena — Strona start [WordPress]" });
    expect(send.mock.calls[1][0]).toMatchObject({ to: "owner@example.com", subject: "🔔 Nowy lead: Jan Kowalski — Strona start [WordPress]" });
  });

  it("returns 500 and sends nothing when the insert fails", async () => {
    single.mockResolvedValue({ data: null, error: { message: "db down" } });
    vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await post(VALID_LEAD);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Błąd zapisu" });
    expect(send).not.toHaveBeenCalled();
  });

  // Known defects, fixed in Plan B (audit A1–A5, A8).
  it.todo("escapes HTML in every user-supplied value of both emails");
  it.todo("rejects an unknown packageId or feature id with 400 before inserting");
  it.todo("recomputes the price server-side instead of trusting total/label/breakdown from the body");
  it.todo("returns an error when Resend responds with { error }");
  it.todo("rejects honeypot submissions, foreign origins, oversized bodies and rate-limited IPs");
  it.todo("stores and emails the calculator message and budget");
});
