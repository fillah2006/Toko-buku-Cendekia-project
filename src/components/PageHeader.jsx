export default function PageHeader({ title }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500 text-sm">
        Selamat datang kembali di sistem manajemen TokoBuku Cendakia.
      </p>
    </div>
  );
}