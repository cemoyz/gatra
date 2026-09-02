import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AuthorsRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/dashboard/users?tab=authors')
  }, [router])

  return null
}
