import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu Trigger (Optional if we have bottom nav, but good for categories) */}
                <button className="lg:hidden text-gray-600">
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary tracking-tight">
                        Girlsintimite
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-text">
                    <Link href="/catalogo" className="hover:text-primary transition-colors">
                        Novedades
                    </Link>
                    <Link href="/catalogo/ropa" className="hover:text-primary transition-colors">
                        Ropa
                    </Link>
                    <Link href="/catalogo/lenceria" className="hover:text-primary transition-colors">
                        Lencería
                    </Link>
                    <Link href="/catalogo/sale" className="text-primary font-bold">
                        Sale
                    </Link>
                </nav>

                {/* Actions (Search + Cart) */}
                <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-primary transition-colors">
                        <Search className="h-5 w-5" />
                    </button>

                    <Link href="/cart" className="relative text-gray-600 hover:text-primary transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                            0
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
