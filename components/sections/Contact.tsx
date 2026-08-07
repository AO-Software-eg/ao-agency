"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import BackGround from "../ui/GradientBg/FlowMap/BackGround";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeUpBlur, staggerContainer } from "../ui/motion/variants";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ao.agency",
    href: "mailto:hello@ao.agency",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+20 100 000 0000",
    href: "tel:+201000000000",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cairo, Egypt",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Fri, 9AM - 6PM",
    href: "#",
  },
];



function ContactInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  textarea = false,
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  const base =
    "peer w-full bg-transparent px-4 pt-5 pb-2 text-foreground placeholder-transparent rounded-xl border transition-all duration-300 outline-none disabled:opacity-50";

  const states = cn(
    "border-border bg-white/40 dark:bg-black/20",
    "hover:border-primary/60",
    focused
      ? "border-primary ring-4 ring-primary/15 bg-white/70 dark:bg-black/40"
      : "",
    textarea ? "resize-none min-h-[140px]" : ""
  );

  return (
    <div className="relative w-full group">
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder ?? label}
          required={required}
          className={cn(base, states)}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder ?? label}
          required={required}
          className={cn(base, states)}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 transition-all duration-200 pointer-events-none select-none",
          focused || filled
            ? "top-1 text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider"
            : "top-1/2 -translate-y-1/2 text-sm text-foreground-muted group-hover:text-foreground-secondary"
        )}
        style={
          textarea
            ? {
                top: focused || filled ? "6px" : undefined,
                transform: focused || filled ? "none" : "translateY(0)",
              }
            : undefined
        }
      >
        {label}
        {required && (
          <span className="text-primary ml-0.5">*</span>
        )}
      </label>
    </div>
  );
}

function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: (typeof contactInfo)[number]["icon"];
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl p-3 -mx-3 transition-all duration-300 hover:bg-primary/8 dark:hover:bg-primary/10 hover:-translate-y-0.5"
    >
      <div className="relative flex size-11 items-center justify-center shrink-0 rounded-xl border border-border bg-white/50 dark:bg-black/30 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/10">
        <Icon className="size-5 text-foreground-secondary transition-colors duration-300 group-hover:text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
          {label}
        </div>
        <div className="truncate font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
          {value}
        </div>
      </div>
      <svg
        className="size-4 text-foreground-muted opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}



export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 2800);
    }, 1200);
  };

  return (
    <section className="relative w-[90%] sm:w-[85%] lg:w-[95%] mx-auto my-10 rounded-xl flex flex-col overflow-hidden bg-background light:bg-white">
      <BackGround />

      <motion.div
        className="relative z-3 w-full py-16 md:py-24 px-4 sm:px-6 lg:px-10 xl:px-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUpBlur} className="text-center mb-10 md:mb-16">

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground">
              Ready to start your{" "}
              <span className="text-primary">project?</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-foreground-secondary text-base sm:text-lg md:text-xl font-thin text-balance">
              Let&apos;s build something extraordinary together. Tell us about your vision
              and we&apos;ll get back within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
            <motion.div
              variants={fadeUpBlur}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <GlassCard className="p-6 sm:p-8 flex flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Let&apos;s talk
                  </h3>
                  <p className="text-foreground-muted text-sm">
                    Prefer direct contact? Reach us through any of these channels.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  {contactInfo.map((item) => (
                    <ContactInfoItem key={item.label} {...item} />
                  ))}
                </div>

         
              </GlassCard>
            </motion.div>

            <motion.div variants={fadeUpBlur} className="lg:col-span-3">
              <GlassCard className="p-6 sm:p-8 lg:p-10 h-full">
                {submitted ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center gap-6 py-10">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                      <div className="relative flex size-20 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40">
                        <CheckCircle2 className="size-10 text-primary" strokeWidth={1.8} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-semibold text-foreground">
                        Message sent!
                      </h3>
                      <p className="text-foreground-muted max-w-sm mx-auto">
                        Thanks for reaching out. We&apos;ve received your message
                        and will get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 h-full"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-1.5">
                        Send a message
                      </h3>
                      <p className="text-foreground-muted text-sm">
                        Fill out the form and our team will be in touch shortly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <ContactInput
                        id="name"
                        label="Your Name"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="John Doe"
                        required
                      />
                      <ContactInput
                        id="email"
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    <ContactInput
                      id="subject"
                      label="Subject"
                      value={form.subject}
                      onChange={update("subject")}
                      placeholder="Project inquiry, Collaboration..."
                    />

                    <ContactInput
                      id="message"
                      label="Message"
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us about your project, goals, timeline..."
                      textarea
                      required
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-foreground-muted flex items-center gap-1.5">
                        <svg
                          className="size-3.5 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Your information is secure and never shared.
                      </p>

                      <button
                        type="submit"
                        disabled={submitting}
                        className={cn(
                          "group relative inline-flex items-center justify-center gap-2.5 rounded-xl px-6 sm:px-8 py-3.5 sm:py-4",
                          "bg-foreground text-background font-medium text-base sm:text-lg",
                          "transition-all duration-300 ease-out",
                          "hover:scale-[0.98] hover:shadow-2xl hover:shadow-primary/20",
                          "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
                          "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-translate-x-full hover:before:translate-x-full before:animate-none"
                        )}
                      >
                        {submitting ? (
                          <>
                            <svg
                              className="size-5 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send
                              className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              strokeWidth={2}
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
