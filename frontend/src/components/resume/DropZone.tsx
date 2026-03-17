"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";
import { clsx } from "clsx";
import { uploadResume } from "@/lib/api";
import { Button } from "@/components/ui/Button";

interface Props {
  onUploaded: (resume: { id: string; filename: string; createdAt?: string }) => void;
}

export function DropZone({ onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const resume = await uploadResume(file);
      onUploaded(resume);
    } catch (e: any) {
      setError(e.response?.data?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [onUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "application/pdf": [".pdf"] }, maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "glass cursor-pointer p-10 flex flex-col items-center gap-3 transition-all",
        isDragActive ? "border-brand-500 bg-brand-600/5" : "hover:border-white/20"
      )}
    >
      <input {...getInputProps()} />
      <div className="w-12 h-12 rounded-xl bg-brand-600/10 flex items-center justify-center">
        {uploading ? (
          <svg className="animate-spin h-5 w-5 text-brand-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
        ) : <Upload size={22} className="text-brand-400" />}
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-300">
          {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
        </p>
        <p className="text-xs text-slate-600 mt-1">PDF up to 10 MB</p>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
