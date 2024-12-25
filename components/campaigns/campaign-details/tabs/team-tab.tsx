"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import type { CampaignTeamMember } from "@/types/campaign";

interface TeamTabProps {
  members: CampaignTeamMember[];
  onContactMember: (memberId: string) => void;
}

export function TeamTab({ members, onContactMember }: TeamTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {members.map((member) => (
        <Card key={member.id} className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <p className="text-sm mt-2">{member.bio}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => onContactMember(member.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {members.length === 0 && (
        <div className="text-center py-6 text-muted-foreground col-span-2">
          No team members listed
        </div>
      )}
    </div>
  );
}