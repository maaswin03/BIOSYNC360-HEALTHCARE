import { SignIn } from '@clerk/clerk-react';

export default function Authentication() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn />
    </div>
  );
}

