'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  FormProvider as Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Routes } from '@/constants/routes';

const downloadFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.'
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  companyName: z.string().min(2, {
    message: 'Company name must be at least 2 characters.'
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.'
  }),
  options: z.string().min(1, {
    message: 'Please select an option.'
  })
});

type DownloadFormValues = z.infer<typeof downloadFormSchema>;

export function JSLDownloadForm(): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      phone: '',
      options: ''
    }
  });

  async function onSubmit(data: DownloadFormValues) {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your API
      console.log('Form data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        'Form submitted successfully! Redirecting to downloads page...'
      );

      // Navigate to downloads page
      router.push(Routes.ProductDownloads);

      form.reset();
    } catch {
      toast.error('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Download EDGEBIC</CardTitle>
        <CardDescription>
          Please fill out the form below to access your 60-day fully functional
          trial.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Options</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="trial">60-Day Free Trial</SelectItem>
                      <SelectItem value="purchase">
                        Interested in Purchase
                      </SelectItem>
                      <SelectItem value="demo">Request Demo</SelectItem>
                      <SelectItem value="information">
                        More Information
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? 'Processing...' : 'Download Now'}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="font-semibold text-blue-900">
              System Requirements
            </h4>
            <p className="text-sm text-blue-800">
              Excel installed (used as report writer). .NET Framework support
              included with Windows 10+.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
