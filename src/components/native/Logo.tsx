import Link from 'next/link';
import { IoHome } from 'react-icons/io5';

export default function LogoLink({ authenticate }: { authenticate?: boolean }) {
  return (
    <Link
      href={authenticate ? '/dashboard' : '/'}
      className="flex items-center gap-2 font-bold text-2xl text-white hover:scale-105 transition-transform"
    >
      <IoHome className="w-8 h-8 text-white" />
      <span className="text-white drop-shadow-md">DevRandom</span>
    </Link>
  );
}
