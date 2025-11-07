import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PDFDocument } from 'pdf-lib';
@Component({
  selector: 'app-revistas-list',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './revistas-list.component.html',
  styleUrl: './revistas-list.component.scss'
})
export class RevistasListComponent {
  pdf_link: string = 'https://s3.us-east-2.amazonaws.com/bucket-mispueblitos.pe/SETTINGSMP/Pregonero_42.pdf';
  pdfUrl: string | undefined;

  async ngOnInit() {
    // 1️⃣ Descargamos el PDF
    const res = await fetch(this.pdf_link);
    const pdfBytes = await res.arrayBuffer();

    // 2️⃣ Extraemos páginas 1-5
    // Creamos un Blob a partir del Uint8Array devuelto por pdf-lib
    const newPdfBytes = await this.extractPages(pdfBytes);

    // Aseguramos que sea Uint8Array
    const uint8Array = new Uint8Array(newPdfBytes);

    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    this.pdfUrl = URL.createObjectURL(blob);

  }

  async extractPages(pdfBytes: ArrayBuffer) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const newPdf = await PDFDocument.create();

    // Extraemos páginas 1 a 5 (índices 0 a 4)
    const pages = await newPdf.copyPages(pdfDoc, [0, 1, 2, 3, 4]);
    pages.forEach(page => newPdf.addPage(page));

    return await newPdf.save();
  }

}
