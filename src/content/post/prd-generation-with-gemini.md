---
title: "Product Requirements Document prompt for Gemini"
description: "Initial discussion with Gemini to generate a Product Requirements Document"
publishDate: "2025-08-20T19:02:00.000Z"
tags: ["prp", "prd", "prompt", "gemini", "ai"]
seriesId: "product-requirements-document-generation"
orderInSeries: 1
---

## Prompt for Gemini

> I want to discuss a software project idea with you and as a result of the discussion I want you to create a Product Requirements Document (PRD) for me that I can use as the base of the project documentation. This is a new project, no historical code base exists.

Here is the project I want to work on:

- I want to be able to extract text from PDF files. Each PDF file contains scanned documents and the pages of the documents are saved as images within the PDFs. I want to be able to extract all text from theses documents. For each PDF file as input there should be a similarly named corresponding markdown file as output. The resulting markdown files must be compatible with Obsidian, I want to have YAML frontmatter in each markdown file listing the title, the file name of the source file, the detected main language, the page count and a timestamp when the file was processed. It's very important to keep the original file name of the PDF file intact and use it for the name of the markdown file, plus it's also crucial for the reference.

- The languages of the documents can be English or Hungarian. I need to be able to detect the language (for better extraction results). The detection can be based on the accented characters (diacritics) present in Hungarian texts and/or a detection of predefined most common stop words for both English and Hungarian. There are a small number of documents with potentially both languages present.

- The should be an input folder ("inbox") where I share my input PDF files and there should be a folder for the output results: the PDFs processed should go to a "processed" folder, while the generated markdown files should go to the "texts" folder. If the system fails to process a PDF file, it should be moved to the "failed" folder.

- There should be a logging function also capturing the events as a plan text file.

- There can be images also present in the PDFs, there is no need to extract them.

- If a PDF file only contains images (e.g. photos) then there is no need to create a markdown file.

- The OCR and processing should be able to run locally, the recommended tool should be `docling`.

- If we can utilise a macbook pro's GPU for the task let's try that, otherwise it's ok to use the CPU.

- Tabular data (tables) in the PDF should be extracted as markdown tables.

- We should be able to fix any markdown lint errors in a post-processing step.

- Please ask any more clarifying questions to complete the discussion.
