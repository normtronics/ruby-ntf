'use client'

import { Typography } from "@material-tailwind/react";
 
export function SimpleFooter() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 py-6 text-center md:justify-between">
      <Typography className="font-normal" placeholder={''}>
        &copy; 2024 Ruby Mountain
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="https://www.instagram.com/ruby.mountain/"
            // color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            placeholder={''}
          >
            Instagram
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://www.rubymountain.xyz/"
            // color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            placeholder={''}
          >
            EPK
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://youtube.com/@rubymountain"
            // color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            placeholder={''}
          >
            Youtube
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="mailTo:info@therosecrib.com"
            // color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            placeholder={''}
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}