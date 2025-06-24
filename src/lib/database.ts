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
