import { Info } from 'lucide-react'

export default function SectionTooltip({ title, description, criteria }) {
    return (
        <div className="relative group flex items-center ml-1">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100 z-50 shadow-xl">
                <p className="font-semibold mb-1">{title}</p>
                <p className="text-gray-300 mb-2">{description}</p>
                {criteria && (
                    <p className="text-gray-400 border-t border-gray-700 pt-2">
                        <span className="font-medium text-gray-300">
                            Criteria:
                        </span>{' '}
                        {criteria}
                    </p>
                )}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
        </div>
    )
}

