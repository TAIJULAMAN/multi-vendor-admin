/* eslint-disable react/prop-types */
const BrandLogo = ({ img, status, information }) => (
  <div className="flex flex-col items-center justify-center w-full">
    {img && <img src={img} alt="" />}
    <h1 className="text-3xl font-semibold">{status}</h1>
    <p className="text-sm text-gray-800">{information}</p>
  </div>
);

export default BrandLogo;
