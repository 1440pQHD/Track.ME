import React from "react";

export default function About({ isDark }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12 flex items-center justify-center gap-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          About
        </h1>
        <img
          src={isDark ? "/src/assets/logo.png" : "/src/assets/logo_light.png"}
          alt="Track.ME"
          className="h-16 w-auto object-contain inline-block"
        />
      </div>

      <p className="text-neutral-400 mt-2 text-lg">
        This page I want to basically explain what motivated me to build this interactive goal tracker. <br />
        Ever since I joined the STEM club in Junior highschool, I've always tried to make big projects. I would always come up with cool ideas, get halway there, and then just abandon them. <br />
        As an example, recently I wanted to build an RC plane. I downloaded all of the files neccesary for building the AeroShark. 
        <br />Because I had way to little expiereince I wanted to design the flight coputer by myself. <br />
        I ended up having so much to do that I eventually got overwhelmed by everything because I had no overview of what needed to be done so I burned out and abandoned it.
      </p>

      <p className="text-neutral-400 mt-2 text-lg">
        The goal of this app is to give anyone building any projects a clear oberview of what needs to be done. The point is to categorize everything into smaller goals so yu can laways have the overview of things <br />
        I try to motivate myself since I want to be able to afford a 3D printer, mine is a hand me down ender 3 hanging on by a thread :D <br />
        I've always tried to involve myself with a plethira of robotics and engineering project, and I'm trying to continue this streak in Hackclub projects.
      </p>
        <p />
      <h2 className="text-emerald-500 mt-10">If you want to contact me my email is:</h2>
      <h1 className="text-emerald-500 hover:bg-neutral-400 mt-6">markakisnikos76@gmail.com</h1>
    </div>
  );
}