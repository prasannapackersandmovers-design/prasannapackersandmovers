export default function ReviewsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
          Customer Reviews
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          What our customers say
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
          Customer reviews will appear here as verified feedback is
          collected.
        </p>
      </div>
    </section>
  );
}