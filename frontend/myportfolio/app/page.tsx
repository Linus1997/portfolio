import Image from "next/image";
import Profile from "./profile/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Profile />
    </main>
  );
}
