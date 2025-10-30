import { createClient } from '@/lib/supabase/server';

export interface UploadResult {
  url: string;
  path: string;
}

export async function uploadPDF(
  buffer: Buffer,
  fileName: string,
  bucket: string = 'worksheets'
): Promise<UploadResult> {
  const supabase = await createClient();

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: 'application/pdf',
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return {
    url: publicUrl,
    path: data.path,
  };
}

export async function deletePDF(
  path: string,
  bucket: string = 'worksheets'
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`Failed to delete PDF: ${error.message}`);
  }
}

export function generatePDFFileName(
  generationId: string,
  type: 'worksheet' | 'answer-key'
): string {
  const timestamp = Date.now();
  return `${generationId}-${type}-${timestamp}.pdf`;
}
