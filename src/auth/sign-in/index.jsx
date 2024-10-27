// // import React from 'react'
// import { SignIn } from "@clerk/clerk-react";

// function SignInPage() {
//   return (
//     <div className="flex justify-center py-7">
//       <SignIn />
//     </div>
//   );
// }

// export default SignInPage;

import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-7">
      <SignIn afterSignInUrl="/dashboard" /> {/* Redirects to /dashboard after sign-in */}
    </div>
  );
}


export default SignInPage;
