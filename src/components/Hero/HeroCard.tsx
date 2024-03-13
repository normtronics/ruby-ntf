import { Typography } from "@material-tailwind/react"
import { Button } from "@material-tailwind/react";
import Image from "next/image";

export interface HeroCardProps {
  backgroundColor: string;
  title: string
  subText: string
  image: string
}

export const HeroCard = (props: HeroCardProps) => {
  const {
    backgroundColor,
    title,
    subText,
    image
  } = props

  return (
    <div 
      className="flex justify-center"
      style={{
        backgroundColor,
        textAlign: 'center'
      }}
    >
      <div className="max-w-screen-xl grid grid-flow-row md:grid-flow-col gap-3 p-8 items-center m-auto justify-center">
        <Image 
          src={image}
          loading="lazy" 
          alt={""}  
          width={300}
          height={300}
          objectFit="contain"
        />
        <div>
          <Typography
            variant='h1'
            color="white"
            className="flex items-center gap-x-2 p-1 font-bold text-3xl justify-center"
            placeholder={''}
          >
           {title}
          </Typography>

          <Typography
            variant='paragraph'
            color="white"
            className="flex items-center gap-x-2 p-1 font-medium"
            placeholder={''}
          >
            <a href="#" className="flex items-center">
              {subText}
            </a>
          </Typography>
          {/* <div className="flex w-max gap-1">
            <Button color='white' placeholder={''}>Explore Collection</Button>
            <Button color='white' variant='text' placeholder={''}>Follow on X</Button>
          </div> */}
        </div>
      </div>
    </div>
  )
}