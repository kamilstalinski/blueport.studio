# BluePort Studio — Website Structure & Information Architecture

**Positioning:** Premium web engineering studio. Performance-driven. Technical partner, not generic agency.

---

## 1. Full sitemap tree

```
/
├── /                    Home
├── /uslugi              Services (detailed)
├── /realizacje          Case Studies (overview)
│   └── /realizacje/[slug]   Single case study
├── /proces              Process (detailed)
├── /o-nas               About
├── /blog                Blog (optional, scalable)
├── /kontakt             Contact
│
├── /polityka-prywatnosci   Privacy Policy (legal)
└── /regulamin              Terms (legal)
```

**Note:** Route names can stay as current PL convention (`/oferta`, `/realizacje`, `/cennik`, `/faq`, `/kontakt`) or align to this IA; the structure below is logic-first.

---

## 2. Home page — section breakdown

**Role:** Authority builder, conversion funnel, expertise overview, trust accelerator.  
**Max sections:** 7.

| # | Section name | Purpose | Conversion role |
|---|--------------|---------|------------------|
| 1 | **Hero** | Immediate clarity. Positioning + primary/secondary CTA + one trust stat. | Push to Contact or Services. |
| 2 | **Core value proposition** | Differentiate: engineering / performance / scalability (3 pillars). | Shift perception from “agency” to “technical partner”. |
| 3 | **Services overview** | Quick scan of 3 core offerings. Cards + “Learn more” + one CTA under grid. | Drive to Services page. |
| 4 | **Selected case studies** | Proof. 2–3 projects with metrics (e.g. before/after). | Increase trust; link to full Case Studies. |
| 5 | **Process overview** | 4-step summary. Minimal copy. | Reduce uncertainty; link to Process page. |
| 6 | **Authority & trust** | Testimonials, numbers, stack (e.g. Next.js), or results. | Professional validation. |
| 7 | **Final CTA** | Strong headline, short reassurance, one primary CTA. | Conversion close. |

**CTA mapping (Home):**

- Hero: primary = Contact (or “Umów konsultację”), secondary = Realizacje or Usługi.
- Services overview: one CTA = “Zobacz usługi” → /uslugi.
- Case studies block: one CTA = “Wszystkie realizacje” → /realizacje.
- Process block: one CTA = “Jak pracujemy” → /proces.
- Final CTA: one primary = Contact.

**Trust-building hierarchy (order):**

1. Hero trust stat (e.g. “X projektów” / “Y ms LCP”).
2. Value pillars (competence).
3. Services (what you offer).
4. Case studies (proof).
5. Process (predictability).
6. Testimonials/numbers/stack (validation).
7. Final CTA (commitment).

---

## 3. Services page — section breakdown

**Goal:** Detailed clarity + qualification.  
**Max sections:** 7.

| # | Section | Purpose | Conversion role |
|---|---------|---------|------------------|
| 1 | **Hero** | Service philosophy in one sentence. Single H1. | Set “technical partner” frame. |
| 2 | **Service 1** (e.g. Strony biznesowe) | Scope, use cases, ideal client, outcomes. | Qualify; one “Learn more” or inline CTA. |
| 3 | **Service 2** (e.g. Sklepy internetowe) | Same structure. | Same. |
| 4 | **Service 3** (e.g. Landing page) | Same structure. | Same. |
| 5 | **Technical stack** | Performance-first, frameworks, SEO, scalability. | Reinforce engineering positioning. |
| 6 | **FAQ** | Objection handling (timeline, scope, stack). | Reduce friction. |
| 7 | **CTA** | Consultation / Contact. | Conversion to consultation. |

**Internal links from Services:**

- Each service can link to 1–2 related case studies.
- One primary CTA section → Contact.

---

## 4. Case studies page — structure

**Overview page (/realizacje):**

| # | Section | Purpose | Conversion role |
|---|---------|---------|------------------|
| 1 | **Hero** | Results-driven headline (e.g. “Wyniki, nie obietnice”). | Set expectations. |
| 2 | **Case study cards** | Grid: Client, Problem, Solution, Measurable result. | Proof; click to single. |
| 3 | **CTA** | Contact or “Opowiedz o swoim projekcie”. | Conversion. |

**Single case study page (/realizacje/[slug]):**

| # | Block | Content |
|---|--------|--------|
| 1 | Business context | Who, industry, starting point. |
| 2 | Challenge | What needed to change. |
| 3 | Strategy | Approach and priorities. |
| 4 | Implementation | What was built. |
| 5 | Technical stack | Frameworks, performance, SEO. |
| 6 | Results | Metrics (speed, conversions, traffic). |
| 7 | Lessons learned | Short, honest takeaway. |
| 8 | CTA | Contact / “Similar project?”. |

**Internal links:** Each case links to related service(s) and Contact.

---

## 5. Process page — section breakdown

**Goal:** Reduce uncertainty; define deliverables and timeline.

| # | Step | Deliverables (example) | Timeline hint |
|---|------|------------------------|---------------|
| 1 | **Discovery** | Brief, goals, KPIs, content audit. | 1–2 weeks. |
| 2 | **Architecture & UX** | Sitemap, wireframes, key flows. | 1–2 weeks. |
| 3 | **Development** | Front-end, CMS/integrations, performance. | 2–6 weeks (scope-dependent). |
| 4 | **Testing & optimization** | QA, Core Web Vitals, SEO checks. | ~1 week. |
| 5 | **Launch & support** | Deploy, DNS, handover, optional support. | Ongoing. |

**Conversion:** One primary CTA at bottom → Contact (e.g. “Umów rozmowę o projekcie”).

---

## 6. About page — section breakdown

**Goal:** Humanize while keeping technical authority. No marketing fluff.

| # | Section | Purpose |
|---|---------|--------|
| 1 | **Hero / Mission** | One clear mission statement. |
| 2 | **Philosophy** | How you work (e.g. system thinking, no “plik graficzny”). |
| 3 | **Technical mindset** | Why performance, structure, scalability. |
| 4 | **Why we don’t do fluff** | Short, direct (no hype, no overpromise). |
| 5 | **CTA** | Contact. |

**Avoid:** Long emotional storytelling; keep it scannable and confident.

---

## 7. Contact page — structure

| # | Element | Purpose |
|---|---------|--------|
| 1 | **Headline** | Short reassurance (e.g. “Zacznijmy od rozmowy”). |
| 2 | **Intro copy** | What happens next (e.g. reply in 24h, no obligation). |
| 3 | **Contact form** | Minimal fields: name, email, message (+ optional project type). |
| 4 | **Response time** | e.g. “Odpowiadamy w 24h”. |
| 5 | **Optional** | Calendar booking link. |

**Friction reduction:** One primary submit CTA; clear “next steps” in copy.

---

## 8. Legal pages

- **Privacy Policy** — standard: data collected, cookies, rights, contact.
- **Terms** — scope of services, liability, IP, termination (when needed).

No conversion focus; linked from footer only.

---

## 9. Conversion logic — rules

- **One primary CTA per section** (no 2–3 competing buttons in one block).
- **No CTA overload** — max 1–2 CTAs above the fold on Home.
- **Progression:** Awareness (Hero, value) → Proof (services, case studies) → Process (overview/detail) → Conversion (Contact).
- **Anchors:** Each major section can end with one clear next step (link or button), not multiple.

---

## 10. Internal linking plan

| From | To | Rationale |
|------|----|-----------|
| Home | Services, Case Studies, Contact | Main paths. |
| Home (services block) | Services | “Learn more”. |
| Home (case studies) | Case Studies | “All case studies”. |
| Home (process) | Process | “How we work”. |
| Services | Related case study (per service) | Proof. |
| Services | Contact | Consultation. |
| Case Studies (overview) | Single case, Contact | Deeper proof + convert. |
| Single case study | Related service(s), Contact | Context + convert. |
| Process | Contact | “Start a project”. |
| About | Contact | Humanize then convert. |
| Blog (future) | Services, Case Studies | Context and proof. |

**Consistency:** Every main template (Home, Services, Case Studies, Process, About) has at least one path to Contact and one to a relevant proof/process page.

---

## 11. SEO structure (per page)

- **Single H1** per page (positioning or main topic).
- **H2** for major sections only; **H3** for subsections (e.g. per service, per step).
- **Semantic sections:** `<section>`, `<article>` where appropriate; avoid div soup.
- **Meta:** Unique title + description per page; internal links use descriptive anchor text.
- **URLs:** Short, readable (e.g. /uslugi, /realizacje, /proces, /kontakt). Single case: /realizacje/[slug].

---

## 12. CTA mapping strategy (summary)

| Page | Primary CTA | Secondary CTA (optional) |
|------|-------------|---------------------------|
| Home (Hero) | Umów konsultację → Contact | Zobacz realizacje → Case Studies |
| Home (Services block) | Zobacz usługi → Services | — |
| Home (Case studies) | Wszystkie realizacje → Case Studies | — |
| Home (Process) | Jak pracujemy → Process | — |
| Home (Final) | Skontaktuj się → Contact | — |
| Services | Umów konsultację → Contact | — |
| Case Studies | Opowiedz o projekcie → Contact | — |
| Process | Umów rozmowę → Contact | — |
| About | Skontaktuj się → Contact | — |
| Contact | Wyślij (form submit) | — |

---

## 13. Future scalability notes

- **New services:** Add as new section on Services page + card on Home; keep “3 core” on Home, expand list on /uslugi.
- **Resource hub / knowledge base:** New section or sub-path (e.g. /blog, /zasoby); link from Services and Case Studies.
- **Pricing page:** Add /cennik when ready; link from Services and Contact; one CTA to Contact or calendar.
- **Client portal:** Separate app or subdomain; linked from footer or post-project CTA only.
- **Modular sections:** Each section is a reusable component (Hero, ValuePillars, ServiceCards, CaseStudyGrid, ProcessSteps, Testimonials, CTA). New pages = compose sections; no hardcoded “page type” in layout.
- **Blog:** Optional; list + single post; internal links to Services and Case Studies; no CTA overload.

---

## 14. Layout rules (reminder)

- Max **7 sections** per page.
- Clear **visual separation** (spacing, borders, background contrast).
- Strong **whitespace**; no dense blocks.
- **One CTA anchor** per section (single button or link).
- No **micro-sections** (e.g. 10 tiny blocks); group into fewer, clear sections.

---

*Document version: 1.0 — Structure and logic only. No code. Ready for implementation in Cursor.*
