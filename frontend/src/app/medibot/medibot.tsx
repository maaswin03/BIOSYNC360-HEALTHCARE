import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface FormattedResponseProps {
  text: string;
  className?: string;
}

export const FormattedResponse: React.FC<FormattedResponseProps> = ({
  text,
  className = "",
}) => {
  if (!text) return null;

  const renderContent = () => {
    return text.split("\n").map((line, i) => {
      if (!line.trim()) return null;

      // Header (## Header)
      if (line.startsWith("## ")) {
        return (
          <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-primary">
            {line.substring(3)}
          </h3>
        );
      }

      // Subheader (### Subheader)
      if (line.startsWith("### ")) {
        return (
          <h4 key={i} className="text-md font-medium mt-3 mb-1">
            {line.substring(4)}
          </h4>
        );
      }

      // Bullet points (- Item)
      if (line.startsWith("- ")) {
        return (
          <ul key={i} className="list-disc pl-5 my-1">
            <li>{line.substring(2)}</li>
          </ul>
        );
      }

      // Numbered lists (1. Item)
      if (/^\d+\./.test(line)) {
        return (
          <ol key={i} className="list-decimal pl-5 my-1">
            <li>{line.substring(line.indexOf(" ") + 1)}</li>
          </ol>
        );
      }

      // Bold text (**text**)
      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={i} className="my-1">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <span key={j} className="font-semibold">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        );
      }

      // Metrics (SpO2: 98%)
      if (/: \d+/.test(line)) {
        const [label, value] = line.split(": ");
        return (
          <p key={i} className="my-1">
            <span className="font-medium">{label}:</span> {value}
          </p>
        );
      }

      // Default paragraph
      return (
        <p key={i} className="my-2">
          {line}
        </p>
      );
    });
  };

  return <div className={`text-sm ${className}`}>{renderContent()}</div>;
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Medibot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your health assistant. How can I help you with medical questions today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Format history correctly - must start with user message
      const formattedHistory = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      // Ensure first message is from user
      if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
        formattedHistory.unshift({
          role: "user",
          parts: [{ text: "Hello" }],
        });
      }

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: formattedHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(data.timestamp),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text:
            error instanceof Error ? error.message : "Failed to get response",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 border-b">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/medibot" className="hover:text-primary">
                  Ai & Assistance
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">
                  Medibot
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col p-4">
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="text-xl">AI Health Assistant</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-3 rounded-lg p-4 ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="mt-0.5 h-5 w-5" />
                    ) : (
                      <Bot className="mt-0.5 h-5 w-5" />
                    )}
                    <FormattedResponse
                      text={msg.text}
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                    <Bot className="h-5 w-5" />
                    <div className="flex space-x-2">
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <form
                className="flex w-full gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about symptoms, medications, or general health advice..."
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
