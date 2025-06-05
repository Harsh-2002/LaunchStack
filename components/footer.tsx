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
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} LaunchStack. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Powered by</span>
            <div className="flex items-center">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 52 52" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path 
                  d="M25.664 0.293C28.25 0.293 29.855 1.855 30.086 4.555L30.105 4.832V8.883L42.254 8.883C45.898 8.883 47.891 10.84 47.891 14.438L47.891 18.438L32.973 18.438C30.273 18.438 28.656 20.043 28.656 22.703L28.656 29.281C28.656 31.941 30.27 33.555 32.969 33.555L47.887 33.555L47.887 37.555C47.887 41.156 45.93 43.145 42.328 43.145L30.105 43.145V47.117C30.105 49.973 28.488 51.598 25.742 51.598L21.742 51.598L21.742 28.402L4.023 28.402C2.754 28.441 1.516 27.887 0.637 26.891C-0.242 25.895 -0.667 24.551 -0.51 23.215L-0.492 22.934C-0.336 21.652 0.367 20.492 1.457 19.695C2.547 18.898 3.938 18.535 5.281 18.695L5.562 18.715L21.742 18.715L21.742 4.832C21.742 2.086 23.352 0.465 26.12 0.305L26.387 0.293L25.664 0.293ZM45.641 21.137V30.855H33.973C32.703 30.855 32.078 30.238 32.078 28.988V23.008C32.078 21.758 32.703 21.137 33.973 21.137H45.641ZM15.516 21.137V25.703H5.465C4.723 25.703 4.371 25.316 4.371 24.445C4.371 23.574 4.723 23.191 5.465 23.188L5.602 23.191L15.516 21.137ZM44.117 11.582L30.098 11.582V15.734H44.117V11.582ZM27.402 3.348L24.836 3.348C24.094 3.348 23.734 3.73 23.734 4.488V47.945C23.734 48.703 24.094 49.09 24.836 49.09H27.402C28.145 49.09 28.508 48.703 28.508 47.945V4.488C28.508 3.73 28.145 3.348 27.402 3.348Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm text-gray-400 ml-1">n8n</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          n8n and the n8n logo are trademarks of n8n.io GmbH. LaunchStack is not affiliated with, endorsed by, or sponsored by n8n.io GmbH.
        </p>
      </div>
    </footer>
  );
}