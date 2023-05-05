import Image from "next/image";

import Form from "@/components/Form";
import Intro from "@/components/Intro";
import Footer from "@/components/Footer";
import { Suspense } from "react";

// Prisma does not support Edge without the Data Proxy currently
export const runtime = "nodejs"; // default
export const preferredRegion = "home";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  return (
    <>
      <main>
        <aside>
          <div className="logo">
            <Image width={30} height={30} src="logo.svg" alt="haiku logo" />
            <span>俳句</span>
          </div>
        </aside>
        <section>
          <Intro />
          <Form />
        </section>
      </main>
      <Footer />
    </>
  );
}
