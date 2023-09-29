const Job = ({
  title,
  employer,
  start,
  end,
  city,
  desc,
}: {
  title: string;
  employer?: string;
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

  return (
    <div className="reveal flex items-center justify-center border-l-0 border-[var(--primary-color)] md:m-6 md:p-4 md:border-l-2">
      <div className="reveal flex flex-col items-start text-left mt-2.5 mb-2.5 md:ml-7.5 md:mr-7.5">
        <h4 className="font-black">
          {title}
          {employer ? `, ${employer}` : ""}
          {city ? `, ${city}` : ""}
        </h4>
        <p className="text-xs mt-1">{date ? date : "current"}</p>
        <ul>
          {desc.map((description, index) => (
            <div
              key={`description-${title}-${index}`}
              className="reveal mt-5 ml-6"
            >
              <li className="list-disc">
                <p>{description}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Experience = () => {
  return (
    <div className="subsection">
      <h3>Experience</h3>

      <Job
        title={"Freelance Software Engineer"}
        desc={[
          `Increased profitability for 
          Zid store owners by developing a web-based 
          dashboard that streamlined inventory management 
          resulting in a dramatic increase in efficiency when editing products.`,

          `Improved user experience and functionality 
          for multiple clients by utilizing strong 
          problem-solving skills and meticulous attention 
          to detail to deliver high-quality software 
          solutions on time and within budget.`,

          `Led the development and deployment of Co Pilot, 
          a web-based platform that connects individuals 
          with freelance professionals.`,
        ]}
      />

      <Job
        title={"Test Software Engineer"}
        employer={"Honeywell Aerospace"}
        city={"Clearwater"}
        start={"2020"}
        end={"2022"}
        desc={[
          `Successfully coded and tested software changes 
          and enhancements based on design specifications, 
          reducing testing time per unit by 5%.`,

          `Collaborated closely with internal clients to 
          identify their needs and priorities, and then 
          designed customized solutions that met their 
          unique requirements.`,

          `Streamlined the manufacturing process by 
          maintaining and updating factory equipment, 
          resulting in a 10% reduction in equipment 
          downtime, resulting in an increase to product 
          output.`,
        ]}
      />

      <Job
        title={"Systems Engineer Intern"}
        employer={"BendixKing"}
        city={"Albuquerque"}
        end={"2019"}
        desc={[
          `Developed and executed comprehensive integration 
          test plans for iterative software builds, resulting 
          in a 15% reduction in software defects.`,

          `Programmed autonomous processes to efficiently 
          test systems, improving testing rigor and 
          increasing testing efficiency by 20%.`,
        ]}
      />
    </div>
  );
};
