"use client";

import { NetworkDirectory } from "./network-directory";
import { NetworkRequests } from "./network-requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NetworkView() {
  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Network</h1>
          <p className="text-muted-foreground mt-1">
            Connect with entrepreneurs and investors
          </p>
        </header>

        <Tabs defaultValue="directory">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="directory">Directory</TabsTrigger>
            <TabsTrigger value="requests">Connection Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="directory">
            <NetworkDirectory />
          </TabsContent>
          <TabsContent value="requests">
            <NetworkRequests />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}