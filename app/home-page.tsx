// app/home-page.tsx (Server Component)
import Home from "@/components/home-page";
import redis from "@/lib/redis";
import { Guide } from "@/types";

async function getGuides(): Promise<Guide[]> {
  return (await redis.get<Guide[]>("guides")) || [];
}

export default async function HomePage() {
  const guides = await getGuides();

  return <Home guides={guides} />;
}
