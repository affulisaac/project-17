"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Phone, Video, Paperclip, Image as ImageIcon, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { EmojiPicker } from "./emoji-picker";
import { FileUpload } from "./file-upload";
import { CallDialog } from "./call-dialog";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  attachments?: {
    type: "image" | "file";
    url: string;
    name: string;
  }[];
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  unread: number;
  online: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    role: "Investor",
    lastMessage: "Let's schedule a call to discuss the details",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    role: "Entrepreneur",
    lastMessage: "Thanks for your interest in my project",
    unread: 0,
    online: false,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      content: "Hi, I'm interested in learning more about your investment strategy",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      content: "I'd be happy to discuss that. I primarily focus on early-stage tech startups",
      sender: "other",
      timestamp: new Date(Date.now() - 3000000),
    },
  ],
  "2": [
    {
      id: "1",
      content: "Your sustainable energy project looks promising",
      sender: "other",
      timestamp: new Date(Date.now() - 7200000),
    },
  ],
};

export function MessagesView() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [fileUploadType, setFileUploadType] = useState<"image" | "file">("image");
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video">("audio");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (userId) {
      setSelectedConversationId(userId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedConversationId) {
      setMessages(mockMessages[selectedConversationId] || []);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversationId) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleFileUpload = (files: File[]) => {
    if (!selectedConversationId) return;

    const attachments = files.map(file => ({
      type: fileUploadType,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    const message: Message = {
      id: Date.now().toString(),
      content: `Sent ${files.length} ${fileUploadType}${files.length > 1 ? 's' : ''}`,
      sender: "user",
      timestamp: new Date(),
      attachments,
    };

    setMessages(prev => [...prev, message]);
  };

  const handleCall = (type: "audio" | "video") => {
    if (!selectedConversation) return;
    setCallType(type);
    setCallDialogOpen(true);
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:ml-64 h-[calc(100vh-theme(spacing.16))]">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Conversation List */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 h-full">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-accent ${
                    selectedConversationId === conversation.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedConversationId(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={conversation.avatar}
                          alt={conversation.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="ml-2">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {conversation.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full">
          <Card className="h-full flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConversation.name}</h3>
                        <Badge variant="secondary">
                          {selectedConversation.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleCall("audio")}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => handleCall("video")}
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.attachments?.map((attachment, index) => (
                            <div key={index} className="mb-2">
                              {attachment.type === "image" ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                  <Image
                                    src={attachment.url}
                                    alt="Attachment"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 p-2 bg-background rounded">
                                  <File className="h-4 w-4" />
                                  <span className="text-sm truncate">
                                    {attachment.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setFileUploadType("image");
                          setFileUploadOpen(true);
                        }}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setFileUploadType("file");
                          setFileUploadOpen(true);
                        }}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <EmojiPicker
                        onEmojiSelect={(emoji: any) =>
                          setNewMessage((prev) => prev + emoji.native)
                        }
                      />
                    </div>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  Select a conversation to start messaging
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <FileUpload
        open={fileUploadOpen}
        onClose={() => setFileUploadOpen(false)}
        onUpload={handleFileUpload}
        type={fileUploadType}
      />

      {selectedConversation && (
        <CallDialog
          open={callDialogOpen}
          onClose={() => setCallDialogOpen(false)}
          participant={{
            name: selectedConversation.name,
            avatar: selectedConversation.avatar,
          }}
          type={callType}
        />
      )}
    </div>
  );
}