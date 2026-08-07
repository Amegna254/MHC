import MarketplaceCard from "./MarketplaceCard";

interface Props {
  marketplaceItems: any[];
}

function MarketplaceGrid({ marketplaceItems }: Props) {
  if (marketplaceItems.length === 0) {
    return (
      <div className="mt-12 rounded-3xl border border-dashed border-slate-700 p-12 text-center text-slate-400">
        No marketplace items found.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">

      {marketplaceItems.map((item) => (
        <MarketplaceCard
          key={item.id}
          item={item}
        />
      ))}

    </section>
  );
}

export default MarketplaceGrid;