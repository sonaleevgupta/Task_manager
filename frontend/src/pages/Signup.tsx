import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UserPlus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from "@/context/AuthContext";
import { signupSchema, type SignupFormData } from '@/schemas/auth';
import { getErrorMessage } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

export default function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setServerError('');
    try {
      await signup(data);
      toast({ title: 'Account created!', description: 'Welcome to Task Manager.' });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-secondary relative overflow-hidden items-center justify-center">
        <div className="absolute top-16 right-20 w-28 h-28 rounded-full bg-white/10 animate-float" />
        <div className="absolute bottom-24 left-16 w-20 h-20 rounded-2xl bg-white/10 animate-float-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-14 h-14 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1s' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white font-heading mb-4">Join Us</h1>
          <p className="text-white/80 text-lg max-w-sm">
            Create your account and start managing tasks like a pro
          </p>
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading gradient-text">Task Manager</span>
            </div>
            <h2 className="text-3xl font-bold font-heading">Create an account</h2>
            <p className="text-muted-foreground mt-2">Enter your details to get started</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {serverError && (
                <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20">
                  {serverError}
                </div>
              )}

              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" autoComplete="name" className="h-12 rounded-xl border-2 border-border bg-muted/30 focus-visible:ring-primary/30 focus-visible:border-primary transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" autoComplete="email" className="h-12 rounded-xl border-2 border-border bg-muted/30 focus-visible:ring-primary/30 focus-visible:border-primary transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" autoComplete="new-password" className="h-12 rounded-xl border-2 border-border bg-muted/30 focus-visible:ring-primary/30 focus-visible:border-primary transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" autoComplete="new-password" className="h-12 rounded-xl border-2 border-border bg-muted/30 focus-visible:ring-primary/30 focus-visible:border-primary transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button
                type="submit"
                className="w-full h-12 rounded-xl gradient-secondary text-white font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
                Create account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
              </p>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
