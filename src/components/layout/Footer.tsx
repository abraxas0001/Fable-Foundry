import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-sienna text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-amber rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-playfair font-bold">FableFoundry</span>
            </div>
            <p className="text-white/80 max-w-md">
              Where stories are forged with warmth and every narrator invites you on a personal journey 
              through the art of storytelling.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/library" className="text-white/80 hover:text-white transition-colors">
                  Story Library
                </Link>
              </li>
              <li>
                <Link href="/narrators" className="text-white/80 hover:text-white transition-colors">
                  Narrators
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-white/80 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white/80 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © 2024 FableFoundry. Crafted with care for storytellers and dreamers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;