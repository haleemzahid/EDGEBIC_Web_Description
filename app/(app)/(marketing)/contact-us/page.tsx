'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

if (typeof window !== 'undefined') {
  console.log('reCAPTCHA Site Key:', RECAPTCHA_SITE_KEY);
}

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(255),
  lastName: z.string().max(255).optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(32).optional(),
  productInterest: z.string().min(1, 'Please select a product'),
  hearAboutUs: z.string().min(1, 'Please select an option'),
  message: z.string().max(5000).optional()
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const willDoItems = [
  'Be honest and respectful towards you, your team, your company, and your challenges.',
  'Adapt software to solve your most pressing issues, as quick and easy as possible.',
  'Offer a no-risk trial with Implementation support included.',
  'Draft a custom help "cheat sheet" to fully document your application.',
  'Help you design a scheduling approach that improves customer service and optimizes operations.'
];

const wontDoItems = [
  'Pound you with emails and phone calls to buy our software.',
  'Share ANY of your information or data with anyone, at anytime, for any reason.',
  'Expect compensation before we prove out solution.'
];

export default function ContactUsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [willDoExpanded, setWillDoExpanded] = useState(false);
  const [wontDoExpanded, setWontDoExpanded] = useState(false);
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

        // Trigger cache revalidation so contact appears immediately in CRM
        try {
          await fetch('/api/revalidate-contacts');
        } catch (revalidateError) {
          console.log('Cache revalidation failed (non-critical):', revalidateError);
        }
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
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Section */}
              <div className="w-full lg:w-[60%]">
                {/* Description */}
                <div className="mb-3">
                  <p className="text-gray-700 leading-relaxed text-[17px] mb-2">
                    Instead of a one size fits all approach, lets discuss YOUR processes and challenges and explore situations to fit YOUR WAY. We can even use your data during a live demo meeting. Contact <span className="font-bold italic">US</span> by filling out the form below and we will be in touch to prepare custom demo.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-[17px]">Schedule a quick call to discuss your application</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-[17px]">Schedule a live, custom demo (We will be in contact to understand your application and obtain your actual data/reports).</span>
                    </div>
                  </div>

                </div>

                {/* Contact Form */}
                <div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
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
                        rows={2}
                        className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                        placeholder="What do you need help with?"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* What we WILL do / WON'T do cards */}
                    <div className="flex items-start gap-3">
                      {/* What we WILL do */}
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)] transition-all duration-300 flex-1">
                        <button
                          type="button"
                          onClick={() => setWillDoExpanded(!willDoExpanded)}
                          className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                              <Check className="size-6 text-green-600" />
                            </div>
                            <h3 className="text-md font-semibold text-gray-900">What we WILL do</h3>
                          </div>
                          {willDoExpanded ? (
                            <ChevronUp className="size-5 text-[#1e3a5f]" />
                          ) : (
                            <ChevronDown className="size-5 text-[#1e3a5f]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {willDoExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="space-y-3 px-5 pb-5 text-md text-gray-600 overflow-hidden"
                            >
                              {willDoItems.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className="flex gap-3"
                                >
                                  <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* What we WON'T do */}
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)] transition-all duration-300 flex-1">
                        <button
                          type="button"
                          onClick={() => setWontDoExpanded(!wontDoExpanded)}
                          className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                              <X className="size-6 text-red-600" />
                            </div>
                            <h3 className="text-md font-semibold text-gray-900">What we WON&apos;T do</h3>
                          </div>
                          {wontDoExpanded ? (
                            <ChevronUp className="size-5 text-[#1e3a5f]" />
                          ) : (
                            <ChevronDown className="size-5 text-[#1e3a5f]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {wontDoExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="space-y-3 px-5 pb-5 text-md text-gray-600 overflow-hidden"
                            >
                              {wontDoItems.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className="flex gap-3"
                                >
                                  <X className="mt-0.5 size-4 shrink-0 text-red-500" />
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
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
                      className="rounded-md mt-2 bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="hidden h-[550px] lg:flex lg:w-[40%] flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Edgebic/contact-sidebar.png"
                  alt="Diverse professionals representing our client base"
                  className="w-full  h-[100%] object-contain"
                />

                {/* Perfect Complement Text */}
                <div className="p-3 rounded-lg text-center mt-4 text-sm">
                  <p className="font-medium">
                    The perfect complement for companies of any size... from <span className="text-blue-600">Job Shops</span> to <span className="text-blue-600">Small-Medium Manufacturers</span> to <span className="text-blue-600">Global Multi-Nationals</span>
                  </p>
                </div>
              </div>
            </div>
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
                  window.open('https://calendly.com/jc-123/new-meeting', '_blank');
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
