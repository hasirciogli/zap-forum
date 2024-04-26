import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const quests = [
    {
      title: "How to use React hooks?",
      description: "I'm having trouble understanding how to use React hooks in my project.",
      content: "Can someone provide a simple example of how to use useState and useEffect hooks?",
      tags: ["React", "Hooks"]
    },
    {
      title: "Best practices for TypeScript in React?",
      description: "I want to improve my TypeScript skills in React. Are there any best practices or recommended patterns?",
      content: "I'm specifically looking for tips on type checking, component props, and state management.",
      tags: ["TypeScript", "React"]
    }
  ];
  return (
    <main className="flex min-h-screen flex-row">
      <Sidebar />

      <div>
        <div className="flex flex-col gap-2 p-6">
          <h1 className="text-4xl font-bold">ZAP Topluluğuna Hoş Geldiniz</h1>
          <p className="text-lg">ZAP Topluluğu, fikirlerinizi ve düşüncelerinizi diğer insanlarla paylaşabileceğiniz bir topluluktur.</p>
        </div>

        <h1 className="text-2xl font-semibold px-6">Sorulara Gel</h1>
        <div className="grid grid-cols-4 w-full p-6 gap-6">
          {
            quests.map((quest, i) => (
              <Card className="space-y-0 h-auto gap-0 relative" key={i}>
                <CardHeader className="gap-0 space-y-0 mb-0">
                  <CardTitle className="text-lg mb-0">{quest.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-lg">{quest.content}</p>
                </CardContent>

                <CardFooter className="bottom-0">
                  <div className="flex flex-wrap gap-2">
                    {
                      quest.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-primary text-white px-2 py-1 rounded">{tag}</span>
                      ))
                    }
                  </div>
                </CardFooter>
              </Card>
            ))
          }
        </div>

        <h1 className="text-2xl font-semibold px-6">En Üstteki Kategoriler</h1>
        <div className="flex flex-wrap gap-2 p-6">
          {
            ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"].map((tag, i) => (
              <span key={i} className="text-xs bg-primary text-white px-2 py-1 rounded">{tag}</span>
            ))
          }
        </div>

      </div>
    </main>
  );
}
