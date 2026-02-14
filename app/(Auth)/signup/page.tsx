import GuestGuard from "@/components/guards/GuestGuard";
import Signup from "@/views/auth/signup";

export default function Page() {
  return (
    <GuestGuard>
      <Signup />
    </GuestGuard>
  );
}
