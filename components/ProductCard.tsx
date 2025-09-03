import { Check, Star } from "lucide-react"
import CTAButton from "./CTAButton"

interface ProductCardProps {
  title: string
  description?: string
  price: string
  image?: string
  features?: string[]
  checkoutUrl?: string
  highlight?: boolean
}

export default function ProductCard({
  title,
  description,
  price,
  image,
  features = [],
  checkoutUrl = "#",
  highlight = false,
}: ProductCardProps) {
  return (
    <div
      className={`relative rounded-3xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
        highlight
          ? "border-emerald-500 bg-gradient-to-b from-emerald-50 to-white scale-105"
          : "border-border bg-card hover:border-emerald-200"
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star size={16} fill="currentColor" />
            MAIS POPULAR
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-emerald-600">{price}</p>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((bullet, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <CTAButton href={checkoutUrl} variant={highlight ? "primary" : "secondary"}>
        Quero Transformar Minha Vida
      </CTAButton>

      <p className="text-xs text-center text-muted-foreground mt-3">
        ✅ Garantia de satisfação • 🔒 Compra 100% segura
      </p>
    </div>
  )
}
