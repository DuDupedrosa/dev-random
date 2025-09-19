export default function IntroSectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-max border-b border-b-gray-300 pb-5">
      <h1 className="text-gray-900 text-2xl font-medium">{title}</h1>
      <p className="text-sm text-gray-900 mt-1">{description}</p>
    </div>
  );
}
