import Styles from "../../../Authentication/components/Auth.module.css";

export default function AuthTitle({ title }: { title: string }) {
  return (
    <div
      className={`caption p-4 md:p-6 lg:p-8 w-full ${Styles["second-color"]}`}
    >
      <h4 className="text-center text-base md:text-lg lg:text-xl md:text-start py-8 font-bold">
        {title}
      </h4>
    </div>
  );
}
