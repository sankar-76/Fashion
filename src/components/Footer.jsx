import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-bone py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="font-display text-4xl font-bold tracking-widest mb-4">VEILHAUS</h2>
            <p className="font-body text-sand text-sm leading-relaxed max-w-xs">
              Where fabric meets philosophy. Crafting garments for those who live with intention — a quiet luxury for the modern wardrobe.
            </p>
            <div className="flex gap-4 mt-6">
              {['IG', 'TW', 'FB', 'PIN'].map(s => (
                <a key={s} href="#" className="font-mono text-xs text-sand hover:text-rust transition-colors duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-sand mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/collection', 'Collection'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-bone/70 hover:text-rust transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-sand mb-5">Info</h4>
            <ul className="space-y-3">
              {['Sizing Guide', 'Shipping', 'Returns', 'Care Guide', 'Sustainability'].map(item => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-bone/70 hover:text-rust transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-sand/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-sand/50 tracking-wider">
            © {year} VEILHAUS. All rights reserved.
          </p>
          <p className="font-mono text-xs text-sand/50 tracking-wider">
            Crafted with intention. Made for permanence.
          </p>
        </div>
      </div>
    </footer>
  )
}
