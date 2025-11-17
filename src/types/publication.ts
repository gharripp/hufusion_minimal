export type PublicationType = 'publication' | 'presentation';
export type PresentationType = 'poster' | 'oral';

export interface Publication {
  id: string;
  type: PublicationType;
  title: string;
  authors: string;
  year: number;

  // For publications
  journal?: string;
  doi?: string;

  // For presentations
  venue?: string;
  presentationType?: PresentationType;

  // PDF file
  pdfUrl?: string;

  // Metadata
  createdAt?: string;
  updatedAt?: string;
}
