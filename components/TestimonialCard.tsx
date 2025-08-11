
import React from 'react';
import type { Testimonial } from '../data';

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg h-full">
    <blockquote className="text-slate-600 dark:text-slate-300 italic">
      "{testimonial.quote}"
    </blockquote>
    <div className="mt-6">
      <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.title}, {testimonial.company}</p>
    </div>
  </div>
);

export default TestimonialCard;