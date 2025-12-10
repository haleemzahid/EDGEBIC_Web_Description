import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 py-6 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold">Checkout</h1>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Order Form */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Billing Information
              </h2>

              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Address *
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Country *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>

                <div className="border-t pt-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="credit"
                        className="mr-3"
                        defaultChecked
                      />
                      <span>Credit Card</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        className="mr-3"
                      />
                      <span>PayPal</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        className="mr-3"
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Order Summary
              </h2>

              {/* Empty Order State */}
              <div className="py-6 text-center">
                <div className="mb-4">
                  <svg
                    className="mx-auto size-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="mb-4 text-gray-600">No items in your order</p>
                <Link
                  href="/shop"
                  className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Order Total Template */}
              <div className="hidden">
                <div className="border-t pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">$0.00</span>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700">
                  Place Order
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Secure Checkout
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg
                      className="mr-2 size-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">SSL Encrypted</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="mr-2 size-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Money Back Guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Need Help?
            </h3>
            <p className="mb-4 text-gray-600">
              Contact our sales team for assistance with your order
            </p>
            <div className="space-x-4">
              <Link
                href="/contact-us"
                className="inline-block rounded-lg bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700"
              >
                Contact Us
              </Link>
              <a
                href="tel:248.486.6365"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
              >
                Call 248.486.6365
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
