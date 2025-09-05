import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (section: string) => {
    if (pathname === "/") {
      const targetSection = document.getElementById(section)
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      router.push(`/?scroll=${section}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <span className="font-bold text-xl">VitaSlim</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button 
            onClick={() => handleNavigation('produtos')}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Produtos
          </button>
          <button 
            onClick={() => handleNavigation('depoimentos')}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Depoimentos
          </button>
          <Link href="/checkout" className="text-muted-foreground hover:text-foreground transition-colors">
            Planos
          </Link>
        </nav>
      </div>
    </header>
  )
}
