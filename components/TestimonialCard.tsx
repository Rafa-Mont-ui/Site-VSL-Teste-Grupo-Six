import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  // legacy/alternate prop names supported below
  age?: number
  weight?: string
  time?: string
  testimonial?: string
  image?: string
  // newer aliases used in pages
  role?: string
  text?: string
  img?: string
  beforeAfter?: string
}

export default function TestimonialCard(props: TestimonialCardProps) {
  const {
    name,
    // legacy
    age,
    weight,
    // newer
    role,
    text,
    img,
    beforeAfter,
    testimonial,
    image,
  } = props

  // prefer newer aliases when provided
  const subtitle = role ?? (age ? `${age} anos` : undefined)
  const extra = beforeAfter ?? weight
  const body = text ?? testimonial ?? ''
  const src = img ?? image ?? '/placeholder.svg'

  return (
    <figure className="rounded-3xl border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl h-full flex flex-col justify-between text-left">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={src}
          alt={`Foto de ${name}`}
          className="w-20 h-20 rounded-full object-cover border-2 border-emerald-200 flex-shrink-0"
          loading="lazy"
        />
        <div>
          <figcaption>
            <p className="font-bold text-lg">{name}</p>
            {subtitle && <p className="text-sm text-emerald-600 font-semibold">{subtitle}</p>}
            {extra && <p className="text-xs text-muted-foreground">{extra}</p>}
          </figcaption>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-current" />
        ))}
      </div>
      <blockquote className="text-sm text-muted-foreground leading-relaxed mt-2">{body ? `"${body}"` : ''}</blockquote>
    </figure>
  )
}
