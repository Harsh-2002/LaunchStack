import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-xl">LaunchStack</span>
          </div>
          <p className="text-sm text-gray-400">
            Professional n8n hosting starting at just $2/month. Focus on building your workflows while we handle the infrastructure.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/features" className="text-sm text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/status" className="text-sm text-gray-400 hover:text-white transition-colors">
                System Status
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800">
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} LaunchStack. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 text-center mt-2">
          n8n and the n8n logo are trademarks of n8n.io GmbH. LaunchStack is not affiliated with, endorsed by, or sponsored by n8n.io GmbH.
        </p>
      </div>
    </footer>
  );
}