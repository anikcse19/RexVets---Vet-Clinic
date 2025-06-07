"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Stethoscope,
  Heart,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Get the session to check user role
        const session = await getSession();

        // Redirect based on user role or to dashboard
        if (session?.user?.role === "admin") {
          router.push("/admin/dashboard");
        } else if (session?.user?.role === "veterinarian") {
          router.push("/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6235651/pexels-photo-6235651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-teal-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              REXVET Portal
            </h1>
            <p className="text-blue-100 text-sm">
              Compassionate care for every companion
            </p>
          </div>

          {/* Login Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-blue-100">
                Sign in to access your veterinary dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Error Alert */}
                {error && (
                  <Alert className="bg-red-500/20 border-red-400/50 text-red-100">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@vetclinic.com"
                    {...register("email")}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-blue-400 transition-all duration-200"
                  />
                  {errors.email && (
                    <Alert className="bg-red-500/20 border-red-400/50 text-red-100">
                      <AlertDescription>
                        {errors.email.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-blue-400 transition-all duration-200 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <Alert className="bg-red-500/20 border-red-400/50 text-red-100">
                      <AlertDescription>
                        {errors.password.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setValue("rememberMe", checked as boolean)
                      }
                      className="border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-white text-sm cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-blue-200 hover:text-white text-sm underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-white/20"></div>
                <span className="mx-2 text-white/60 text-xs">or</span>
                <div className="flex-grow border-t border-white/20"></div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white/90 hover:bg-white text-blue-700 font-semibold py-3 flex items-center justify-center space-x-2"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M44.5 20H24V28.5H36.9C35.5 33.1 31.1 36 24 36C16.3 36 10 29.7 10 22C10 14.3 16.3 8 24 8C27.2 8 30.1 9.1 32.3 11L38.1 5.2C34.4 2 29.5 0 24 0C10.7 0 0 10.7 0 24C0 37.3 10.7 48 24 48C37.3 48 48 37.3 48 24C48 22.7 47.9 21.4 47.7 20.1L44.5 20Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M6.3 14.7L13.1 19.3C15 15.1 19.1 12 24 12C26.7 12 29.1 12.9 31 14.3L37.1 8.2C33.7 5.5 29.1 4 24 4C15.6 4 8.4 9.8 6.3 14.7Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M24 44C31 44 36.9 39.2 38.9 32.9L31.5 27.7C30.1 30.9 27.3 33 24 33C19.1 33 15 29.9 13.1 25.7L6.3 30.3C8.4 35.2 15.6 44 24 44Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M47.7 20.1H44.5V20H24V28.5H36.9C36.1 31.1 34.3 33.2 31.5 34.7L38.9 39.9C42.7 36.5 44.5 31.7 44.5 24C44.5 22.7 44.4 21.4 44.2 20.1Z"
                      fill="#1976D2"
                    />
                  </g>
                </svg>
                <span>Sign in with Google</span>
              </Button>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-white/20">
                <p className="text-blue-100 text-sm">
                  Need access?{" "}
                  <button className="text-blue-200 hover:text-white underline transition-colors">
                    Contact Administrator
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-white/60">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Trusted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4" />
              <span className="text-sm">Professional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
