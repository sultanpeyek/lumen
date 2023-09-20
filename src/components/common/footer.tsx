import Link from 'next/link'

export default function Footer() {
  return (
    <div className="w-full mx-auto text-white py-4 shadow-md">
      <div className="container md:flex md:justify-between md:items-center">
        <div className="text-center md:text-left mb-2 md:mb-0">
          Made by{' '}
          <Link
            href="https://x.com/sultanpeyek"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @sultanpeyek
          </Link>
        </div>

        <div className="flex justify-center text-center space-x-6">
          <Link
            href="https://github.com/sultanpeyek/lumen"
            className="text-gray-300 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-sourced on GitHub
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href="https://www.helius.dev/blog/all-you-need-to-know-about-solanas-new-das-api"
            className="text-gray-300 hover:text-white group"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className="text-primary group-hover:underline">
              Helius DAS API
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
