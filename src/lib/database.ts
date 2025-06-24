import { supabase, W9Request, W9FormData, TABLES } from './supabase'

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

// W9 Request Operations
export async function createW9Request(
  vendorName: string,
  vendorEmail: string,
  createdBy: string
): Promise<W9Request> {
  try {
    const { data, error } = await supabase
      .from(TABLES.W9_REQUESTS)
      .insert({
        vendor_name: vendorName,
        vendor_email: vendorEmail,
        created_by: createdBy,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      throw new DatabaseError(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to create W9 request')
  }
}

export async function getW9Requests(userId: string): Promise<W9Request[]> {
  try {
    const { data, error } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select(`
        *,
        w9_form_data (*)
      `)
      .eq('created_by', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new DatabaseError(error.message)
    }

    return data || []
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to fetch W9 requests')
  }
}

export async function getW9RequestById(requestId: string): Promise<W9Request | null> {
  try {
    const { data, error } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select(`
        *,
        w9_form_data (*)
      `)
      .eq('id', requestId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      throw new DatabaseError(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to fetch W9 request')
  }
}

export async function updateW9RequestStatus(
  requestId: string,
  status: 'pending' | 'completed' | 'expired'
): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLES.W9_REQUESTS)
      .update({ status })
      .eq('id', requestId)

    if (error) {
      throw new DatabaseError(error.message)
    }
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to update W9 request status')
  }
}

// W9 Form Data Operations
export async function submitW9FormData(formData: Omit<W9FormData, 'id' | 'submitted_at'>): Promise<W9FormData> {
  try {
    const { data, error } = await supabase
      .from(TABLES.W9_FORM_DATA)
      .insert({
        request_id: formData.request_id,
        legal_name: formData.legal_name,
        business_name: formData.business_name,
        tax_classification: formData.tax_classification,
        ssn_ein: formData.ssn_ein,
        street_address: formData.street_address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        signature: formData.signature,
        signature_type: formData.signature_type
      })
      .select()
      .single()

    if (error) {
      throw new DatabaseError(error.message)
    }

    // Update the request status to completed
    await updateW9RequestStatus(formData.request_id, 'completed')

    return data
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to submit W9 form data')
  }
}

export async function getW9FormData(requestId: string): Promise<W9FormData | null> {
  try {
    const { data, error } = await supabase
      .from(TABLES.W9_FORM_DATA)
      .select('*')
      .eq('request_id', requestId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      throw new DatabaseError(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to fetch W9 form data')
  }
}

// User Operations
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      throw new DatabaseError(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to fetch user profile')
  }
}

export async function updateUserProfile(userId: string, updates: { name?: string; email?: string }) {
  try {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      throw new DatabaseError(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to update user profile')
  }
}

// Statistics
export async function getW9RequestStats(userId: string) {
  try {
    const { data, error } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select('status')
      .eq('created_by', userId)

    if (error) {
      throw new DatabaseError(error.message)
    }

    const stats = {
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      completed: data.filter(r => r.status === 'completed').length,
      expired: data.filter(r => r.status === 'expired').length
    }

    return stats
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to fetch W9 request statistics')
  }
}

// Candidate Operations
export async function getW9RequestsByEmail(email: string): Promise<W9Request[]> {
  try {
    const { data, error } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select(`
        *,
        w9_form_data (*)
      `)
      .eq('vendor_email', email)
      .order('created_at', { ascending: false })

    if (error) {
      throw new DatabaseError(error.message)
    }

    return data || []
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to fetch W9 requests by email')
  }
}

// Direct Form Access (No Authentication Required)
export async function generateDirectFormLink(requestId: string): Promise<string> {
  try {
    // Generate direct form link - no authentication required
    // The form will validate the request exists and is still pending
    const directLink = `${process.env.NEXT_PUBLIC_SITE_URL}/form/${requestId}?direct=true`

    return directLink
  } catch (error) {
    throw new DatabaseError('Failed to generate form link')
  }
}

// Role Detection Operations
export interface UserRole {
  isAdmin: boolean
  isCandidate: boolean
  primaryRole: 'admin' | 'candidate' | 'both' | 'none'
}

export async function getUserRole(userId: string, userEmail: string): Promise<UserRole> {
  try {
    // Check if user is an admin (has created W-9 requests)
    const { data: adminRequests, error: adminError } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select('id')
      .eq('created_by', userId)
      .limit(1)

    if (adminError) {
      throw new DatabaseError(adminError.message)
    }

    // Check if user is a candidate (has received W-9 requests)
    const { data: candidateRequests, error: candidateError } = await supabase
      .from(TABLES.W9_REQUESTS)
      .select('id')
      .eq('vendor_email', userEmail)
      .limit(1)

    if (candidateError) {
      throw new DatabaseError(candidateError.message)
    }

    const isAdmin = adminRequests && adminRequests.length > 0
    const isCandidate = candidateRequests && candidateRequests.length > 0

    let primaryRole: 'admin' | 'candidate' | 'both' | 'none'
    if (isAdmin && isCandidate) {
      primaryRole = 'both'
    } else if (isAdmin) {
      primaryRole = 'admin'
    } else if (isCandidate) {
      primaryRole = 'candidate'
    } else {
      primaryRole = 'none'
    }

    return {
      isAdmin,
      isCandidate,
      primaryRole
    }
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    throw new DatabaseError('Failed to determine user role')
  }
}

export async function getDefaultDashboardRoute(userId: string, userEmail: string): Promise<string> {
  try {
    const role = await getUserRole(userId, userEmail)

    switch (role.primaryRole) {
      case 'admin':
        return '/admin'
      case 'candidate':
        return '/candidate'
      case 'both':
        // For users who are both admin and candidate, default to admin
        return '/admin'
      case 'none':
      default:
        // New users with no role yet - default to admin (they'll likely create requests)
        return '/admin'
    }
  } catch (error) {
    // If role detection fails, default to admin dashboard
    return '/admin'
  }
}
