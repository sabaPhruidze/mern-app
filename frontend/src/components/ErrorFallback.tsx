import { Link } from "react-router-dom"

type Props = {
    error:Error;
    resetErrorBoundary:() => void;
}

const ErrorFallback = ({error,resetErrorBoundary}:Props) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-xl font-bold text-gray-900">Something went wrong</div>
            <p className="text-sm text-gray-600 mt-2">{error.message}</p>
            <div>
                <button onClick={resetErrorBoundary} className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800">
                    Try again
                </button>
                <Link to='/' className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-50"></Link>
            </div>
        </div>
    </div>
  )
}

export default ErrorFallback