'use client';

import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const purchaseSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  customerName: z.string().min(1, 'Please enter your name')
});

interface PurchaseFormProps {
  onSuccess?: (sessionId: string) => void;
  price?: string;
}

export function PurchaseForm({ onSuccess, price = '$49' }: PurchaseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    customerName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setErrorMessage('');

    try {
      // Validate form data
      const validatedData = purchaseSchema.parse(formData);

      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else if (onSuccess && data.sessionId) {
        onSuccess(data.sessionId);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => ({
            ...prev,
            [field]: ''
          }));
        }
      };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="customerName">Full Name</Label>
          <Input
            id="customerName"
            type="text"
            value={formData.customerName}
            onChange={handleInputChange('customerName')}
            placeholder="Enter your full name"
            className={errors.customerName ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder="Enter your email address"
            className={errors.email ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            We'll send your download link to this email address
          </p>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white hover:from-orange-600 hover:to-red-600"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : `Purchase Edgebi- ${price}`}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          💳 Secure payment powered by Stripe
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Your payment information is encrypted and secure
        </p>
      </div>
    </form>
  );
}
