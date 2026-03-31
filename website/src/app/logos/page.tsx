"use client";

import Image from "next/image";

const LOGOS = [
  {
    label: "Standard",
    src: "/logos/logo.svg",
    pngFilename: "blent-logo.png",
    bg: "bg-dark",
  },
  {
    label: "Large (scalable)",
    src: "/logos/logo-large.svg",
    pngFilename: "blent-logo-large.png",
    bg: "bg-dark",
  },
  {
    label: "Green",
    src: "/logos/logo-green.svg",
    pngFilename: "blent-logo-green.png",
    bg: "bg-dark",
  },
  {
    label: "Black",
    src: "/logos/logo-black.svg",
    pngFilename: "blent-logo-black.png",
    bg: "bg-fog",
  },
  {
    label: "White",
    src: "/logos/logo-white.svg",
    pngFilename: "blent-logo-white.png",
    bg: "bg-dark",
  },
];

async function downloadAsPng(svgUrl: string, filename: string, scale = 4) {
  const res = await fetch(svgUrl);
  const svgText = await res.text();

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
  const svgEl = svgDoc.documentElement;

  const w = parseFloat(svgEl.getAttribute("width") ?? "300");
  const h = parseFloat(svgEl.getAttribute("height") ?? "90");

  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const img = new window.Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);

    canvas.toBlob((pngBlob) => {
      if (!pngBlob) return;
      const pngUrl = URL.createObjectURL(pngBlob);
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };
  img.src = url;
}

export default function LogosPage() {
  return (
    <main className="min-h-screen bg-fog px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-ink mb-2">Logo Downloads</h1>
        <p className="text-slate mb-12">
          Download any variant as SVG (scalable) or PNG (high-res 4×).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {LOGOS.map(({ label, src, pngFilename, bg }) => (
            <div
              key={src}
              className="rounded-2xl overflow-hidden border border-lavender bg-white shadow-sm"
            >
              <div
                className={`${bg} flex items-center justify-center p-10`}
                style={{ minHeight: 200 }}
              >
                <Image
                  src={src}
                  alt={`Blent logo — ${label}`}
                  width={120}
                  height={148}
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>

              <div className="p-5">
                <p className="font-semibold text-ink mb-4">{label}</p>
                <div className="flex gap-3">
                  <a
                    href={src}
                    download
                    className="flex-1 text-center text-sm font-medium rounded-lg border border-violet text-violet py-2 px-4 hover:bg-violet hover:text-white transition-colors"
                  >
                    Download SVG
                  </a>
                  <button
                    onClick={() => downloadAsPng(src, pngFilename)}
                    className="flex-1 text-sm font-medium rounded-lg bg-violet text-white py-2 px-4 hover:opacity-90 transition-opacity"
                  >
                    Download PNG
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
