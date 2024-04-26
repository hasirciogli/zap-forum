import { Separator } from "./ui/separator";

export const Sidebar = () => {
    return (
        <aside className="relative top-0 left-0 min-w-64 w-64 h-screen bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-semibold">ZAP Community</h1>
            </div>
            <nav className="p-4">
                <ul>
                    <li className="pb-1 px-2 font-semibold">
                        Yeni Paylaşımlar
                    </li>
                    <Separator />
                    {
                        Array.from({ length: 5 }).map((_, i) => (
                            <li className="mb-1" key={i}>
                                <a href="#" className="flex flex-col p-2 text-sm font-semibold text-gray-600 hover:underline">
                                    <h1 className="">De Fizyon Nedir ?</h1>
                                    <div className="text-xs font-light">Mehmet Ertürk </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </aside>
    );
}