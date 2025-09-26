import { FaTriangleExclamation } from 'react-icons/fa6';

export default function AlertError({ text }: { text: string }) {
  return (
    <div className="flex transition-all fade-in duration-300 items-start gap-2 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
      <FaTriangleExclamation className="h-4 w-4 mt-0.5" />
      <p>{text}</p>
    </div>
  );
}
