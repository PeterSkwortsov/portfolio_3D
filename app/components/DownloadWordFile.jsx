// components/DownloadWordFile.jsx
"use client";

import { useState } from "react";

export default function DownloadWordFile() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Имитация загрузки (можно убрать)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const link = document.createElement("a");
      link.href = "/1200.png";
      link.download = "/1200.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Ошибка при скачивании:", error);
      alert("Произошла ошибка при скачивании файла");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`btn btn-primary ${
        isDownloading ? "btn-disabled" : "btn-success"
      }`}
    >
      {isDownloading ? (
        <>
          <span className="loading loading-spinner"></span>
          Скачивание...
        </>
      ) : (
        <>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Скачать резюме (Word)
        </>
      )}
    </button>
  );
}
