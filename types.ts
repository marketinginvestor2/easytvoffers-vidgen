import React from 'react';

export interface Testimonial {
  id: string;
  businessName: string;
  type: string;
  quote: string;
  result: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum SectionId {
  HERO = 'hero',
  PROBLEM = 'problem',
  FEATURES = 'features',
  PROCESS = 'process',
  TESTIMONIALS = 'testimonials',
  GENERATOR = 'generator',
  CONTACT = 'contact'
}