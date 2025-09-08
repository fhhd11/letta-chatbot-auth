'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect } from 'react';
import { FloatingParticles } from '@/components/ui/floating-particles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading if still checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/30 border-t-purple-500"></div>
          <p className="text-white/70 font-mono text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setIsSubmitting(true);
      await login(email, password);
      router.push('/chat');
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingParticles 
        particleCount={40}
        colors={['#7877c6', '#ff77c6', '#77c6ff', '#c677ff']}
      />
      
      {/* Enhanced Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-[500px] h-[250px] bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent blur-3xl opacity-70 animate-pulse-glow"></div>
        </div>
        <div className="absolute top-3/4 right-1/4 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-[400px] h-[200px] bg-gradient-to-br from-pink-900/15 via-purple-900/8 to-transparent blur-3xl opacity-60 animate-pulse-glow"></div>
        </div>
      </div>
      
      <Card className="w-full max-w-md glass-effect border border-purple-500/30 relative z-10 shadow-2xl animate-slide-in message-glow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="size-16 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg animate-pulse-glow">
              <img src="/Subtract.svg" alt="Letta AI" className="w-8 h-8 brightness-0 invert drop-shadow-sm" />
            </div>
          </div>
          <CardTitle className="text-3xl text-white font-mono mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Welcome Back</CardTitle>
          <CardDescription className="text-white/70 font-mono">
            Sign in to your Letta chatbot account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-mono">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="✉️ Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="glass-effect border-purple-500/30 text-white placeholder:text-white/60 font-mono focus:border-purple-500/60 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-mono">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="🔒 Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
                className="glass-effect border-purple-500/30 text-white placeholder:text-white/60 font-mono focus:border-purple-500/60 transition-all duration-200"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-mono shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100" 
              disabled={isSubmitting || !email || !password}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In ✨'
              )}
            </Button>
            <p className="text-sm text-white/70 text-center font-mono">
              Don't have an account?{' '}
              <Link href="/register" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}