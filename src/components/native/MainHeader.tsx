"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import RocketImage from "@/assets/images/rocket.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MainHeader({
  onlineGenerator = false,
}: {
  onlineGenerator?: boolean;
}) {
  const router = useRouter();

  function handleChangePage() {
    if (onlineGenerator) {
      router.push("/");
      return;
    }

    router.push("/api-docs");
  }

  return (
    <div className="h-28 md:h-24 bg-violet-400 shadow-md w-full">
      <div className="flex flex-col md:flex-row justify-center md:justify-between md:max-w-3/4 mx-auto gap-5 items-center h-full px-8">
        <Link href={"/"} className="font-semibold text-2xl text-white">
          DevRandom
        </Link>

        <div className="flex items-center gap-4">
          <Button className="bg-white text-violet-500 hover:bg-white cursor-pointer font-bold px-4 py-2 rounded-xl shadow hover:scale-105 transition-transform">
            Entrar / Cadastro
          </Button>

          <Button
            onClick={handleChangePage}
            className="bg-gradient-to-r cursor-pointer from-fuchsia-500 via-violet-500 to-indigo-500
                   text-white font-bold text-base sm:text-lg px-6 py-3 rounded-2xl
                   shadow-lg shadow-violet-300
                   hover:scale-110 hover:shadow-xl hover:shadow-violet-400
                   transition-all duration-300 ease-out"
          >
            <Image
              className="max-w-[20px] sm:max-w-[24px]"
              alt="Rocket-Icon"
              src={RocketImage}
            />{" "}
            {onlineGenerator ? "Gerador online" : "Utilizar API"}
          </Button>
        </div>
      </div>
    </div>
  );
}
