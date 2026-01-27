"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Mail, ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  // Countries list (excluding Serbia and Russia)
  const countries = [
    { code: "AL", name: "Albania", phonePlaceholder: "+355" },
    { code: "AD", name: "Andorra", phonePlaceholder: "+376" },
    { code: "AT", name: "Austria", phonePlaceholder: "+43" },
    { code: "BY", name: "Belarus", phonePlaceholder: "+375" },
    { code: "BE", name: "Belgium", phonePlaceholder: "+32" },
    { code: "BA", name: "Bosnia and Herzegovina", phonePlaceholder: "+387" },
    { code: "BG", name: "Bulgaria", phonePlaceholder: "+359" },
    { code: "HR", name: "Croatia", phonePlaceholder: "+385" },
    { code: "CY", name: "Cyprus", phonePlaceholder: "+357" },
    { code: "CZ", name: "Czech Republic", phonePlaceholder: "+420" },
    { code: "DK", name: "Denmark", phonePlaceholder: "+45" },
    { code: "EE", name: "Estonia", phonePlaceholder: "+372" },
    { code: "FI", name: "Finland", phonePlaceholder: "+358" },
    { code: "FR", name: "France", phonePlaceholder: "+33" },
    { code: "DE", name: "Germany", phonePlaceholder: "+49" },
    { code: "GR", name: "Greece", phonePlaceholder: "+30" },
    { code: "HU", name: "Hungary", phonePlaceholder: "+36" },
    { code: "IS", name: "Iceland", phonePlaceholder: "+354" },
    { code: "IE", name: "Ireland", phonePlaceholder: "+353" },
    { code: "IT", name: "Italy", phonePlaceholder: "+39" },
    { code: "XK", name: "Kosovo", phonePlaceholder: "+383" },
    { code: "LV", name: "Latvia", phonePlaceholder: "+371" },
    { code: "LI", name: "Liechtenstein", phonePlaceholder: "+423" },
    { code: "LT", name: "Lithuania", phonePlaceholder: "+370" },
    { code: "LU", name: "Luxembourg", phonePlaceholder: "+352" },
    { code: "MT", name: "Malta", phonePlaceholder: "+356" },
    { code: "MD", name: "Moldova", phonePlaceholder: "+373" },
    { code: "MC", name: "Monaco", phonePlaceholder: "+377" },
    { code: "ME", name: "Montenegro", phonePlaceholder: "+382" },
    { code: "NL", name: "Netherlands", phonePlaceholder: "+31" },
    { code: "MK", name: "North Macedonia", phonePlaceholder: "+389" },
    { code: "NO", name: "Norway", phonePlaceholder: "+47" },
    { code: "PL", name: "Poland", phonePlaceholder: "+48" },
    { code: "PT", name: "Portugal", phonePlaceholder: "+351" },
    { code: "RO", name: "Romania", phonePlaceholder: "+40" },
    { code: "SM", name: "San Marino", phonePlaceholder: "+378" },
    { code: "SK", name: "Slovakia", phonePlaceholder: "+421" },
    { code: "SI", name: "Slovenia", phonePlaceholder: "+386" },
    { code: "ES", name: "Spain", phonePlaceholder: "+34" },
    { code: "SE", name: "Sweden", phonePlaceholder: "+46" },
    { code: "CH", name: "Switzerland", phonePlaceholder: "+41" },
    { code: "TR", name: "Turkey", phonePlaceholder: "+90" },
    { code: "UA", name: "Ukraine", phonePlaceholder: "+380" },
    { code: "GB", name: "United Kingdom", phonePlaceholder: "+44" },
    { code: "VA", name: "Vatican City", phonePlaceholder: "+39" },
    // Non-European countries
    { code: "US", name: "United States", phonePlaceholder: "+1" },
    { code: "CA", name: "Canada", phonePlaceholder: "+1" },
    { code: "AU", name: "Australia", phonePlaceholder: "+61" },
    { code: "NZ", name: "New Zealand", phonePlaceholder: "+64" },
    { code: "JP", name: "Japan", phonePlaceholder: "+81" },
    { code: "KR", name: "South Korea", phonePlaceholder: "+82" },
    { code: "CN", name: "China", phonePlaceholder: "+86" },
    { code: "IN", name: "India", phonePlaceholder: "+91" },
    { code: "BR", name: "Brazil", phonePlaceholder: "+55" },
    { code: "MX", name: "Mexico", phonePlaceholder: "+52" },
    { code: "AR", name: "Argentina", phonePlaceholder: "+54" },
    { code: "ZA", name: "South Africa", phonePlaceholder: "+27" },
    { code: "AE", name: "United Arab Emirates", phonePlaceholder: "+971" },
    { code: "SA", name: "Saudi Arabia", phonePlaceholder: "+966" },
    { code: "IL", name: "Israel", phonePlaceholder: "+972" },
    { code: "EG", name: "Egypt", phonePlaceholder: "+20" },
    { code: "NG", name: "Nigeria", phonePlaceholder: "+234" },
    { code: "KE", name: "Kenya", phonePlaceholder: "+254" },
    { code: "SG", name: "Singapore", phonePlaceholder: "+65" },
    { code: "MY", name: "Malaysia", phonePlaceholder: "+60" },
    { code: "TH", name: "Thailand", phonePlaceholder: "+66" },
    { code: "ID", name: "Indonesia", phonePlaceholder: "+62" },
    { code: "PH", name: "Philippines", phonePlaceholder: "+63" },
    { code: "VN", name: "Vietnam", phonePlaceholder: "+84" },
  ].sort((a, b) => a.name.localeCompare(b.name));
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOAuthSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/" });
  };

  // Email verification states
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(["", "", "", "", "", ""]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_generatedCode, setGeneratedCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showVerification && !canResend && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showVerification, canResend, resendTimer]);

  // Send verification email via API
  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, action: 'send' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ email: data.error || 'Failed to send verification code' });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      setErrors({ email: 'Failed to send verification code. Please try again.' });
      return false;
    }
  };

  // Handle code input change
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]; // Only take first character
    }

    if (!/^\d*$/.test(value)) {
      return; // Only allow digits
    }

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (index === 5 && value) {
      const fullCode = newCode.join("");
      if (fullCode.length === 6) {
        setTimeout(() => handleVerifyCode(fullCode), 100);
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify the code via API
  const handleVerifyCode = async (codeToVerify?: string) => {
    const code = codeToVerify || verificationCode.join("");

    if (code.length !== 6) {
      setVerificationError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");

    try {
      // Verify the code
      const verifyResponse = await fetch('/api/auth/verify-email', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setVerificationError(verifyData.error || "Invalid verification code");
        setIsVerifying(false);
        return;
      }

      // Code verified - now create the account
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          country: formData.country,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        setVerificationError(registerData.error || "Failed to create account");
        setIsVerifying(false);
        return;
      }

      // Success - automatically sign in and redirect to homepage
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        // Use window.location for full page reload to pick up session
        window.location.href = '/';
      } else {
        // If auto-login fails, redirect to login page
        window.location.href = '/login?verified=true';
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError("An error occurred. Please try again.");
      setIsVerifying(false);
    }
  };

  // Resend code
  const handleResendCode = async () => {
    setCanResend(false);
    setResendTimer(60);
    setVerificationCode(["", "", "", "", "", ""]);
    setVerificationError("");

    const success = await sendVerificationEmail();
    if (success) {
      inputRefs.current[0]?.focus();
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
      const hasMinLength = formData.password.length >= 8;

      if (!hasMinLength) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!hasUpperCase) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!hasNumber) {
        newErrors.password = "Password must contain at least one number";
      } else if (!hasSymbol) {
        newErrors.password = "Password must contain at least one symbol (!@#$%^&*...)";
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted || !privacyAccepted) {
      alert("Please accept Alternus Art Gallery policies to continue.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send verification code to email
      const success = await sendVerificationEmail();

      if (success) {
        // Show verification form
        setShowVerification(true);
        setCanResend(false);
        setResendTimer(60);
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ ...errors, email: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Back to signup form
  const handleBackToSignup = () => {
    setShowVerification(false);
    setVerificationCode(["", "", "", "", "", ""]);
    setVerificationError("");
    setGeneratedCode("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-[0.15em] mb-2">ALTERNUS</h1>
            <p className="text-sm text-muted-foreground tracking-[0.2em]">ART GALLERY</p>
          </Link>
        </div>

        {showVerification ? (
          // Verification Screen
          <Card className="border border-gray-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
              <CardDescription className="text-center">
                We&apos;ve sent a 6-digit code to<br />
                <span className="font-medium text-foreground">{formData.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Verification Code Inputs */}
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-semibold"
                      disabled={isVerifying}
                    />
                  ))}
                </div>

                {/* Error Message */}
                {verificationError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive text-center animate-in fade-in slide-in-from-top-2 duration-300">
                    {verificationError}
                  </div>
                )}
              </div>

              {/* Verify Button */}
              <Button
                onClick={() => handleVerifyCode()}
                className="w-full"
                size="lg"
                disabled={isVerifying || verificationCode.join("").length !== 6}
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Email"
                )}
              </Button>

              {/* Resend Code */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Didn&apos;t receive the code? </span>
                {canResend ? (
                  <button
                    onClick={handleResendCode}
                    className="text-primary hover:underline font-medium"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="text-muted-foreground">
                    Resend in {resendTimer}s
                  </span>
                )}
              </div>

              {/* Back Button */}
              <Button
                onClick={handleBackToSignup}
                variant="outline"
                className="w-full"
                disabled={isVerifying}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign Up
              </Button>

              {/* Info */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Check your inbox</p>
                    The verification code may take a few moments to arrive. Please also check your spam folder.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Signup Form
          <Card className="border border-gray-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Sign up to start your artistic journey
              </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) {
                        setErrors({ ...errors, firstName: "" });
                      }
                    }}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) {
                        setErrors({ ...errors, lastName: "" });
                      }
                    }}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  className={errors.email ? "border-red-500" : ""}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Country and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({ ...formData, country: e.target.value });
                      if (errors.country) {
                        setErrors({ ...errors, country: "" });
                      }
                    }}
                    className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                      errors.country ? "border-red-500" : "border-input"
                    }`}
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-xs text-red-500">{errors.country}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={
                      formData.country
                        ? countries.find((c) => c.code === formData.country)?.phonePlaceholder + " ..."
                        : "+355 69 123 4567"
                    }
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) {
                        setErrors({ ...errors, phone: "" });
                      }
                    }}
                    className={errors.phone ? "border-red-500" : ""}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) {
                      setErrors({ ...errors, password: "" });
                    }
                  }}
                  className={errors.password ? "border-red-500" : ""}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
                {/* Password Requirements Indicator */}
                {formData.password && (
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-medium text-muted-foreground">Password must contain:</p>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="flex items-center gap-1.5">
                        {formData.password.length >= 8 ? (
                          <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`text-xs ${formData.password.length >= 8 ? "text-green-600" : "text-gray-500"}`}>
                          8+ characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {/[A-Z]/.test(formData.password) ? (
                          <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`text-xs ${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}`}>
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {/[0-9]/.test(formData.password) ? (
                          <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`text-xs ${/[0-9]/.test(formData.password) ? "text-green-600" : "text-gray-500"}`}>
                          Number
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? (
                          <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`text-xs ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? "text-green-600" : "text-gray-500"}`}>
                          Symbol (!@#$...)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: "" });
                    }
                  }}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <Separator className="my-6" />

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-900">Alternus Art Gallery Policies</p>

                {/* Terms of Service Checkbox */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I accept the{" "}
                      <Link href="/terms" className="text-primary hover:underline font-medium">
                        Terms of Service
                      </Link>{" "}
                      and agree that my artworks will be displayed on Alternus Art Gallery
                    </label>
                  </div>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="privacy"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I accept the{" "}
                      <Link href="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>{" "}
                      and agree that my data will be processed according to the gallery&apos;s policies
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-6"
                size="lg"
                disabled={!termsAccepted || !privacyAccepted || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              {/* Social Sign Up */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => handleOAuthSignIn("google")}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => handleOAuthSignIn("github")}
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          By signing up, you agree to our terms and consent to receive emails from Alternus Art Gallery.
        </p>
      </div>
    </div>
  );
}
