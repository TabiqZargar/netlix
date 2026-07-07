import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Audio Description", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Gift Cards", href: "#" },
  { label: "Media Center", href: "#" },
  { label: "Investor Relations", href: "#" },
  { label: "Jobs", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Legal Notices", href: "#" },
  { label: "Cookie Preferences", href: "#" },
  { label: "Corporate Information", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-netflix-darker py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <svg viewBox="0 0 111 30" className="w-20 fill-netflix-gray">
            <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.063-13.688L94.999 0H99.28l3.062 7.874L105.656 0H111l-5.938 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zM69.258 2.813h6.75V27.094c1.563.062 3.188.125 4.844.25V2.813h-11.594zM58.063 5.406v21.688c1.625.062 3.25.156 4.875.218v-27.12l-4.875.219zM46.78 8.094v20.937c1.656.031 3.312.125 4.969.219V8.094h-4.969zM35.812 11.156v17.907c1.656.062 3.312.125 4.969.219V11.156h-4.969zM24.75 14.28V27.5c1.563.062 3.156.125 4.75.218V14.28H24.75zM14.156 17.22v14.562c1.563.063 3.156.125 4.75.219V17.22h-4.75zM0 20.25v7.25c.563.062 1.125.125 1.75.156V20.25H0z" />
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-netflix-gray hover:text-netflix-light transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <select className="bg-transparent border border-netflix-gray/50 text-netflix-gray text-xs px-3 py-1.5 rounded-sm focus:outline-none focus:border-white/50">
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <p className="text-xs text-netflix-gray/60">
          &copy; {new Date().getFullYear()} Netflix Clone. Built for educational
          purposes only. This is not affiliated with Netflix, Inc.
        </p>
      </div>
    </footer>
  );
}
