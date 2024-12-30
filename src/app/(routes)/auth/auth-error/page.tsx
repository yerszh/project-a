import Link from "next/link";
import Image from "next/image";


const AuthErrorPage: React.FC = () => {
  return (
    <div className="p-4 w-full flex flex-col items-center">
    <div className="w-full flex justify-between mt-4">
      
      <Link href="/">
        <Image
          src="/icons/arrow-back.svg"
          alt={"closeButton"}
          height={24}
          width={24}
        />
      </Link>
    </div>

    <h1 className="mt-20 text-xl text-[#171A1D] font-semibold text-center">
    Упс, что-то пошло не так.
    </h1>

  </div>
  );
};

export default AuthErrorPage;
