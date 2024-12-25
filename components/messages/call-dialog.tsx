"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CallDialogProps {
  open: boolean;
  onClose: () => void;
  participant: {
    name: string;
    avatar: string;
  };
  type: "audio" | "video";
}

export function CallDialog({ open, onClose, participant, type }: CallDialogProps) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      // Simulate connection delay
      const timer = setTimeout(() => {
        setIsConnecting(false);
        toast({
          title: "Call Connected",
          description: `${type === "video" ? "Video call" : "Call"} connected with ${participant.name}`,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open, participant.name, type, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open && !isConnecting) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [open, isConnecting]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    toast({
      title: "Call Ended",
      description: `Call duration: ${formatDuration(callDuration)}`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isConnecting ? "Connecting..." : `On call with ${participant.name}`}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-8">
          {type === "video" ? (
            <div className="relative w-full aspect-video bg-accent rounded-lg overflow-hidden">
              {!isVideoOff && (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                  loop
                  poster={participant.avatar}
                >
                  {/* In a real app, this would be the video stream */}
                </video>
              )}
              <div className="absolute bottom-4 right-4">
                <div className="w-32 aspect-video bg-background rounded-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                    loop
                  >
                    {/* In a real app, this would be the local video stream */}
                  </video>
                </div>
              </div>
            </div>
          ) : (
            <Avatar className="w-32 h-32">
              <AvatarImage src={participant.avatar} alt={participant.name} />
            </Avatar>
          )}

          {!isConnecting && (
            <p className="text-sm text-muted-foreground">
              {formatDuration(callDuration)}
            </p>
          )}

          <div className="flex gap-4">
            <Button
              size="icon"
              variant={isMuted ? "destructive" : "secondary"}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>

            {type === "video" && (
              <Button
                size="icon"
                variant={isVideoOff ? "destructive" : "secondary"}
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? (
                  <VideoOff className="h-4 w-4" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
              </Button>
            )}

            <Button
              size="icon"
              variant="destructive"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}