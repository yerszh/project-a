"use client"

import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";

export const SingInPage: React.FC = () => {
  return <div className="signin-page">
  <div className="signin-card">
   
    <div className="form-container">
      <form className="email-signin-form" >
        <input
          className="form-input"
          type="email"
          maxLength={320}
          placeholder="Email Address"
        
          required
        />
        <button className="submit-button" type="submit">
          Sign in with email
        </button>
      </form>

      <div className="divider">
        <div className="line"></div>
        <span className="or">or</span>
        <div className="line"></div>
      </div>

      <div className="social-logins">
        <button className="google" onClick={()=> {handleGoogleSignIn()}} >
          
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</div>;
};
