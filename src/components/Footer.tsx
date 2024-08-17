import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">MegaBlog</h2>
            <p className="mt-2">Share your voice, connect with others, and inspire the world.</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <ul className="list-none">
              <li className="mb-2">
                <a href="/about" className="hover:underline">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:underline">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.591 1.325-1.324v-21.351c0-.733-.592-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .385.043.76.127 1.122-4.087-.205-7.713-2.164-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.188 2.175 4.065-.802-.026-1.558-.246-2.217-.616v.062c0 2.366 1.684 4.342 3.918 4.788-.41.111-.843.171-1.287.171-.314 0-.615-.03-.916-.086.617 1.926 2.407 3.33 4.526 3.368-1.66 1.3-3.757 2.075-6.033 2.075-.392 0-.779-.023-1.158-.067 2.148 1.378 4.699 2.182 7.446 2.182 8.933 0 13.82-7.404 13.82-13.82 0-.21-.005-.42-.014-.63.949-.686 1.773-1.54 2.426-2.515z"/>
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.071-1.281.059-2.563.334-3.637 1.408-1.074 1.074-1.349 2.356-1.408 3.637-.059 1.28-.071 1.688-.071 4.947s.012 3.667.071 4.947c.059 1.281.334 2.563 1.408 3.637 1.074 1.074 2.356 1.349 3.637 1.408 1.28.059 1.688.071 4.947.071s3.667-.012 4.947-.071c1.281-.059 2.563-.334 3.637-1.408 1.074-1.074 1.349-2.356 1.408-3.637.059-1.28.071-1.688.071-4.947s-.012-3.667-.071-4.947c-.059-1.281-.334-2.563-1.408-3.637-1.074-1.074-2.356-1.349-3.637-1.408-1.28-.059-1.688-.071-4.947-.071z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.293 0-4.162-1.869-4.162-4.162s1.869-4.162 4.162-4.162 4.162 1.869 4.162 4.162-1.869 4.162-4.162 4.162z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; 2024 MegaBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
