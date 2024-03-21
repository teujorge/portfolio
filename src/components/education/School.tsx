import { Expandable } from "@/components/Expandable";

export const School = ({
  school,
  schoolLink,
  degree,
  city,
  country,
  date,
  description,
}: {
  school: string;
  schoolLink?: string;
  degree?: string;
  city: string;
  country: string;
  date: string;
  description: string;
}) => {
  const expandableId = `school-${school}-${degree}`;

  return (
    <Expandable
      expandableTargetId={expandableId}
      className="reveal flex flex-row items-center justify-center border-[var(--primary-color)] md:m-4 md:p-2 md:border-r-2"
    >
      <div className="flex flex-col justify-center items-start my-2.5 md:mx-7.5">
        <h4 className="reveal text-lg font-bold text-right w-full">
          {degree ? degree + ", " : ""}
          {schoolLink ? (
            <a
              href={schoolLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary-color)] transition-colors"
            >
              {school}
            </a>
          ) : (
            school
          )}
          , {city}, {country}
        </h4>
        <p className="reveal text-xs text-right w-full">
          {date ? date : "current"}
        </p>
        <p id={expandableId} className="md:reveal m-2.5 h-0 opacity-0">
          {description}
        </p>
      </div>
    </Expandable>
  );
};
