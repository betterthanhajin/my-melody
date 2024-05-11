import Image from "next/image";
import Test from "@/components/Test";
import dynamic from "next/dynamic";

const DynamicTest = dynamic(() => import("@/components/Test"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DynamicTest />
    </main>
  );
}
