export default function Loader() {
  return (
    <div className="w-full py-20 flex justify-center items-center">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#14803c] animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-r-[#FF914C] animate-spin [animation-duration:1.6s]" />
        <div className="absolute inset-4 rounded-full border-4 border-transparent border-b-[#0ea5e9] animate-spin [animation-duration:2s]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#14803c] shadow-[0_0_20px_4px_rgba(20,128,60,0.35)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
