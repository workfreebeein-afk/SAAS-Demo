"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Zap, ArrowRight, Loader2, User } from "lucide-react";
import { StorageAPI } from "@/lib/storage";
import { generateId } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  company: z.string().min(2, "Company name is required"),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1200));
    const newUser = {
      id: generateId(),
      name: data.name,
      email: data.email,
      role: "sales_rep" as const,
      department: data.company,
      status: "active" as const,
      createdAt: new Date().toISOString(),
      permissions: ["crm", "email"],
    };
    StorageAPI.addUser(newUser);
    StorageAPI.setCurrentUser(newUser);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.2)_0%,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-navy-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-glass">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl text-white">JCS <span className="gradient-text-light">AI CRM</span></span>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-1">Create your account</h1>
          <p className="text-white/50 text-sm text-center mb-8">Start your 14-day free trial. No credit card required.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Full Name</label>
                <input {...register("name")} placeholder="James Carter" className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl focus:outline-none focus:border-brand-500/60 transition-all text-sm" />
                {errors.name && <p className="mt-1 text-red-400 text-xs">{errors.name.message}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Company Name</label>
                <input {...register("company")} placeholder="Acme Corp" className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl focus:outline-none focus:border-brand-500/60 transition-all text-sm" />
                {errors.company && <p className="mt-1 text-red-400 text-xs">{errors.company.message}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-1.5">Work Email</label>
                <input {...register("email")} type="email" placeholder="you@company.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl focus:outline-none focus:border-brand-500/60 transition-all text-sm" />
                {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
                <div className="relative">
                  <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Min. 6 chars" className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl focus:outline-none focus:border-brand-500/60 transition-all text-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-red-400 text-xs">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Confirm</label>
                <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl focus:outline-none focus:border-brand-500/60 transition-all text-sm" />
                {errors.confirmPassword && <p className="mt-1 text-red-400 text-xs">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-brand-600 to-purple-700 text-white font-bold rounded-xl shadow-glow hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:scale-100"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><User className="w-4 h-4" /><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
