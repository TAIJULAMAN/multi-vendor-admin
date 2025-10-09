export default function Loader() {
  return (
    <div className="w-full py-10 flex justify-center items-center">
      <div className="w-full gap-x-2 flex justify-center items-center">
        <div className="w-5 h-5 rounded-full bg-[#d991c2] animate-bounce" />
        <div className="w-5 h-5 rounded-full bg-[#9869b8] animate-bounce [animation-delay:0.1s]" />
        <div className="w-5 h-5 rounded-full bg-[#6756cc] animate-bounce [animation-delay:0.2s]" />
      </div>
    </div>
  );
}
