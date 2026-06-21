import Link from "next/link";
import { Share2, Globe, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

const socialLinks = [
  { Icon: Share2, label: "Facebook" },
  { Icon: Globe, label: "Twitter" },
  { Icon: MessageCircle, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-[#dadde1]">
      {/* CTA band */}
      <div className="bg-[#1877f2] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center lg:flex-row lg:text-left lg:px-6">
          <div>
            <h3 className="text-2xl font-bold text-white">List your store for free — forever</h3>
            <p className="mt-2 text-blue-100">Join 100+ vendors reaching thousands of buyers across Bangladesh.</p>
          </div>
          <Link href="/vendor-signup">
            <Button size="lg" className="bg-white text-[#1877f2] hover:bg-blue-50 shadow-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full fb-primary text-lg font-bold">M</div>
            <span className="text-xl font-bold text-[#1877f2]">Market</span>
          </div>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#65676b]">
            Bangladesh&apos;s product knowledge and inventory discovery platform. Complete specs, reviews, comparisons, and real vendor availability.
          </p>
          <div className="mt-4 flex gap-3">
            {socialLinks.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f2f5] text-[#1877f2] hover:bg-[#e7f3ff]">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[#050505]">Discover</h4>
          <ul className="mt-3 space-y-2.5 text-[15px] text-[#65676b]">
            {[
              ["Electronics", "/categories/electronics"],
              ["Vehicles", "/categories/vehicles"],
              ["Home Appliances", "/categories/home-appliances"],
              ["Sports & Outdoors", "/categories/sports"],
              ["All Brands", "/brands"],
            ].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:underline fb-text">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#050505]">Resources</h4>
          <ul className="mt-3 space-y-2.5 text-[15px] text-[#65676b]">
            {[
              ["Buying Guides", "/guides"],
              ["Compare Products", "/compare"],
              ["Find Vendors", "/vendors"],
              ["Search Products", "/search"],
            ].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:underline fb-text">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#050505]">Contact</h4>
          <ul className="mt-3 space-y-3 text-[15px] text-[#65676b]">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-[#1877f2]" /> Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-[#1877f2]" /> +880 1XXX-XXXXXX</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-[#1877f2]" /> hello@market.bd</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#dadde1] py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-[13px] text-[#65676b] sm:flex-row lg:px-6">
          <span>© 2026 Market. Product listings free forever.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
