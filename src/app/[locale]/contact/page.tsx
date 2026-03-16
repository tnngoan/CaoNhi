"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  capital: string;
  goals: string;
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="navy-gradient pt-32 pb-20">
        <div className="container-main text-center">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full gold-gradient" />
          <p className="mt-6 text-lg text-navy-300">{t("subtitle")}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-navy-900">
                  {t("formTitle")}
                </h2>

                {status === "success" ? (
                  <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-bold text-emerald-800">
                      {t("successTitle")}
                    </h3>
                    <p className="mt-2 text-sm text-emerald-600">{t("successDesc")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {/* Name */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">
                        {t("nameLabel")} *
                      </label>
                      <input
                        {...register("name", { required: t("required") })}
                        placeholder={t("namePlaceholder")}
                        className="w-full rounded-lg border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">
                        {t("emailLabel")} *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: t("required"),
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("invalidEmail") },
                        })}
                        placeholder={t("emailPlaceholder")}
                        className="w-full rounded-lg border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">
                        {t("phoneLabel")}
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder={t("phonePlaceholder")}
                        className="w-full rounded-lg border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                      />
                    </div>

                    {/* Capital */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">
                        {t("capitalLabel")}
                      </label>
                      <select
                        {...register("capital")}
                        className="w-full rounded-lg border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                        defaultValue=""
                      >
                        <option value="" disabled>{t("capitalPlaceholder")}</option>
                        <option value="under500m">{t("capitalOption1")}</option>
                        <option value="500m-2b">{t("capitalOption2")}</option>
                        <option value="2b-10b">{t("capitalOption3")}</option>
                        <option value="over10b">{t("capitalOption4")}</option>
                      </select>
                    </div>

                    {/* Goals */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-navy-700">
                        {t("goalsLabel")} *
                      </label>
                      <textarea
                        {...register("goals", { required: t("required") })}
                        placeholder={t("goalsPlaceholder")}
                        rows={5}
                        className="w-full rounded-lg border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                      />
                      {errors.goals && (
                        <p className="mt-1 text-xs text-red-500">{errors.goals.message}</p>
                      )}
                    </div>

                    {status === "error" && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="text-sm font-medium text-red-700">{t("errorTitle")}</p>
                        <p className="mt-1 text-xs text-red-600">{t("errorDesc")}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full rounded-lg gold-gradient py-4 text-lg font-semibold text-navy-900 transition-transform hover:scale-[1.02] disabled:opacity-70"
                    >
                      {status === "sending" ? t("sending") : t("submit")}
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <div className="sticky top-28 space-y-6">
                  {/* Info card */}
                  <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-navy-900">
                      {t("infoTitle")}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span className="text-sm text-navy-600">{t("email")}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <span className="text-sm text-navy-600">{t("phone")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-navy-900">
                      {t("officeTitle")}
                    </h3>
                    <p className="mt-3 whitespace-pre-line text-sm text-navy-600">
                      {t("officeAddress")}
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-navy-900">
                      {t("hoursTitle")}
                    </h3>
                    <div className="mt-3 space-y-1 text-sm text-navy-600">
                      <p>{t("hoursWeekday")}</p>
                      <p>{t("hoursSaturday")}</p>
                      <p>{t("hoursSunday")}</p>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-navy-900">
                      {t("socialTitle")}
                    </h3>
                    <div className="mt-3 flex gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-600 transition-colors hover:bg-gold-100 hover:text-gold-600">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-600 transition-colors hover:bg-gold-100 hover:text-gold-600">
                        <span className="text-xs font-bold">Zalo</span>
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
