"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, MapPin, Globe, Twitter, Linkedin, Rocket, Users } from "lucide-react";
import { KYCVerification } from "./kyc/kyc-verification";
import Image from "next/image";

export function ProfileView() {
  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-48 w-full rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200"
              alt="Cover"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-16 left-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-4 right-4">
            <Button variant="outline" className="bg-background">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <Card className="p-6 pt-20">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
                <Globe className="h-4 w-4 ml-2" />
                <a href="https://example.com" className="hover:underline">
                  example.com
                </a>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge>Entrepreneur</Badge>
              <Badge variant="secondary">Tech</Badge>
              <Badge variant="secondary">Sustainability</Badge>
            </div>

            <p className="text-muted-foreground">
              Serial entrepreneur with a passion for technology and sustainability.
              Currently working on innovative solutions for renewable energy.
            </p>

            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </Card>

        {/* KYC Verification */}
        <KYCVerification status="unverified" />

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Campaigns</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Campaigns</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Total Raised</span>
                <span className="font-medium">$1.2M</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate</span>
                <span className="font-medium">85%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Network</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Connections</span>
                <span className="font-medium">245</span>
              </div>
              <div className="flex justify-between">
                <span>Investors</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span>Entrepreneurs</span>
                <span className="font-medium">156</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Last Active</span>
                <span className="font-medium">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span>Join Date</span>
                <span className="font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Response Rate</span>
                <span className="font-medium">92%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Launched a new campaign</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Connected with 5 new investors</p>
                <p className="text-sm text-muted-foreground">1 week ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}