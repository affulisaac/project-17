"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserPlus, MessageSquare, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const users = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Investor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    specialties: ["Tech", "Healthcare"],
    investments: 12,
    connected: false,
    bio: "Angel investor with focus on healthcare tech and AI solutions.",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    specialties: ["Sustainability", "Clean Energy"],
    campaigns: 3,
    connected: true,
    bio: "Serial entrepreneur building sustainable energy solutions.",
  },
];

export function NetworkDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [connections, setConnections] = useState<Record<string, boolean>>(
    Object.fromEntries(users.map(user => [user.id, user.connected]))
  );
  const { toast } = useToast();
  const router = useRouter();

  const handleConnect = (userId: string) => {
    setConnections(prev => ({ ...prev, [userId]: !prev[userId] }));
    const user = users.find(u => u.id === userId);
    
    toast({
      title: connections[userId] ? "Connection Removed" : "Connection Request Sent",
      description: connections[userId]
        ? `You are no longer connected with ${user?.name}`
        : `A connection request has been sent to ${user?.name}`,
    });
  };

  const handleMessage = (userId: string) => {
    const user = users.find(u => u.id === userId);
    router.push(`/messages?userId=${userId}`);
    
    toast({
      title: "Opening Chat",
      description: `Starting a conversation with ${user?.name}`,
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialties = selectedSpecialties.length === 0 ||
      user.specialties.some(specialty => selectedSpecialties.includes(specialty));
    
    return matchesSearch && matchesSpecialties;
  });

  return (
    <div className="space-y-6 mt-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, or bio..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["Tech", "Healthcare", "Sustainability", "Clean Energy"].map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedSpecialties(prev =>
                  prev.includes(specialty)
                    ? prev.filter(s => s !== specialty)
                    : [...prev, specialty]
                );
              }}
            >
              {specialty}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleMessage(user.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant={connections[user.id] ? "secondary" : "default"}
                      onClick={() => handleConnect(user.id)}
                    >
                      {connections[user.id] ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <UserPlus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{user.bio}</p>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">Specialties:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">
                  {user.role === "Investor" 
                    ? `${user.investments} investments made`
                    : `${user.campaigns} campaigns launched`
                  }
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}