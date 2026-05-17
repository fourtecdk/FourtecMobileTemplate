import BC_API from './bc_api';

export const getBCVendors = async () => {
  try {
    const response = await BC_API.get('vendors');
    return response.data.value;
  } catch (error) {
    console.error('Error fetching BC Vendors:', error);
    throw error;
  }
};

export const getBCVendor = async (id: string) => {
  try {
    const response = await BC_API.get(`vendors(${id})`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching BC Vendor ${id}:`, error);
    throw error;
  }
};

export const createBCVendor = async (vendor: Record<string, unknown>) => {
  try {
    const response = await BC_API.post('vendors', vendor);
    return response.data;
  } catch (error) {
    console.error('Error creating BC Vendor:', error);
    throw error;
  }
};

export const updateBCVendor = async (id: string, vendor: Record<string, unknown>, etag: string) => {
  try {
    const response = await BC_API.patch(`vendors(${id})`, vendor, {
      headers: { 'If-Match': etag },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating BC Vendor ${id}:`, error);
    throw error;
  }
};

export const deleteBCVendor = async (id: string, etag: string) => {
  try {
    await BC_API.delete(`vendors(${id})`, {
      headers: { 'If-Match': etag },
    });
  } catch (error) {
    console.error(`Error deleting BC Vendor ${id}:`, error);
    throw error;
  }
};
