import App from "@/components/App";

// Disable static prerendering since this page requires client-side Firebase
export const dynamic = "force-dynamic";

export default function Home() {
  return <App />;
}
