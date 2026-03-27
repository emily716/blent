import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhatBlentDoes from "@/components/WhatBlentDoes";
import Intervention from "@/components/Intervention";
import Numbers from "@/components/Numbers";
import Chemistry from "@/components/Chemistry";
import Industries from "@/components/Industries";
import Partner from "@/components/Partner";
import Founders from "@/components/Founders";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import GlobalBubbles from "@/components/GlobalBubbles";
import StencilReveal from "@/components/StencilReveal";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <StencilReveal />
      <GlobalBubbles count={70} />

      <Nav />
      <main>
        <Hero />
        <Problem />
        <WhatBlentDoes />
        <Intervention />
        <Numbers />
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
