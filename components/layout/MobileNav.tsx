import Link from "next/link";
import { Home, Grid, Heart, User } from "lucide-react";

export function MobileNav() {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200 lg:hidden pb-safe">
            <div className="grid h-16 grid-cols-4 items-center justify-items-center">
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary aria-[current=page]:text-primary"
                >
                    <Home className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Inicio</span>
                </Link>

                <Link
                    href="/catalogo"
                    className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary"
                >
                    <Grid className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Catálogo</span>
                </Link>

                <Link
                    href="/wishlist"
                    className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary"
                >
                    <Heart className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Favoritos</span>
                </Link>

                <Link
                    href="/perfil"
                    className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary"
                >
                    <User className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Perfil</span>
                </Link>
            </div>
        </div>
    );
}
