import { Job } from "./Job";

export const Experience = () => {
  return (
    <div className="subsection">
      <h3>Experience</h3>

      <Job
        title={"Software Developer"}
        employer={"Dtek.ai"}
        employerLink="https://dtek.ai"
        city={"Dubai"}
        start={"2023"}
        end={"Present"}
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
        employerLink="https://aerospace.honeywell.com"
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
        employerLink="https://www.bendixking.com"
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
