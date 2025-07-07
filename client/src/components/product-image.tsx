import PlaceholderImage from "./placeholder-image";

interface ProductImageProps {
  imageUrl?: string | null;
  productName: string;
  className?: string;
  showOverlay?: boolean;
}

export default function ProductImage({ 
  imageUrl, 
  productName, 
  className = "w-full h-48",
  showOverlay = true 
}: ProductImageProps) {
  if (imageUrl) {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <img
          src={imageUrl}
          alt={`${productName} tube bender`}
          className="w-full h-full object-cover"
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        )}
      </div>
    );
  }

  return <PlaceholderImage className={className} />;
}