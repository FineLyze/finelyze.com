import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#080d18] flex items-center justify-center">
      <SignIn />
    </div>
  );
}
