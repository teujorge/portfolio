import { Expandable } from "@/components/Expandable";

export const Job = ({
  title,
  employer,
  employerLink,
  start,
  end,
  city,
  desc,
}: {
  title: string;
  employer?: string;
  employerLink?: string;
  start?: string;
  end?: string;
  city?: string;
  desc: string[];
}) => {
  const date = start
    ? end
      ? `${start} - ${end}`
      : `${start}`
    : end
    ? `${end}`
    : "current";

  const expandableId = `job-${title}-${employer}`;

  return (
    <Expandable
      expandableTargetId={expandableId}
      className="reveal flex items-center justify-center border-l-0 border-[var(--primary-color)] md:m-4 md:p-2 md:border-l-2"
    >
      <div className="reveal flex flex-col items-start text-left mt-2.5 mb-2.5 md:ml-7.5 md:mr-7.5">
        <h4 className="text-lg font-bold">
          {title}
          {employer ? (
            employerLink ? (
              <>
                ,{" "}
                <a
                  href={employerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  {employer}
                </a>
              </>
            ) : (
              `, ${employer}`
            )
          ) : (
            ""
          )}
          {city ? `, ${city}` : ""}
        </h4>
        <p className="text-xs mt-1">{date ? date : "current"}</p>
        <ul id={expandableId} className="h-0 opacity-0">
          {desc.map((description, index) => (
            <div
              key={`description-${title}-${index}`}
              className="mt-5 ml-6 md:reveal"
            >
              <li className="list-disc">
                <p>{description}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </Expandable>
  );
};
