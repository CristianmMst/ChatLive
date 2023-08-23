import { google } from "@/services/auth";

interface Props {
  text: string;
}

export const ButtonGoogle = ({ text }: Props) => {
  return (
    <>
      <div className="border-b border-zinc-400 my-4 relative">
        <p className="bg-zinc-700 px-1 absolute left-[47%] top-[-10px] border border-zinc-400 rounded text-xs">
          OR
        </p>
      </div>
      <button
        type="button"
        className="bg-white p-3 border flex justify-center gap-2 border-slate-200 rounded text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        onClick={google}
      >
        <img
          className="w-6 h-6"
          alt="google logo"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
        />
        <span>{text}</span>
      </button>
    </>
  );
};
