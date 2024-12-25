"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ConnectionRequest {
  id: string;
  name: string;
  role: string;
  avatar: string;
  message: string;
  sentAt: string;
  specialties: string[];
}

const initialRequests: ConnectionRequest[] = [
  {
    id: "1",
    name: "David Kim",
    role: "Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    message: "Interested in connecting to discuss potential investment opportunities in the tech sector.",
    sentAt: "2 days ago",
    specialties: ["Tech", "AI", "SaaS"],
  },
  {
    id: "2",
    name: "Emily Watson",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    message: "Looking to connect with experienced investors in the healthcare space.",
    sentAt: "5 days ago",
    specialties: ["Healthcare", "Biotech"],
  },
];

export function NetworkRequests() {
  const [requests, setRequests] = useState<ConnectionRequest[]>(initialRequests);
  const { toast } = useToast();
  const router = useRouter();

  const handleAccept = (request: ConnectionRequest) => {
    setRequests(prev => prev.filter(r => r.id !== request.id));
    toast({
      title: "Connection Accepted",
      description: `You are now connected with ${request.name}`,
    });
  };

  const handleDecline = (request: ConnectionRequest) => {
    setRequests(prev => prev.filter(r => r.id !== request.id));
    toast({
      title: "Connection Declined",
      description: `Connection request from ${request.name} has been declined`,
    });
  };

  const handleMessage = (request: ConnectionRequest) => {
    router.push(`/messages?userId=${request.id}`);
    toast({
      title: "Opening Chat",
      description: `Starting a conversation with ${request.name}`,
    });
  };

  return (
    <div className="space-y-6 mt-6">
      {requests.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No pending connection requests</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={request.avatar}
                    alt={request.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{request.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {request.role}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {request.sentAt}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {request.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm mt-2">{request.message}</p>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      className="gap-2" 
                      onClick={() => handleAccept(request)}
                    >
                      <Check className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => handleDecline(request)}
                    >
                      <X className="h-4 w-4" />
                      Decline
                    </Button>
                    <Button
                      variant="secondary"
                      className="gap-2"
                      onClick={() => handleMessage(request)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}