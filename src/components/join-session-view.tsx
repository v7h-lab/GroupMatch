import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface JoinSessionViewProps {
    onJoin: (name: string, email: string) => void;
    isJoining: boolean;
}

export function JoinSessionView({ onJoin, isJoining }: JoinSessionViewProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            onJoin(name, email);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="size-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Join Group Session</h1>
                    <p className="text-gray-500 mt-2">Enter your details to join the foodie squad</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <div className="relative">
                            <User className="absolute top-1/2 -translate-y-1/2 size-5 text-gray-400" style={{ left: '16px' }} />
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="h-12 text-lg"
                                style={{ paddingLeft: '48px' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute top-1/2 -translate-y-1/2 size-5 text-gray-400" style={{ left: '16px' }} />
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="h-12 text-lg"
                                style={{ paddingLeft: '48px' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl"
                        disabled={!name || !email || isJoining}
                    >
                        {isJoining ? 'Joining...' : 'Join Session'}
                        {!isJoining && <ArrowRight className="ml-2 size-5" />}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
