import Image from "next/image";

const LOGOS = [
  {
    label: "Standard",
    svg: "/logos/logo.svg",
    png: "/logos/logo.png",
    bg: "bg-dark",
  },
  {
    label: "Large (scalable)",
    svg: "/logos/logo-large.svg",
    png: "/logos/logo-large.png",
    bg: "bg-dark",
  },
  {
    label: "Green",
    svg: "/logos/logo-green.svg",
    png: "/logos/logo-green.png",
    bg: "bg-dark",
  },
  {
    label: "Black",
    svg: "/logos/logo-black.svg",
    png: "/logos/logo-black.png",
    bg: "bg-fog",
  },
  {
    label: "White",
    svg: "/logos/logo-white.svg",
    png: "/logos/logo-white.png",
    bg: "bg-dark",
  },
];

export default function LogosPage() {
  return (
    <main className="min-h-screen bg-fog px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-ink mb-2">Logo Downloads</h1>
        <p className="text-slate mb-12">
          Download any variant as SVG (scalable vector) or PNG (high-res, 4× the
          source).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {LOGOS.map(({ label, svg, png, bg }) => (
            <div
              key={svg}
              className="rounded-2xl overflow-hidden border border-lavender bg-white shadow-sm"
            >
              <div
                className={`${bg} flex items-center justify-center p-10`}
                style={{ minHeight: 200 }}
              >
                <Image
                  src={svg}
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
                    href={svg}
                    download
                    className="flex-1 text-center text-sm font-medium rounded-lg border border-violet text-violet py-2 px-4 hover:bg-violet hover:text-white transition-colors"
                  >
                    Download SVG
                  </a>
                  <a
                    href={png}
                    download
                    className="flex-1 text-center text-sm font-medium rounded-lg bg-violet text-white py-2 px-4 hover:opacity-90 transition-opacity"
                  >
                    Download PNG
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
