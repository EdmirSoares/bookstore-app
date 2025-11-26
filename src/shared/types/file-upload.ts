
export interface ExpoFileUpload {
  uri: string;
  type?: string;
  name?: string;
  mimeType?: string;
  size?: number;
}

export interface FormDataFile {
  uri: string;
  type: string;
  name: string;
}

export function createFormDataFile(file: ExpoFileUpload, defaultName: string = 'bookCover.jpg'): FormDataFile {
  return {
    uri: file.uri,
    type: file.mimeType || file.type || 'image/jpeg',
    name: file.name || defaultName,
  };
}
