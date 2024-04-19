export function LabeledInput({
  label,
  value,
  type,
  onChange,
}: {
  label?: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        className={`w-24 px-1 rounded-lg text-lg
          ${type === "color" ? "cursor-pointer" : ""}
        `}
        onChange={onChange}
        value={value}
        type={type}
      />
      <label className="w-28 -mt-2 p-2 text-center">{label}</label>
    </div>
  );
}
