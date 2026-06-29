import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
      <SignUp />
    </div>
  );
}
