import Link from "next/link";

function Home() {
  return (
    <main>
      <h1>Property Pulse</h1>
      <Link href="/properties">View Properties</Link>
    </main>
  );
}

export default Home;
