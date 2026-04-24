import React from 'react';
import ChapterSection from './ChapterSection';

const Skills = () => {
  return (
    <ChapterSection
      id="capabilities"
      eyebrow="Capabilities"
      title={'Data systems, product interfaces, and <span>delivery discipline.</span>'}
      accent="This legacy section is kept as a compatibility export; the main homepage now renders the cinematic capabilities chapter directly."
      compact
    />
  );
};

export default Skills;
