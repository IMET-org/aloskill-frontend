type Instructor = {
  about: {
    bio: string;
    description: string;
    fullDescription: string;
    education: string;
    expertise: string[];
  };
};

export function AboutTab({ instructor }: { instructor: Instructor }) {
  return (
    <div className='space-y-6 animate-fade-in-content'>
      <div>
        <h3 className='text-xl font-bold text-[#074079] mb-4'>{instructor.about.bio}</h3>
        <p className='text-gray-600 leading-relaxed mb-4'>{instructor.about.description}</p>
        <p className='text-gray-600 leading-relaxed'>{instructor.about.fullDescription}</p>
      </div>

      <div>
        <h3 className='text-xl font-bold text-[#074079] mb-4'>Education:</h3>
        <p className='text-gray-600 leading-relaxed'>{instructor.about.education}</p>
      </div>

      <div>
        <h3 className='text-xl font-bold text-[#074079] mb-4'>EXPERTISE & SKILLS:</h3>
        <div className='space-y-2'>
          {instructor.about.expertise.map((skill, index) => (
            <div
              key={index}
              className='inline-block bg-gradient-to-r from-orange-50 to-purple-50 text-[#074079] px-4 py-2 rounded-lg mr-2 mb-2 hover:shadow-md transition-shadow duration-300'
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
