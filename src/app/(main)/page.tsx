import Featured from "@/components/home-page/Featured";
import Hero from "@/components/home-page/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="h-[100px] w-full"></div>
      <Hero />
      <Featured />
    </div>
  );
}
