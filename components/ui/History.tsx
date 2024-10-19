export default function History({ title }: { title: string }) {
  return (
    <div className="w-16 h-9 p-1 text-md font-bold bg-white text-[#282828] rounded-md flex items-center justify-center">
      <p className="text-center">{title}</p>
    </div>
  );
}
