import Link from "next/link";
import Image from "next/image";

const AuthSuccessPage: React.FC = () => {
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
      Проверьте свой почтовый ящик на наличие ссылки для входа.
      </h1>
      <h2 className="mt-3 text-[13px] leading-[13px] text-[#171A1D] font-normal text-center">
      Не получили письмо? Вернитесь на страницу входа и попробуйте снова.

      </h2>
     
    </div>
  );
};

export default AuthSuccessPage;