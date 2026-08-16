interface EnquiryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EnquiryDetailsPage({
  params,
}: EnquiryDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-950">
          Enquiry Details
        </h1>

        <p className="mt-3 text-gray-600">
          Enquiry ID: {id}
        </p>
      </div>
    </main>
  );
}