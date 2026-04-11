const img = (name: string) => `/docs/${name}`;

const DocsQuickStart = () => {
  return (
    <article className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Quick Start Guide</h1>
      <p className="text-gray-600 leading-relaxed">
        Welcome to Qocent. This guide walks you through creating your account and accessing the
        platform for the first time.
      </p>

      <ol className="relative space-y-0">
        <li className="flex gap-5">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">1</div>
            <div className="w-px flex-1 bg-gray-200 my-1" />
          </div>
          <div className="pb-8">
            <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Navigate to Sign-Up</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              From the Qocent website, click the Login button on the homepage. On the login page,
              click Sign Up to access the registration form. A Continue with Google option is also
              available.
            </p>
            <div className="flex flex-col gap-3 mt-3">
              <img src={img("quickstart-step1-login-button.png")} alt="Login button on the Qocent homepage" className="rounded-lg border border-gray-200 w-full max-w-xl" />
              <img src={img("quickstart-step1-signup-form.png")} alt="Sign Up link on the login page" className="rounded-lg border border-gray-200 w-full max-w-xl" />
            </div>
          </div>
        </li>

        <li className="flex gap-5">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">2</div>
            <div className="w-px flex-1 bg-gray-200 my-1" />
          </div>
          <div className="pb-8">
            <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Provide Registration Details</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Fill in your personal registration details in the form provided. Once all required
              fields are complete, click the Continue button to proceed.
            </p>
            <img src={img("quickstart-step2-registration-form.png")} alt="Registration form with personal details" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
          </div>
        </li>

        <li className="flex gap-5">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">3</div>
            <div className="w-px flex-1 bg-gray-200 my-1" />
          </div>
          <div className="pb-8">
            <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Review Your Information</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Double-check that all your details are correct, then click the Create Account button
              to continue.
            </p>
            <img src={img("quickstart-step3-review-account.png")} alt="Review and submit registration details" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
          </div>
        </li>

        <li className="flex gap-5">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">4</div>
            <div className="w-px flex-1 bg-gray-200 my-1" />
          </div>
          <div className="pb-8">
            <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Verify Your Email Address</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              You will be directed to the OTP verification screen. Check your email for the
              verification code, enter it in the field provided, and click Verify OTP to complete
              verification.
            </p>
            <img src={img("quickstart-step4-otp-verification.png")} alt="OTP verification screen" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
          </div>
        </li>

        <li className="flex gap-5">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">5</div>
          </div>
          <div className="pb-0">
            <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Sign In to Qocent</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Once your email is verified, you will be redirected to the login page. Enter your
              email address and password to access your Qocent dashboard. You will now have full
              access to all platform features.
            </p>
            <div className="flex flex-col gap-3 mt-3">
              <img src={img("quickstart-step5-login-screen.png")} alt="Sign in screen after email verification" className="rounded-lg border border-gray-200 w-full max-w-xl" />
              <img src={img("quickstart-step5-dashboard.png")} alt="Qocent dashboard after signing in" className="rounded-lg border border-gray-200 w-full max-w-xl" />
            </div>
          </div>
        </li>
      </ol>
    </article>
  );
};

export default DocsQuickStart;
