import { useRef } from "react";
export default function Button() {
  const borderRef = useRef<HTMLButtonElement>(null);
  const colors = ["pink", "purple", "blue", "green", "yellow", "red"];
  return (
    <>
      <button
        className="border-motion w-[100px] h-[42px] text-center rounded-2xl border-[1px] border-transparent p-2 cursor-pointer"
        ref={borderRef}
        onClick={() => {
          alert("Play all");
        }}
      >
        <span className="whitespace-nowrap text-xs">Play all</span>
      </button>
      <style jsx>{`
    .border-motion {
      animation-name: borderChange;
      animation-duration: 4s;
      animation-iteration-count: infinite;
    }

    @keyframes borderChange {
      0%{
      border-color: ${colors[0]};
      }
         20%{
      border-color: ${colors[1]};
      }
         40%{
      border-color: ${colors[2]};
      }
         60%{
      border-color: ${colors[3]};
      }
         80%{
      border-color: ${colors[4]};
      }

      100%{
      border-color: ${colors[5]};
      }
  `}</style>
    </>
  );
}
