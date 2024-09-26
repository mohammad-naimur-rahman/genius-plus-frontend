export interface ImageInterface {
  title: string
  prompt: string
  url: string
  aspect: string
}

export interface ImageGenParams {
  style?: string
  color_scheme?: string
  perspective?: string
  lighting?: string
  mood?: string
  background_type?: string
  texture?: string
  subject_type?: string
  environment?: string
  movement?: string
  style_intensity?: string
}
