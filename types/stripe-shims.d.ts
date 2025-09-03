declare module '@stripe/stripe-js' {
  export function loadStripe(key: string | null | undefined): Promise<any>
  export * from '@stripe/stripe-js'
}

declare module '@stripe/react-stripe-js' {
  import React from 'react'
  export const Elements: React.ComponentType<any>
  export const CardElement: React.ComponentType<any>
  export function useStripe(): any
  export function useElements(): any
  export * from '@stripe/react-stripe-js'
}
