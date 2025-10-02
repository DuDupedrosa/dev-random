import { FaCircleCheck } from 'react-icons/fa6';

export default function AlertSuccess({ text }: { text: string }) {
  return (
    <div className="flex transition-all fade-in duration-300 items-start gap-2 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
      <FaCircleCheck className="h-4 w-4 mt-0.5" />
      <p>{text}</p>
    </div>
  );
}
