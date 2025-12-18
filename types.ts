
export type Section = 
  | 'overview' 
  | 'analytics'
  | 'users' 
  | 'employers' 
  | 'workers' 
  | 'jobs' 
  | 'applications' 
  | 'communications'
  | 'disputes' 
  | 'financial'
  | 'security' 
  | 'settings';

export interface Metric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: string;
}

export interface StatMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: 'blue' | 'purple' | 'orange' | 'red' | 'green';
}

export interface RecentAction {
  id: string;
  admin: string;
  action: string;
  entity: string;
  time: string;
  type: 'approve' | 'suspend' | 'resolve' | 'reject' | 'verify' | 'info';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Employer' | 'Worker' | 'Admin';
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
  avatar?: string;
}

export interface Job {
  id: string;
  title: string;
  employer: string;
  category: string;
  status: 'Published' | 'Pending' | 'Rejected' | 'Expired';
  postedAt: string;
}