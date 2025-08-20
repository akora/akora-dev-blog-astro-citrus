---
title: "Product Requirements Document for PDF Text Extractor"
description: "The result: Product Requirements Document: PDF Text Extractor"
publishDate: "2025-01-20T19:43:00.000Z"
tags: ["prd", "prompt", "gemini", "ai"]
seriesId: "product-requirements-document-generation"
orderInSeries: 2
---

## Product Requirements Document: PDF Text Extractor

### Introduction

This document outlines the requirements for a software solution designed to automate the extraction of text from scanned PDF documents. The system will process image-based PDFs, extract their textual content, and save the results as formatted markdown files. The primary goals are to provide a reliable, automated, and local solution for digitizing document content for use with tools like Obsidian.

### Project Goals

The core objective is to create a robust, file-based automation system that performs the following tasks:

- **Process** a designated input directory for new PDF files when the script is run.
- **Extract** text, including tabular data, from image-based PDFs using Optical Character Recognition (OCR).
- **Detect** the primary language (English or Hungarian) of the document to optimize OCR.
- **Generate** a well-structured markdown file for each successful extraction.
- **Manage** input files by moving them to success or failure directories.
- **Log** all events and errors.

### Functional Requirements

#### File System Structure

The application will operate using a predefined folder structure:

- **`inbox/`**: The directory where all new PDF files are placed for processing.
- **`processed/`**: The destination for PDF files that have been successfully processed.
- **`texts/`**: The destination for the generated markdown files.
- **`failed/`**: The destination for PDF files that the system failed to process.

#### Processing Logic

The system will be run **manually**. When executed, the script will process all PDF files found in the **`inbox/`** directory. It will iterate through each file and initiate the following sequence:

1. **Read and Analyze:** The system will open the PDF file to determine its content.
2. **Language Detection:** Before OCR, the system will detect the document's main language as either English or Hungarian. This can be based on the presence of accented characters (diacritics) or a list of common stop words.
3. **OCR and Extraction:** Using the recommended `docling` tool, the system will perform OCR on the images within the PDF to extract all text.
    - **Tables:** Tabular data will be recognized and converted into a markdown table format.
    - **Images:** Any non-textual images (e.g., photos) will be ignored and not extracted.
4. **Markdown Generation:** If text is successfully extracted, a markdown file will be created. The filename must exactly match the original PDF filename (e.g., `SampleDoc.pdf` becomes `SampleDoc.md`).
5. **YAML Frontmatter:** Each markdown file will include the following YAML frontmatter at the top:

    ```yaml
    ---
    title: [Document Title]
    source: [Original PDF Filename]
    detected_language: [en or hu]
    page_count: [Number of pages]
    processed_at: [ISO 8601 Timestamp]
    ---
    ```

6. **Error Handling:**

    - If a PDF is found to contain **only images** (no extractable text), a markdown file will **not** be created, and the PDF will be moved to the `processed/` folder.
    - If the system fails to process a PDF for any reason, the file will be moved to the `failed/` folder.

#### Post-Processing

A post-processing step will be implemented to fix any markdown linting errors to ensure the generated files are clean and correctly formatted.

### Technical Requirements

#### Technology Stack

- **Core Tool:** `docling` will be used for the OCR and document analysis.
- **Platform:** The solution must be able to run locally on a **MacBook Pro**.
- **Hardware Acceleration:** The system will attempt to utilize the **GPU** for processing to improve performance. If GPU acceleration is not available or fails, it will fall back to using the CPU.

#### Logging

- A plain text log file (`run.log`) will be maintained.
- The log will record key events, including file detection, language detection, successful processing, errors, and file movements, along with timestamps.

### Success Metrics

The project will be considered successful if it achieves the following:

- **High Success Rate:** A minimum of 95% of valid, text-containing PDFs are successfully processed.
- **Accuracy:** The extracted text and tables are highly accurate and readable.
- **Automation:** The system operates without manual intervention once configured.
- **Compatibility:** The generated markdown files are fully compatible with Obsidian.
