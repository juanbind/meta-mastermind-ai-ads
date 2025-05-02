
import { supabase } from './supabase';
import { format } from 'date-fns';

// Interface definitions
export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  status: string;
  stage: string;
  source: string | null;
  value: number;
  last_activity: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  assigned_to: string | null;
}

export interface Company {
  id: string;
  name: string;
  industry: string | null;
  website: string | null;
  employees_count: number | null;
  annual_revenue: number | null;
  address: any | null;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  name: string;
  stage: string;
  value: number;
  currency: string;
  probability: number;
  expected_close_date: string | null;
  contact_id: string | null;
  company_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string | null;
  contact_id: string | null;
  company_id: string | null;
  deal_id: string | null;
  scheduled_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  status: string;
  contact_id: string | null;
  company_id: string | null;
  deal_id: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface Integration {
  id: string;
  provider: string;
  name: string;
  status: string;
  credentials: any | null;
  metadata: any | null;
  last_sync: string | null;
  created_at: string;
}

// Fetch contacts with pagination
export async function fetchContacts(page = 1, pageSize = 10, filters: any = {}) {
  try {
    let query = supabase.from('contacts').select('*', { count: 'exact' });
    
    // Apply filters
    if (filters.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    
    if (filters.stage) {
      query = query.eq('stage', filters.stage);
    }
    
    if (filters.source) {
      query = query.eq('source', filters.source);
    }
    
    if (filters.tags) {
      query = query.contains('tags', filters.tags);
    }
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    return { data, count, page, pageSize };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

// Create a new contact
export async function createContact(contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}

// Update a contact
export async function updateContact(id: string, updates: Partial<Contact>) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating contact ${id}:`, error);
    throw error;
  }
}

// Delete a contact
export async function deleteContact(id: string) {
  try {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting contact ${id}:`, error);
    throw error;
  }
}

// Fetch companies with pagination
export async function fetchCompanies(page = 1, pageSize = 10, filters: any = {}) {
  try {
    let query = supabase.from('companies').select('*', { count: 'exact' });
    
    // Apply filters
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }
    
    if (filters.industry) {
      query = query.eq('industry', filters.industry);
    }
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('name')
      .range(from, to);
    
    if (error) throw error;
    
    return { data, count, page, pageSize };
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
}

// Fetch deals with pagination
export async function fetchDeals(page = 1, pageSize = 10, filters: any = {}) {
  try {
    let query = supabase.from('deals').select('*', { count: 'exact' });
    
    // Apply filters
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }
    
    if (filters.stage) {
      query = query.eq('stage', filters.stage);
    }
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    return { data, count, page, pageSize };
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
}

// Fetch activities for a contact, company, or deal
export async function fetchActivities(filters: { 
  contact_id?: string;
  company_id?: string;
  deal_id?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    const { page = 1, pageSize = 10 } = filters;
    let query = supabase.from('activities').select('*', { count: 'exact' });
    
    if (filters.contact_id) {
      query = query.eq('contact_id', filters.contact_id);
    }
    
    if (filters.company_id) {
      query = query.eq('company_id', filters.company_id);
    }
    
    if (filters.deal_id) {
      query = query.eq('deal_id', filters.deal_id);
    }
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    return { data, count, page, pageSize };
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}

// Create activity log
export async function logActivity(activityData: Omit<Activity, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('activities')
      .insert(activityData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
}

// Fetch tasks
export async function fetchTasks(filters: {
  contact_id?: string;
  company_id?: string;
  deal_id?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    const { page = 1, pageSize = 10 } = filters;
    let query = supabase.from('tasks').select('*', { count: 'exact' });
    
    if (filters.contact_id) {
      query = query.eq('contact_id', filters.contact_id);
    }
    
    if (filters.company_id) {
      query = query.eq('company_id', filters.company_id);
    }
    
    if (filters.deal_id) {
      query = query.eq('deal_id', filters.deal_id);
    }
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('due_date', { ascending: true })
      .range(from, to);
    
    if (error) throw error;
    
    return { data, count, page, pageSize };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// Format date for display
export function formatDate(dateString: string | null) {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch (e) {
    console.error('Date formatting error:', e);
    return dateString;
  }
}

// Function to handle Facebook Lead form integration
export async function setupFacebookLeadIntegration(accessToken: string, formId: string) {
  try {
    // Store integration credentials
    const { data, error } = await supabase
      .from('integrations')
      .insert({
        provider: 'facebook',
        name: `Facebook Lead Form ${formId}`,
        credentials: { accessToken },
        metadata: { formId }
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      integrationId: data.id,
      webhookUrl: `https://mbbfcjdfdkoggherfmff.functions.supabase.co/fb-lead-sync`
    };
  } catch (error) {
    console.error('Error setting up Facebook integration:', error);
    throw error;
  }
}
