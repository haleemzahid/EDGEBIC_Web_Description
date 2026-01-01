'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(255),
  lastName: z.string().min(1, 'Last name is required').max(255),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(32).optional(),
  productInterest: z.string().min(1, 'Please select a product'),
  hearAboutUs: z.string().min(1, 'Please select an option'),
  message: z.string().max(5000).optional()
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactUsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      productInterest: 'production-planning',
      hearAboutUs: 'where-did-you-hear'
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (!captchaValue) {
      toast.error('Please complete the reCAPTCHA verification.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, captcha: captchaValue })
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          "Thank you for contacting us! We'll get back to you within 24 hours."
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      reset();
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
      setShowScheduleModal(true);
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Contact US Heading */}
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Contact <span className="text-blue-600">US</span>
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Section */}
              <div className="w-full lg:w-[60%]">
                {/* Description Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Instead of a one size fits all approach, lets discuss YOUR processes and challenges and explore situations to fit YOUR WAY. We can even use your data during a live demo meeting. Contact <span className="font-bold italic">US</span> by filling out the form below and we will be in touch to prepare custom demo.
                  </p>

                  {/* Checkboxes */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Schedule a quick call to discuss your application.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Schedule a live, custom demo (We will be in contact to understand your application and obtain your actual data/reports).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">We&apos;ll be periodically sending you updates about our new products and features.</span>
                    </div>
                  </div>

                  {/* Fix My Schedule Button */}
                  <button
                    type="button"
                    onClick={() => {
                      window.open('https://calendly.com/mudasirnadeem7979/30min', '_blank');
                    }}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Fix My Schedule!
                  </button>
                </div>

                {/* Contact Form */}
                <div className="py-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <input
                          type="text"
                          id="firstName"
                          {...register('firstName')}
                          className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          placeholder="First Name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          id="lastName"
                          {...register('lastName')}
                          className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          placeholder="Last Name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <input
                          type="email"
                          id="email"
                          {...register('email')}
                          className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          placeholder="Email Address"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          id="phone"
                          {...register('phone')}
                          className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          placeholder="Phone Number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Product Interest & Where did you hear about us */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="relative">
                        <select
                          id="productInterest"
                          {...register('productInterest')}
                          className="w-full border-b border-input bg-transparent px-2 py-3 pr-8 text-muted-foreground focus:border-primary focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="production-planning">
                            Production Planning & Scheduling
                          </option>
                          <option value="integration">
                            Integration with other Systems
                          </option>
                          <option value="general-inquiries">
                            General Inquiries
                          </option>
                          <option value="all-above">All the Above</option>
                        </select>
                        <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {errors.productInterest && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.productInterest.message}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <select
                          id="hearAboutUs"
                          {...register('hearAboutUs')}
                          className="w-full border-b border-input bg-transparent px-2 py-3 pr-8 text-muted-foreground focus:border-primary focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="where-did-you-hear">Where did you hear about US?</option>
                          <option value="google">Google Search</option>
                          <option value="press-release">Press Release</option>
                          <option value="referral">Referral</option>
                          <option value="social-media">Social Media</option>
                          <option value="other">Others</option>
                        </select>
                        <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {errors.hearAboutUs && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors.hearAboutUs.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        id="message"
                        {...register('message')}
                        rows={4}
                        className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        placeholder="What do you need help with?"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* reCAPTCHA */}
                    <div className="pt-2">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={handleCaptchaChange}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !captchaValue}
                      className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="hidden lg:flex lg:w-[40%] flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Edgebic/contact-sidebar.png"
                  alt="Diverse professionals representing our client base"
                  className="w-full max-w-xs h-auto object-contain"
                />

                {/* Perfect Complement Text */}
                <div className="bg-red-600 text-white p-3 rounded-lg text-center mt-4 text-sm">
                  <p className="font-medium">
                    The perfect complement for companies of any size... from <span className="text-cyan-300">Job Shops</span> to <span className="text-cyan-300">Small-Medium Manufacturers</span> to <span className="text-cyan-300">Global Multi-Nationals</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-h-32 max-w-full object-contain"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Meeting Modal */}
      <Dialog open={showScheduleModal} onOpenChange={(open) => {
        // Only allow closing via the X button or buttons, not by clicking outside
        if (!open) return;
        setShowScheduleModal(open);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Thank You for Contacting Us!
            </DialogTitle>
            <DialogDescription className="text-center">
              We&apos;ve received your message and will get back to you within 24
              hours. Would you like to schedule a meeting with us now?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setShowScheduleModal(false);
                // Small delay to let modal close before opening Calendly
                setTimeout(() => {
                  window.open('https://calendly.com/mudasirnadeem7979/30min', '_blank');
                }, 100);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Yes, Schedule a Meeting
            </button>
            <button
              type="button"
              onClick={() => {
                setShowScheduleModal(false);
                router.push('/thankyou');
              }}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              No Thanks, Maybe Later
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
