import { notFound } from 'next/navigation'

/**
 * Display Not Found page if user tries to go to a link that doesn't exist.
 */
export default function NotFound() {
  notFound()
}
