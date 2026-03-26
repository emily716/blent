import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhatBlentDoes from "@/components/WhatBlentDoes";
import Numbers from "@/components/Numbers";
import Intervention from "@/components/Intervention";
import Chemistry from "@/components/Chemistry";
import Industries from "@/components/Industries";
import Partner from "@/components/Partner";
import Founders from "@/components/Founders";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import GlobalBubbles from "@/components/GlobalBubbles";
import StencilReveal from "@/components/StencilReveal";

export default function Home() {
  return (
    <>
      {/* Viscous bubble stencil reveal — dark void that dissolves on load */}
      <StencilReveal />

      {/* Global interactive bubble field — covers entire page, reacts to cursor */}
      <GlobalBubbles count={80} />

      <Nav />
      <main>
        <Hero />
        <Problem />
        <WhatBlentDoes />
        <Numbers />
        <Intervention />
        <Chemistry />
        <Industries />
        <Partner />
        <Founders />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
