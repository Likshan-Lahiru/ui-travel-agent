import Chat from "@/app/components/Chat";

export default function HomePage() {
    return (
        <main className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Travel Agent AI</h1>
            <Chat />
        </main>
    );
}
