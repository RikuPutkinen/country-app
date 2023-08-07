import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h1 className="text-5xl">Not Found</h1>
      <p className="text-3xl">404</p>
      <Link href='/' className="text-xl underline">Return Home</Link>
    </div>
  )
}