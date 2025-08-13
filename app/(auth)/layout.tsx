// // app/auth/layout.tsx
// import React from 'react';

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex">
//       {/* ✅ Constant Image Section */}
//       <div className="w-1/2 hidden md:flex items-center justify-center bg-amber-100">
//         <img
//           src="/images/log.jpg" // your image path
//           alt="Illustration"
//           className="w-3/4 h-auto"
//         />
//       </div>

//       {/* ✅ Form Section (children = login/signup form) */}
//       <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
//         {children}
//       </div>
//     </div>
//   );
// }


// import React from 'react';

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen">
//       {/* Left side - Image with blur overlay */}
//       <div className="relative w-1/2 hidden lg:block">
//         <img
//           src="/images/log.jpg"
//           alt="Login background"
//           className="w-full h-full object-cover"
//         />
//         {/* Overlay Blur */}
//         <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
//       </div>

//       {/* Right side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
//         {children}
//       </div>
//     </div>
//   );
// }


import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image with dark overlay */}
      <div className="relative w-1/2 hidden lg:block">
        <img
          src="/images/log1.jpg"
          alt="Login background"
          className="w-full h-full object-cover"
        />
        {/* Overlay - just color, no blur */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Right side - Form area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        {children}
      </div>
    </div>
  );
}
