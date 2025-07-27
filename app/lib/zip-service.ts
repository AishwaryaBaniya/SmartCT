// lib/zip-service.ts
import JSZip from 'jszip';

export class ZipService {
  static async getZipContents(file: Blob): Promise<string[]> {
    const arrayBuffer = await file.arrayBuffer();
    const zip = new JSZip();
    const zipData = await zip.loadAsync(arrayBuffer);
    
    const contents: string[] = [];
    zipData.forEach((relativePath, file) => {
      if (!file.dir) contents.push(relativePath);
    });
    return contents;
  }
}