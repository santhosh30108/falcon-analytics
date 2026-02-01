/**
 * Shimmer placeholder - use for loading skeletons.
 * Combine with rounded, h-*, w-* etc. to match content shape.
 */
export default function Shimmer({ className = '', ...props }) {
    return (
        <div className={`shimmer rounded ${className}`} aria-hidden {...props} />
    )
}

