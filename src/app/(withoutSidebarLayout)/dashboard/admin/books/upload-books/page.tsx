"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Building,
  DollarSign,
  Eye,
  FileText,
  Hash,
  ImageIcon,
  Info,
  Languages,
  PenTool,
  Save,
  Search,
  Tag,
  Upload,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import * as z from "zod";

// ─── PDF WORKER SETUP ──────────────────────────────────────────────
// Essential for react-pdf to work without external configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// ─── ZOD SCHEMA ────────────────────────────────────────────────────
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const bookSchema = z
  .object({
    title: z.string().min(1, "Book title is required"),
    author: z.string().min(1, "Author name is required"),
    translator: z.string().optional(),
    editor: z.string().optional(),
    publisher: z.string().min(1, "Publisher is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),

    regularPrice: z.coerce.number().min(0, "Price cannot be negative"),
    salePrice: z.coerce.number().min(0, "Price cannot be negative"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),

    isbn: z.string().optional(),
    edition: z.string().optional(),
    pages: z.coerce.number().int().positive().optional(),
    language: z.string().min(1, "Language is required"),

    category: z.string().min(1, "Category is required"),
    formats: z.array(z.string()).min(1, "Select at least one format"),

    metaKeywords: z.string().optional(),
    metaDescription: z.string().optional(),

    // Files are handled manually for validation logic but tracked here
    coverImage: z.custom<File>(v => v instanceof File, "Cover image is required"),
    previewPdf: z.custom<File>(v => v instanceof File, "Preview PDF is required"),
    ebookPdf: z.custom<File>(v => v instanceof File).optional(),
  })
  .refine(
    data => {
      // If "E-Book" format is selected, ebookPdf is required
      if (data.formats.includes("E-Book") && !data.ebookPdf) {
        return false;
      }
      return true;
    },
    {
      message: "E-Book PDF file is required when E-Book format is selected",
      path: ["ebookPdf"],
    }
  );

type BookFormValues = z.infer<typeof bookSchema>;

// ─── MAIN COMPONENT ────────────────────────────────────────────────
export default function AddBookPage() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      formats: ["Hardcover"],
      regularPrice: 0,
      salePrice: 0,
      stock: 0,
    },
  });

  const selectedFormats = watch("formats");
  const isEbookSelected = selectedFormats.includes("E-Book");
  const uploadedCover = watch("coverImage");
  const uploadedPreviewPdf = watch("previewPdf");
  const uploadedEbookPdf = watch("ebookPdf");

  // ─── HANDLERS ────────────────────────────────────────────────────

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);

    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setImageError("Only .jpg, .jpeg, .png and .webp formats are supported.");
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === 800 && img.height === 1200) {
          setCoverPreview(objectUrl);
          setValue("coverImage", file);
          trigger("coverImage");
        } else {
          setImageError(
            `Invalid dimensions. Got ${img.width}x${img.height}px. Required: 800x1200px.`
          );
          URL.revokeObjectURL(objectUrl);
        }
      };

      img.src = objectUrl;
    }
  };

  const handlePdfUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "previewPdf" | "ebookPdf"
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setValue(field, file);
      trigger(field);

      if (field === "previewPdf") {
        setPdfPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const removeFile = (field: "coverImage" | "previewPdf" | "ebookPdf") => {
    setValue(field, undefined as any);
    if (field === "coverImage") {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      setCoverPreview(null);
      setImageError(null);
    }
    if (field === "previewPdf") {
      if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
  };

  const onSubmit = async (data: BookFormValues) => {
    console.log("Form Data Validated:", data);
    // TODO: Send FormData to your backend API
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API
    alert("Book successfully validated and ready for upload!");
  };

  return (
    <div className='min-h-screen bg-[#070a0f] text-white font-sans'>
      {/* Sticky Top Bar */}
      <header className='sticky top-0 z-40 bg-[#070a0f]/80 backdrop-blur-xl border-b border-white/5'>
        <div className='max-w-6xl mx-auto px-8 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Link
              href='/admin/books'
              className='p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all'
            >
              <ArrowLeft size={20} />
            </Link>
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-gray-500'>Books</span>
              <span className='text-gray-600'>/</span>
              <span className='text-white font-medium'>Add New</span>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              disabled={isSubmitting}
              className='px-4 py-2 text-sm font-medium text-gray-400 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white transition-all disabled:opacity-50'
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className='flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isSubmitting ? (
                <span className='animate-pulse'>Processing...</span>
              ) : (
                <>
                  <Save size={15} />
                  Publish Book
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-8 py-10'>
        <div className='mb-8'>
          <div className='inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-3'>
            <BookOpen size={11} />
            New Entry
          </div>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Book</h1>
          <p className='text-gray-500 text-sm mt-1'>
            Fill in the details to list a new product in the store.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 lg:grid-cols-3 gap-6'
        >
          {/* ── LEFT COLUMN ── */}
          <div className='lg:col-span-2 space-y-6'>
            {/* General Information */}
            <Card
              icon={
                <Info
                  size={15}
                  className='text-indigo-400'
                />
              }
              iconBg='bg-indigo-500/10'
              title='General Information'
            >
              <div className='space-y-4'>
                <Field
                  label='Book Title'
                  error={errors.title?.message}
                >
                  <input
                    {...register("title")}
                    type='text'
                    className={getInputClass(!!errors.title)}
                    placeholder='e.g. উদ্দেশ্যহীন আর কত দিন?'
                  />
                </Field>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Field
                    label='Main Author'
                    error={errors.author?.message}
                  >
                    <div className='relative'>
                      <input
                        {...register("author")}
                        type='text'
                        className={`${getInputClass(!!errors.author)} pl-10`}
                        placeholder='Author Name'
                      />
                      <User
                        size={16}
                        className='absolute left-3.5 top-3.5 text-gray-500'
                      />
                    </div>
                  </Field>
                  <Field
                    label='Publisher'
                    error={errors.publisher?.message}
                  >
                    <div className='relative'>
                      <input
                        {...register("publisher")}
                        type='text'
                        className={`${getInputClass(!!errors.publisher)} pl-10`}
                        placeholder='Publisher Name'
                      />
                      <Building
                        size={16}
                        className='absolute left-3.5 top-3.5 text-gray-500'
                      />
                    </div>
                  </Field>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Field
                    label='Translator'
                    error={errors.translator?.message}
                  >
                    <div className='relative'>
                      <input
                        {...register("translator")}
                        type='text'
                        className={`${getInputClass(!!errors.translator)} pl-10`}
                        placeholder='Optional'
                      />
                      <Languages
                        size={16}
                        className='absolute left-3.5 top-3.5 text-gray-500'
                      />
                    </div>
                  </Field>
                  <Field
                    label='Editor'
                    error={errors.editor?.message}
                  >
                    <div className='relative'>
                      <input
                        {...register("editor")}
                        type='text'
                        className={`${getInputClass(!!errors.editor)} pl-10`}
                        placeholder='Optional'
                      />
                      <PenTool
                        size={16}
                        className='absolute left-3.5 top-3.5 text-gray-500'
                      />
                    </div>
                  </Field>
                </div>

                <Field
                  label='Description'
                  error={errors.description?.message}
                >
                  <textarea
                    {...register("description")}
                    rows={5}
                    className={`${getInputClass(!!errors.description)} resize-none`}
                    placeholder='Write the book summary here...'
                  />
                </Field>
              </div>
            </Card>

            {/* Pricing & Stock */}
            <Card
              icon={
                <DollarSign
                  size={15}
                  className='text-emerald-400'
                />
              }
              iconBg='bg-emerald-500/10'
              title='Pricing & Stock'
            >
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Field
                  label='Regular Price (TK)'
                  error={errors.regularPrice?.message}
                >
                  <input
                    {...register("regularPrice")}
                    type='number'
                    className={getInputClass(!!errors.regularPrice)}
                  />
                </Field>
                <Field
                  label='Sale Price (TK)'
                  error={errors.salePrice?.message}
                >
                  <input
                    {...register("salePrice")}
                    type='number'
                    className={getInputClass(!!errors.salePrice)}
                  />
                </Field>
                <Field
                  label='Stock Quantity'
                  error={errors.stock?.message}
                >
                  <input
                    {...register("stock")}
                    type='number'
                    className={getInputClass(!!errors.stock)}
                  />
                </Field>
              </div>
            </Card>

            {/* Specifications */}
            <Card
              icon={
                <Hash
                  size={15}
                  className='text-amber-400'
                />
              }
              iconBg='bg-amber-500/10'
              title='Specifications'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Field
                  label='ISBN'
                  error={errors.isbn?.message}
                >
                  <input
                    {...register("isbn")}
                    type='text'
                    className={getInputClass(!!errors.isbn)}
                    placeholder='978-...'
                  />
                </Field>
                <Field
                  label='Edition'
                  error={errors.edition?.message}
                >
                  <input
                    {...register("edition")}
                    type='text'
                    className={getInputClass(!!errors.edition)}
                    placeholder='1st Edition'
                  />
                </Field>
                <Field
                  label='Pages'
                  error={errors.pages?.message}
                >
                  <input
                    {...register("pages")}
                    type='number'
                    className={getInputClass(!!errors.pages)}
                  />
                </Field>
                <Field
                  label='Language'
                  error={errors.language?.message}
                >
                  <select
                    {...register("language")}
                    className={getInputClass(!!errors.language)}
                  >
                    <option value=''>Select Language</option>
                    <option value='Bengali'>Bengali</option>
                    <option value='English'>English</option>
                    <option value='Arabic'>Arabic</option>
                  </select>
                </Field>
              </div>
            </Card>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className='space-y-6'>
            {/* Book Cover */}
            <Card
              icon={
                <ImageIcon
                  size={15}
                  className='text-pink-400'
                />
              }
              iconBg='bg-pink-500/10'
              title='Book Cover'
            >
              <Field
                label=''
                error={(errors.coverImage?.message as string) || imageError || undefined}
              >
                {uploadedCover && coverPreview ? (
                  <div className='relative rounded-xl overflow-hidden border border-white/10 group'>
                    <img
                      src={coverPreview}
                      alt='Cover'
                      className='w-full h-auto object-cover'
                    />
                    <button
                      type='button'
                      onClick={() => removeFile("coverImage")}
                      className='absolute top-2 right-2 p-2 bg-red-500/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all'
                    >
                      <X size={16} />
                    </button>
                    <div className='absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] text-white'>
                      800 × 1200px
                    </div>
                  </div>
                ) : (
                  <div className='relative'>
                    <input
                      type='file'
                      accept='.jpg,.jpeg,.png,.webp'
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                      onChange={handleImageUpload}
                    />
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${imageError || errors.coverImage ? "border-red-500/30 bg-red-500/5" : "border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5"}`}
                    >
                      <div className='w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-3'>
                        <Upload
                          size={18}
                          className='text-gray-500'
                        />
                      </div>
                      <p className='text-sm font-medium text-gray-400 text-center'>Upload Cover</p>
                      <span className='text-xs text-gray-600 mt-1'>Required: 800 × 1200px</span>
                    </div>
                  </div>
                )}
              </Field>
            </Card>

            {/* Preview PDF */}
            <Card
              icon={
                <Eye
                  size={15}
                  className='text-cyan-400'
                />
              }
              iconBg='bg-cyan-500/10'
              title='Preview PDF (Read Only)'
            >
              <Field
                label='For User Preview'
                error={errors.previewPdf?.message as string}
              >
                {uploadedPreviewPdf ? (
                  <FilePreviewItem
                    file={uploadedPreviewPdf as File}
                    onRemove={() => removeFile("previewPdf")}
                    onPreview={() => setIsPdfModalOpen(true)}
                  />
                ) : (
                  <div className='relative'>
                    <input
                      type='file'
                      accept='.pdf'
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                      onChange={e => handlePdfUpload(e, "previewPdf")}
                    />
                    <div className='border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all'>
                      <Upload
                        size={18}
                        className='text-gray-500 mb-2'
                      />
                      <span className='text-xs text-gray-400'>Upload PDF for Preview</span>
                    </div>
                  </div>
                )}
              </Field>
            </Card>

            {/* Category & Format */}
            <Card
              icon={
                <Tag
                  size={15}
                  className='text-blue-400'
                />
              }
              iconBg='bg-blue-500/10'
              title='Category & Format'
            >
              <div className='space-y-5'>
                <Field
                  label='Category'
                  error={errors.category?.message}
                >
                  <select
                    {...register("category")}
                    className={getInputClass(!!errors.category)}
                  >
                    <option value=''>Select Category</option>
                    <option value='islamic'>Islamic: Self Development</option>
                    <option value='history'>History</option>
                    <option value='novel'>Novel</option>
                  </select>
                </Field>

                <Field
                  label='Format'
                  error={errors.formats?.message}
                >
                  <div className='grid grid-cols-2 gap-3 mt-1'>
                    <Controller
                      name='formats'
                      control={control}
                      render={({ field }) => (
                        <>
                          {["Hardcover", "E-Book"].map(fmt => (
                            <label
                              key={fmt}
                              className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all ${field.value.includes(fmt) ? "bg-indigo-500/10 border-indigo-500/50" : "bg-[#080b10] border-white/10 hover:border-white/20"}`}
                            >
                              <input
                                type='checkbox'
                                value={fmt}
                                checked={field.value.includes(fmt)}
                                onChange={e => {
                                  const checked = e.target.checked;
                                  const newValue = checked
                                    ? [...field.value, fmt]
                                    : field.value.filter(v => v !== fmt);
                                  field.onChange(newValue);
                                }}
                                className='w-4 h-4 accent-indigo-500'
                              />
                              <span className='text-sm'>{fmt}</span>
                            </label>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </Field>
              </div>
            </Card>

            {/* Conditional E-Book Upload */}
            {isEbookSelected && (
              <div className='animate-in fade-in slide-in-from-top-4 duration-300'>
                <Card
                  icon={
                    <FileText
                      size={15}
                      className='text-orange-400'
                    />
                  }
                  iconBg='bg-orange-500/10'
                  title='Full E-Book File'
                >
                  <Field
                    label='Product File'
                    error={errors.ebookPdf?.message as string}
                  >
                    {uploadedEbookPdf ? (
                      <FilePreviewItem
                        file={uploadedEbookPdf as File}
                        onRemove={() => removeFile("ebookPdf")}
                      />
                    ) : (
                      <div className='relative'>
                        <input
                          type='file'
                          accept='.pdf'
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                          onChange={e => handlePdfUpload(e, "ebookPdf")}
                        />
                        <div className='border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:border-orange-500/30 hover:bg-orange-500/5 transition-all'>
                          <Upload
                            size={18}
                            className='text-gray-500 mb-2'
                          />
                          <span className='text-xs text-gray-400'>Upload Full Book PDF</span>
                        </div>
                      </div>
                    )}
                  </Field>
                </Card>
              </div>
            )}

            {/* SEO Meta */}
            <Card
              icon={
                <Search
                  size={15}
                  className='text-violet-400'
                />
              }
              iconBg='bg-violet-500/10'
              title='SEO Meta'
            >
              <div className='space-y-4'>
                <Field
                  label='Meta Keywords'
                  error={errors.metaKeywords?.message}
                >
                  <input
                    {...register("metaKeywords")}
                    type='text'
                    className={getInputClass(!!errors.metaKeywords)}
                    placeholder='Islamic, Spirituality...'
                  />
                </Field>
                <Field
                  label='Meta Description'
                  error={errors.metaDescription?.message}
                >
                  <textarea
                    {...register("metaDescription")}
                    rows={3}
                    className={`${getInputClass(!!errors.metaDescription)} resize-none`}
                    placeholder='Short SEO summary...'
                  />
                </Field>
              </div>
            </Card>
          </div>
        </form>
      </main>

      {/* ── PDF READER MODAL (Using react-pdf) ── */}
      {isPdfModalOpen && pdfPreviewUrl && (
        <PdfPreviewModal
          url={pdfPreviewUrl}
          fileName={uploadedPreviewPdf instanceof File ? uploadedPreviewPdf.name : "Preview"}
          onClose={() => setIsPdfModalOpen(false)}
        />
      )}
    </div>
  );
}

// ─── HELPER COMPONENTS ─────────────────────────────────────────────

// 1. PDF Preview Component (Library Based)
function PdfPreviewModal({
  url,
  fileName,
  onClose,
}: {
  url: string;
  fileName: string;
  onClose: () => void;
}) {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-black/80 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='relative z-10 w-full max-w-4xl h-[85vh] bg-[#1a1d24] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0e1117] shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-indigo-500/10 rounded-lg'>
              <FileText
                size={16}
                className='text-indigo-400'
              />
            </div>
            <div>
              <p className='text-sm font-semibold leading-tight text-white'>{fileName}</p>
              <p className='text-xs text-gray-500'>Pages: {numPages || "Loading..."}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10'
          >
            <X size={20} />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className='flex-1 overflow-y-auto bg-[#2b2f36] p-4 flex justify-center'>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className='text-white text-sm'>Loading PDF...</div>}
            error={<div className='text-red-400 text-sm'>Failed to load PDF.</div>}
            className='flex flex-col gap-4'
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={600} // Fixed width for consistent preview
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className='shadow-lg'
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

// 2. File Item UI
function FilePreviewItem({
  file,
  onRemove,
  onPreview,
}: {
  file: File;
  onRemove: () => void;
  onPreview?: () => void;
}) {
  return (
    <div className='flex items-center gap-3 bg-[#080b10] border border-white/10 rounded-xl p-3 group'>
      <div className='w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center shrink-0'>
        <FileText
          size={17}
          className='text-indigo-400'
        />
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium truncate text-gray-200'>{file.name}</p>
        <p className='text-[10px] text-gray-500'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      <div className='flex items-center gap-1'>
        {onPreview && (
          <button
            type='button'
            onClick={onPreview}
            className='p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition-colors'
            title='Preview PDF'
          >
            <Eye size={14} />
          </button>
        )}
        <button
          type='button'
          onClick={onRemove}
          className='p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors'
          title='Remove'
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

// 3. UI Helpers
function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <label className='block text-[11px] font-semibold uppercase tracking-widest text-gray-500'>
          {label}
        </label>
        {error && (
          <span className='flex items-center gap-1 text-[10px] text-red-400 font-medium'>
            <AlertCircle size={10} /> {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Card({
  icon,
  iconBg,
  title,
  children,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='bg-[#0e1117] border border-white/[0.07] rounded-2xl overflow-hidden'>
      <div className='flex items-center gap-3 px-6 py-4 border-b border-white/[0.05]'>
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
        <h2 className='text-sm font-semibold text-white'>{title}</h2>
      </div>
      <div className='p-6'>{children}</div>
    </div>
  );
}

const getInputClass = (hasError: boolean) =>
  `w-full bg-[#080b10] border rounded-xl px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none transition-all ${
    hasError
      ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
      : "border-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
  }`;
