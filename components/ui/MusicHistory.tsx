import History from "./History";

export default function MusicHistory() {
  return (
    <section className="flex items-center gap-4 overflow-x-scroll scrollbar-none">
      {Array.from({ length: 10 }).map((_, index) => (
        <History key={index} title="Home" />
      ))}
    </section>
  );
}
