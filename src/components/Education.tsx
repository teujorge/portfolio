const School = ({
  school,
  degree,
  city,
  country,
  date,
  description,
}: {
  school: string;
  degree: string;
  city: string;
  country: string;
  date: string;
  description: string;
}) => {
  return (
    <div className="reveal flex flex-row items-center justify-center border-[var(--primary-color)] md:m-6 md:p-4  md:border-r-2">
      <div className="flex flex-col justify-center items-start mt-2.5 mb-2.5 md:ml-7.5 md:mr-7.5">
        <h4 className="reveal">
          {degree}, {school}, {city}, {country}
        </h4>
        <p className="reveal text-xs">{date ? date : "current"}</p>
        <p className="reveal m-2.5">{description}</p>
      </div>
    </div>
  );
};

export const Education = () => {
  return (
    <div className="subsection">
      <h3>Education</h3>

      <School
        school={"University of Vermont"}
        degree={"BS Mechanical Engineering"}
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
        degree={"High School"}
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
        degree={"High School"}
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
