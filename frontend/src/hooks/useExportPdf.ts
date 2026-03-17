import { useCallback } from "react";
import type { OptimizationJob } from "@/types";

export function useExportPdf() {
  const exportPdf = useCallback(async (job: OptimizationJob, filename: string) => {
    if (!job.result?.optimized_resume) return;

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "letter" });

    const margin = 48;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`NextRole — Optimized Resume  |  ATS Score: ${job.atsScore ?? "—"}`, margin, y);
    y += 6;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 20;

    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);

    const lines = job.result.optimized_resume.split("\n");
    for (const line of lines) {
      const wrapped = doc.splitTextToSize(line.trim() || " ", maxWidth);
      for (const wl of wrapped) {
        if (y + 16 > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(wl, margin, y);
        y += 15;
      }
    }

    const safeName = filename.replace(/\.pdf$/i, "");
    doc.save(`${safeName}_optimized.pdf`);
  }, []);

  return { exportPdf };
}