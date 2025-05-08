import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  [x: string]: {};
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  avatar: string;
  createdAt: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
  bio: string;
  languages: string[];
  hourlyRate: number;
  availability: {
    [key: string]: boolean;
  };
  rating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;
  guideId: string;
  userId: string;
  date: string;
  duration: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface Review {
  id: string;
  guideId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
  userAvatar?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  guideId: string;
  maxGroupSize: number;
  includes: string[];
  meetingPoint: string;
  likes: number;
  likedBy: string[];
}

export interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  activeGuides: number;
  pendingBookings: number;
}
