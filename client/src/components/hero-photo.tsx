import industrialPipesImage from "@assets/gas-oil-waterbio-pipeline-at-industrial-plant-4k-SBI-351207260_1751477832677.jpg";

export default function HeroPhoto() {
  return (
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
      style={{
        backgroundImage: `url(${industrialPipesImage})`,
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
}