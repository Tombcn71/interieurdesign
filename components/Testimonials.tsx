import Image from "next/image";

const testimonials = [
  [
    {
      content: "So good! I need this right now. Congrats on the launch!",
      author: {
        name: "Eve Porcello",
        role: "Engineer & Author",
        image: "/eve.jpg",
      },
    },

    {
      content:
        "Finally! Something to help me get over my indecisiveness when decorating my house!",
      author: {
        name: "Arthur Dvorkin",
        role: "Engineer",
        image: "/arthur.jpg",
      },
    },
  ],
  [
    {
      content:
        "This is incredible, you don't need an interior designer anymore.",
      author: {
        name: "Ade Dada",
        role: "Startup Founder",
        image: "/ade.jpeg",
      },
    },
    {
      content:
        "I haven't changed my room layout for 5 years, but this app may change that. Great job.",
      author: {
        name: "Rob Attfield",
        role: "Software Engineer",
        image: "/rob.jpg",
      },
    },
  ],
  [
    {
      content:
        "This is fantastic. I've already decided on a new wall color from a generated image and repainting it is now my weekend project.",
      author: {
        name: "Music",
        role: "Some dude on the internet",
        image: "/music.jpg",
      },
    },
    {
      content: "🤯",
      author: {
        name: "GitHub",
        role: "The one and only",
        image: "/github.jpg",
      },
    },
  ],
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-10 mb-20">
      <div className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 md:px-7">
          <div className="mx-auto md:text-center">
            <h1 className="mx-auto max-w-3xl font-display text-3xl  tracking-normal text-black sm:text-5xl">
              Wat mensen{" "}
              <span className="relative whitespace-nowrap text-blue-600">
                <span className="relative text-teal-600">zeggen</span>
              </span>{" "}
              over deze app.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg sm:text-black text-black leading-7">
              Diverse mensen hebben deze app uitgeprobeerd.{" "}
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-16 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                  {column.map((testimonial, testimonialIndex) => (
                    <li
                      key={testimonialIndex}
                      className="hover:scale-105 transition duration-300 ease-in-out ">
                      <figure className="relative rounded-2xl  p-6 shadow-xl shadow-slate-900/10">
                        <blockquote className="relative">
                          <p className="text-lg tracking-tight text-black">
                            "{testimonial.content}"
                          </p>
                        </blockquote>
                        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                          <div>
                            <div className="font-display text-base text-white">
                              {testimonial.author.name}
                            </div>
                            <div className="mt-1 text-sm text-gray-400">
                              {testimonial.author.role}
                            </div>
                          </div>
                          <div className="overflow-hidden rounded-full bg-slate-50">
                            <Image
                              className="h-14 w-14 object-cover"
                              src={testimonial.author.image}
                              alt="picture of the testimonial author"
                              width={56}
                              height={56}
                            />
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
