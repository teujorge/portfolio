import { School } from "./School";

export const Education = () => {
  return (
    <div className="subsection">
      <h3>Education</h3>

      <School
        school={"University of Vermont"}
        schoolLink={"https://www.uvm.edu"}
        degree={"BS Mechanical Engineering + CS Minor"}
        city={"Burlington"}
        country={"USA"}
        date={"2016-2020"}
        description={`
          The University of Vermont is a public research 
          university located in Burlington, Vermont, a 
          beautiful city nestled in the heart of the Green 
          Mountains. As a BS Mechanical Engineering major with 
          a Computer Science Minor, I have been part of a 
          rigorous academic program that emphasized hands-on 
          learning, innovation, and sustainability. Outside of 
          the classroom, I worked in the Universities' 
          Fabrication Laboratory, enjoyed outdoor activities 
          like skiing and hiking, and explored the food and 
          culture scene.
        `}
      />

      <School
        school={"American School Foundation"}
        schoolLink={"https://www.asf.edu.mx"}
        city={"Mexico City"}
        country={"MX"}
        date={"2015-2016"}
        description={`
          Mexico City is a vibrant metropolis in the heart of 
          Mexico, with a rich history and culture. Studying 
          in Mexico City for my last year of high school has 
          exposed me to a new range of cultural traditions 
          and amazing foods. I have also had the chance to 
          practice my Spanish language skills and engage with 
          the local community.
        `}
      />

      <School
        school={"American Community School"}
        schoolLink={"https://www.acs.sch.ae"}
        city={"Abu Dhabi"}
        country={"UAE"}
        date={"2008-2015"}
        description={`
          Abu Dhabi is the capital city of the United Arab 
          Emirates and a hub of culture, commerce, and 
          education in the Middle East. Studying in Abu Dhabi 
          for middle and high school has given me a unique 
          perspective on this dynamic region, with opportunities 
          to learn about Arabic language and culture, engage 
          with a diverse student body, and explore amazing 
          landmarks.
        `}
      />
    </div>
  );
};
