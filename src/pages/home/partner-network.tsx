import { Badge } from "@/components/ui/badge";
import { Globe, Handshake, Headset } from "lucide-react";

export function PartnerNetwork() {
  return (
    <div className="lg:py-20 flex flex-col items-center w-full mx-auto px-8 py-10">
      <Badge
        className="mb-4 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium text-red-600"
        variant="secondary"
      >
        Our Partners
      </Badge>

      <div className="max-w-4xl text-center">
        <p className="text-black text-center md:text-3xl text-xl lg:text-5xl leading-[56px] font-bold">
          Partner Network & Support
        </p>
        <p className="mt-4 md:text-base text-sm lg:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          From ambitious startups to global enterprises, Qocent empowers you
          with the performance, scalability, and freedom to innovate seamlessly
          across any cloud environment.
        </p>
      </div>

      <div className="max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-10 mt-10">
        {[
          {
            icon: <Globe size={64} />,
            title: "Global",
            text: `Partner with Qocent’s worldwide network and gain access to 
            cutting-edge cloud solutions across regions. Wherever your business 
            operates, our global infrastructure ensures consistency, scalability, 
            and reliability.`,
          },
          {
            icon: <Handshake size={64} />,
            title: "Reseller",
            text: `Join our trusted partner ecosystem and expand your service 
            portfolio. As a Qocent reseller, you’ll deliver enterprise-grade 
            cloud and cybersecurity solutions with full technical backing and 
            marketing support.`,
          },
          {
            icon: <Headset size={64} />,
            title: "24/7 Support",
            text: `Our expert support team is available around the clock to keep 
            your operations running smoothly. From deployment to troubleshooting, 
            Qocent ensures seamless assistance anytime, anywhere.`,
          },
        ].map(({ icon, title, text }, i) => (
          <div
            key={i}
            className="text-center border border-gray-200 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 w-[300px] p-8 flex flex-col justify-center items-center gap-3"
          >
            <div className="text-red-600">{icon}</div>
            <p className="font-bold uppercase text-gray-900">
              {title}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
