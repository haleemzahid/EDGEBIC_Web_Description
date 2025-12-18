'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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
      hearAboutUs: 'not-specified'
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
            <div className="w-full">
              <Card>
                <CardContent>
                  <p className="text-lg text-center pt-6 leading-relaxed">
                    Please email me with options for free templates and no-risk trials and/or book a quick free call to discuss your specific challenges!
                  </p>

                  {/* Calendly Button */}
                  <div className="flex pt-3 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        window.open('https://calendly.com/mudasirnadeem7979/30min', '_blank');
                      }}
                      className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Schedule a Call
                    </button>
                  </div>

                  {/* Contact Form */}
                  <div className="p-6">
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
                        <div>
                          <select
                            hidden
                            id="productInterest"
                            {...register('productInterest')}
                            className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground focus:border-primary focus:outline-none"
                            defaultValue="production-planning"
                          >
                            <option value="production-planning">
                              Production Planning & Scheduling
                            </option>
                            <option value="inventory-management">
                              Inventory Management
                            </option>
                            <option value="shop-floor-control">
                              Shop Floor Control
                            </option>
                            <option value="other">Other</option>
                          </select>
                          {errors.productInterest && (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.productInterest.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <select
                            hidden
                            id="hearAboutUs"
                            {...register('hearAboutUs')}
                            className="w-full border-b border-input bg-transparent px-2 py-3 text-foreground focus:border-primary focus:outline-none"
                            defaultValue="not-specified"
                          >
                            <option value="not-specified">
                              Where did you hear about US?
                            </option>
                            <option value="google">Google Search</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="referral">Referral</option>
                            <option value="trade-show">Trade Show</option>
                            <option value="other">Other</option>
                          </select>
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
                          hidden
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto max-h-32 max-w-full object-contain"
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
