
import type React from 'react';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Part-time, Full-time';
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string; // Keep for semantic data, but will not be used for rendering placeholder
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const TESTIMONIALS: Testimonial[] = [
    { quote: "Prohire Employment understood our needs perfectly and delivered exceptional candidates in record time. Their professionalism and dedication are second to none.", name: "Jane Doe", title: "Director of HR", company: "Innovatech Solutions" },
    { quote: "As a candidate, the process was seamless and transparent. The team at Prohire was supportive and truly advocated for me. I couldn't be happier in my new role.", name: "John Smith", title: "Senior Frontend Engineer", company: "Innovatech Solutions" },
    { quote: "They are true partners in talent acquisition. Their market insight and vast network have been invaluable to our company's growth.", name: "Emily White", title: "VP of Engineering", company: "Future Forward" }
];

export const TEAM_MEMBERS: TeamMember[] = [
    { name: "Kyle Banks", role: "Founder & CEO", imageUrl: "placeholder" },
    { name: "Mathaes Daniels", role: "Co-Founder", imageUrl: "placeholder" },
    { name: "Scott Warnock", role: "Co-Founder", imageUrl: "placeholder" }
];

export const NAV_LINKS = [
  { path: '/jobs', label: 'Jobs' },
  { path: '/employers', label: 'For Employers' },
  { path: '/job-seekers', label: 'For Job Seekers' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];