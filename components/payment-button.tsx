'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreditCard, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateTaskPayment } from '@/lib/features/tasks/tasksSlice';

// Paystack payment URL
const PAYSTACK_URL = 'https://paystack.com/pay/caacs4zxpw';

interface PaymentButtonProps {
  taskId: string;
  showComplete?: boolean;
}

export default function PaymentButton({
  taskId,
  showComplete = false
}: PaymentButtonProps) {
  const dispatch = useDispatch();
  const [isComplete, setIsComplete] = useState(false);

  const handlePaymentClick = () => {
    // Open Paystack payment page in a new tab
    window.open(PAYSTACK_URL, '_blank');

    // In a real app, you would use a webhook to confirm payment
    // For this demo, we'll provide a button to manually mark as paid
    setIsComplete(true);
  };

  const handleMarkAsPaid = () => {
    dispatch(updateTaskPayment({ id: taskId, hasPayment: true }));
  };

  if (showComplete) {
    return (
      <div className="flex items-center gap-2">
        <Button className="bg-green-600 hover:bg-green-700" disabled>
          <Check className="w-4 h-4 mr-2" /> Payment Complete
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={handlePaymentClick}
      >
        <CreditCard className="w-4 h-4" />
        Pay with Paystack
        <ExternalLink className="w-3 h-3 ml-1" />
      </Button>

      {isComplete && (
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={handleMarkAsPaid}
        >
          <Check className="w-4 h-4 mr-1" /> Mark as Paid
        </Button>
      )}
    </div>
  );
}
