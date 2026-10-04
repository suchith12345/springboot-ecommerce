import ProductCart from "./shared/ProductCart";

const products = [
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  },
];
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="flex items-center justify-center text-4xl text-gray-800 font-bold mb-12">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:tet-left">
          <p className="text-lg mb-4">
            Welcome to E-shop, a modern e-commerce platform created to make
            online shopping simple, convenient, and enjoyable. We bring a
            variety of products together in one place, making it easy for
            customers to discover and purchase the products they need.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:mb-0 ">
          <img
            src="https://embarkx.com/sample/placeholder.png"
            alt="ABOUT US"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          ></img>
        </div>
      </div>

      <div className="py-2 space-y-8">
        <h1 className="flex items-center justify-center text-4xl text-gray-800 font-bold">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, i) => (
            <ProductCart
              key={i}
              image={item.image}
              productName={item.productName}
              description={item.description}
              specialPrice={item.specialPrice}
              price={item.price}
              about
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default About;
