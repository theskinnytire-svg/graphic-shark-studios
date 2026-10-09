import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

const emailish = z
  .string()
  .min(3)
  .max(220)
  .refine((value) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(value), {
    message: "Enter a valid email address",
  });

const leadSchema = z.object({
  budget: z.string().max(80).optional().default(""),
  business: z.string().max(180).optional().default(""),
  demoGoal: z.string().max(120).optional().default(""),
  email: emailish,
  kind: z.enum(["quote", "demo"]),
  message: z.string().max(4000).optional().default(""),
  name: z.string().min(2).max(140),
  phone: z.string().max(60).optional().default(""),
  services: z.array(z.string().max(80)).max(12).optional().default([]),
  sourcePath: z.string().max(220).optional().default(""),
  timeline: z.string().max(80).optional().default(""),
  trap: z.string().max(220).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Stores a quote or demo request in the site's own database.
 * Returns ok:false only when storage is genuinely unavailable, so the page can
 * tell the visitor to call instead of silently swallowing the lead.
 */
export const submitLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    if (data.trap.trim().length > 0) {
      // Bot filled the hidden field. Report success and store nothing.
      return { ok: true as const };
    }

    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const };
    }

    try {
      await DB.prepare(
        `INSERT INTO submissions
          (kind, name, business, email, phone, services, budget, timeline, demo_goal, message, source_path)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          data.kind,
          data.name.trim(),
          data.business.trim(),
          data.email.trim(),
          data.phone.trim(),
          data.services.join(", "),
          data.budget.trim(),
          data.timeline.trim(),
          data.demoGoal.trim(),
          data.message.trim(),
          data.sourcePath.trim()
        )
        .run();
      return { ok: true as const };
    } catch {
      return { ok: false as const };
    }
  });
