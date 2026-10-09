import { useEffect, useState } from "react";

import { submitLead } from "@/lib/api/leads.functions";
import { services, studio } from "@/lib/site-content";

const budgetOptions = [
  "Not sure yet",
  "Under $2,500",
  "$2,500 to $6,000",
  "$6,000 to $15,000",
  "$15,000 and up",
];

const timelineOptions = [
  "As soon as possible",
  "In one to two months",
  "This year",
  "Just planning ahead",
];

const demoGoals = [
  "A new website",
  "A redesign of an old one",
  "An online store",
  "Print and identity work",
  "AI media for my product",
];

interface Props {
  kind: "quote" | "demo";
}

interface Values {
  name: string;
  business: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  timeline: string;
  demoGoal: string;
  message: string;
  trap: string;
}

const emptyValues: Values = {
  budget: "",
  business: "",
  demoGoal: "",
  email: "",
  message: "",
  name: "",
  phone: "",
  services: [],
  timeline: "",
  trap: "",
};

export function LeadForm({ kind }: Props) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle"
  );

  // Read ?service= and ?goal= on the client only, so the server render is never
  // touched by browser globals.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preselect = params.get("service");
    const goal = params.get("goal");
    setValues((current) => {
      const next = { ...current };
      if (preselect) {
        const match = services.find((service) => service.id === preselect);
        if (match) {
          next.services = [match.name];
        }
      }
      if (goal) {
        next.demoGoal = goal;
      }
      return next;
    });
  }, []);

  const update = <Key extends keyof Values>(key: Key, value: Values[Key]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const toggleService = (name: string) =>
    setValues((current) => ({
      ...current,
      services: current.services.includes(name)
        ? current.services.filter((item) => item !== name)
        : [...current.services, name],
    }));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 2) {
      found.name = "Tell us who you are.";
    }
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(values.email.trim())) {
      found.email = "We need a working email to reply.";
    }
    if (kind === "demo" && values.demoGoal.trim().length === 0) {
      found.demoGoal = "Pick what you want to see.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    setStatus("sending");
    try {
      const result = await submitLead({
        data: {
          ...values,
          kind,
          name: values.name.trim(),
          email: values.email.trim(),
          business: values.business.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          sourcePath:
            typeof window === "undefined" ? "" : window.location.pathname,
        },
      });
      setStatus(result.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-status" data-kind="ok">
        Got it. Your request is in the studio queue and you will hear back from
        Tyler, usually within one working day. If it is urgent, call{" "}
        {studio.phone}.
      </div>
    );
  }

  return (
    <form className="form-block" noValidate onSubmit={onSubmit}>
      <div className="field-row">
        <div className="field">
          <label className="field__label" htmlFor="lead-name">
            Your name
          </label>
          <input
            className="field__input"
            id="lead-name"
            onChange={(event) => update("name", event.target.value)}
            placeholder="Tyler Simpson"
            value={values.name}
          />
          {errors.name ? <p className="field__error">{errors.name}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="lead-business">
            Business name
          </label>
          <input
            className="field__input"
            id="lead-business"
            onChange={(event) => update("business", event.target.value)}
            placeholder="Optional"
            value={values.business}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label className="field__label" htmlFor="lead-email">
            Email
          </label>
          <input
            className="field__input"
            id="lead-email"
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@yourbusiness.com"
            type="email"
            value={values.email}
          />
          {errors.email ? <p className="field__error">{errors.email}</p> : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="lead-phone">
            Phone
          </label>
          <input
            className="field__input"
            id="lead-phone"
            onChange={(event) => update("phone", event.target.value)}
            placeholder="Optional"
            value={values.phone}
          />
        </div>
      </div>

      {kind === "quote" ? (
        <>
          <div className="field">
            <span className="field__label">What do you need</span>
            <div className="checkgrid">
              {services.map((service) => (
                <label
                  className="check"
                  data-on={values.services.includes(service.name) ? "true" : "false"}
                  key={service.id}
                >
                  <input
                    checked={values.services.includes(service.name)}
                    onChange={() => toggleService(service.name)}
                    type="checkbox"
                  />
                  {service.name}
                </label>
              ))}
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label className="field__label" htmlFor="lead-budget">
                Budget range
              </label>
              <select
                className="field__select"
                id="lead-budget"
                onChange={(event) => update("budget", event.target.value)}
                value={values.budget}
              >
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="lead-timeline">
                Timeline
              </label>
              <select
                className="field__select"
                id="lead-timeline"
                onChange={(event) => update("timeline", event.target.value)}
                value={values.timeline}
              >
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      ) : (
        <div className="field">
          <label className="field__label" htmlFor="lead-goal">
            What should we show you
          </label>
          <select
            className="field__select"
            id="lead-goal"
            onChange={(event) => update("demoGoal", event.target.value)}
            value={values.demoGoal}
          >
            <option value="">Pick one</option>
            {demoGoals.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.demoGoal ? (
            <p className="field__error">{errors.demoGoal}</p>
          ) : null}
        </div>
      )}

      <div className="field">
        <label className="field__label" htmlFor="lead-message">
          {kind === "quote"
            ? "What is the business, and what is not working"
            : "Anything specific you want to see on the call"}
        </label>
        <textarea
          className="field__textarea"
          id="lead-message"
          onChange={(event) => update("message", event.target.value)}
          placeholder="A few lines is plenty."
          value={values.message}
        />
      </div>

      <div className="honeypot">
        <label htmlFor="lead-trap">Leave this empty</label>
        <input
          id="lead-trap"
          onChange={(event) => update("trap", event.target.value)}
          tabIndex={-1}
          value={values.trap}
        />
      </div>

      <div className="form-foot">
        <button className="cta-slab" disabled={status === "sending"} type="submit">
          <span className="cta-slab__label">
            {status === "sending"
              ? "Sending"
              : kind === "quote"
                ? "Send request"
                : "Book the demo"}
          </span>
          <span
            aria-hidden="true"
            className="cta-slab__label cta-slab__label--ghost"
          >
            {kind === "quote" ? "Send request" : "Book the demo"}
          </span>
        </button>
        <p className="form-note">
          No mailing list, no follow up sequence. One human reply.
        </p>
      </div>

      {status === "failed" ? (
        <div className="form-status" data-kind="error">
          That did not send. Call {studio.phone} or email {studio.email} and we
          will pick it up straight away.
        </div>
      ) : null}
    </form>
  );
}
