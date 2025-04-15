
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Send, Search } from "lucide-react";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    name: "Dr. Smith",
    role: "Math Teacher",
    avatar: "",
    initials: "DS",
    unread: 2,
    messages: [
      { id: "m1", sender: "Dr. Smith", text: "Hello, how can I help you with your math assignment?", time: "Yesterday", sent: false },
      { id: "m2", sender: "You", text: "I'm having trouble with the calculus problem set.", time: "Yesterday", sent: true },
      { id: "m3", sender: "Dr. Smith", text: "Which problem specifically?", time: "Yesterday", sent: false },
      { id: "m4", sender: "Dr. Smith", text: "I can help you during office hours tomorrow.", time: "10:30 AM", sent: false },
    ],
  },
  {
    id: "2",
    name: "Prof. Johnson",
    role: "Science Teacher",
    avatar: "",
    initials: "PJ",
    unread: 0,
    messages: [
      { id: "m1", sender: "Prof. Johnson", text: "Did you complete the lab report?", time: "2 days ago", sent: false },
      { id: "m2", sender: "You", text: "Yes, I submitted it yesterday.", time: "Yesterday", sent: true },
      { id: "m3", sender: "Prof. Johnson", text: "Great, I'll review it soon.", time: "Yesterday", sent: false },
    ],
  },
  {
    id: "3",
    name: "Ms. Brown",
    role: "English Teacher",
    avatar: "",
    initials: "MB",
    unread: 1,
    messages: [
      { id: "m1", sender: "Ms. Brown", text: "Your essay was very well written.", time: "3 days ago", sent: false },
      { id: "m2", sender: "You", text: "Thank you! I worked hard on it.", time: "3 days ago", sent: true },
      { id: "m3", sender: "Ms. Brown", text: "I'd like to discuss some ideas for your next assignment.", time: "Just now", sent: false },
    ],
  },
];

const MessageCenter = () => {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, we would send this to a backend
    console.log("Sending message:", newMessage);
    
    // Update the conversation with the new message
    const updatedMessages = [
      ...activeConversation.messages,
      {
        id: `new-${Date.now()}`,
        sender: "You",
        text: newMessage,
        time: "Just now",
        sent: true,
      },
    ];
    
    const updatedConversation = {
      ...activeConversation,
      messages: updatedMessages,
    };
    
    // Update the active conversation
    setActiveConversation(updatedConversation);
    
    // Clear the input
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: `Message sent to ${activeConversation.name}`,
    });
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="px-4 pt-4 pb-3">
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communicate with your teachers</CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col sm:flex-row">
        {/* Conversation List */}
        <div className="w-full sm:w-1/3 border-r">
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="h-[calc(100%-3.5rem)] overflow-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 flex items-center hover:bg-muted/50 cursor-pointer ${
                  activeConversation.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>{conversation.initials}</AvatarFallback>
                  </Avatar>
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{conversation.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {conversation.messages[conversation.messages.length - 1].time}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.messages[conversation.messages.length - 1].text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message View */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-3 border-b">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                <AvatarFallback>{activeConversation.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-medium">{activeConversation.name}</p>
                <p className="text-xs text-muted-foreground">{activeConversation.role}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {activeConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t">
            <div className="flex items-center">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button
                size="icon"
                className="ml-2"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCenter;
