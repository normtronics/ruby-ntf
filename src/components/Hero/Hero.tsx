import { Carousel, Typography, Button } from "@material-tailwind/react";
import { HeroCard } from "./HeroCard";
 
export function Hero() {
  return (
    <Carousel
      className="rounded-xl max-w-screen-2xl"
      autoplay
      loop
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      placeholder={''}
    >
      <HeroCard 
        backgroundColor="#110e14"
        image="/show.png"
        title="March 29th Show"
        subText="March 29th come join Honey Plant, Ruby Mountain, and Normtronics"
      />

      <HeroCard 
        backgroundColor="#110e14"
        image="/BB10.png"
        title="Beats and Brunch"
        subText="March 17th come join use for beats and brunch"
      />

      {/* <HeroCard />
      <HeroCard /> */}
      {/* <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      /> */}
    </Carousel>
  );
}