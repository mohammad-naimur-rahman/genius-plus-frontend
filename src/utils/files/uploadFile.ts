import axios from 'axios'
import { API_URL } from '~/configs'

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response: { data: { uploadedUrl: string } } = await axios.post(`${API_URL}/users/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data && typeof response.data === 'object' && 'status' in response.data) {
      return response.data.uploadedUrl
    } else {
      console.info({ fileUploadResponse: response })
    }
  } catch (error) {
    console.error('Error uploading file', error)
    return error
  }
}
