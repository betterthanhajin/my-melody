import dynamic from "next/dynamic";

const P5Component = dynamic(() => import("@/components/p5-component"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>AESPA</div>
      <P5Component />
    </main>
  );
}
