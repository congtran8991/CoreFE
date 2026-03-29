import { useCallback } from "react";

// export function useFileExport() {
//   const exportFile = useCallback(
//     async (blob: Blob, defaultFilename: string = "export.yaml") => {
//       // Nếu trình duyệt hỗ trợ File System Access API
//       if ("showSaveFilePicker" in window) {
//         try {
//           const pickerOpts = {
//             suggestedName: defaultFilename,
//             types: [
//               {
//                 description: "YAML file",
//                 accept: { "application/x-yaml": [".yaml", ".yml"] },
//               },
//             ],
//           };

//           const handle = await (window as any).showSaveFilePicker(pickerOpts);
//           const writable = await handle.createWritable();
//           await writable.write(blob);
//           await writable.close();
//           return;
//         } catch (err) {
//           console.warn("Save aborted or failed:", err);
//         }
//       }

//       // Fallback nếu không hỗ trợ hoặc người dùng huỷ
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", defaultFilename);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     },
//     []
//   );

//   return { exportFile };
// }

export function useFileExport() {
  const exportFile = useCallback(
    async (blob: Blob, defaultFilename: string = "export.yaml") => {
      if ("showSaveFilePicker" in window) {
        try {
          const pickerOpts = {
            suggestedName: defaultFilename,
            types: [
              {
                description: "YAML file",
                accept: { "application/x-yaml": [".yaml", ".yml"] },
              },
            ],
          };

          const handle = await (window as any).showSaveFilePicker(pickerOpts);
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          return; // Đã lưu xong, không làm gì nữa
        } catch (err: any) {
          if (err.name === "AbortError") {
            // Người dùng nhấn Cancel, không làm gì
            console.log("User cancelled the save dialog");
            return; // Quan trọng: không chạy fallback
          }
          // Nếu lỗi khác, có thể log hoặc xử lý
          console.warn("Save failed:", err);
          // Có thể chạy fallback hoặc không, tuỳ bạn
        }
      }

      // Fallback: nếu không hỗ trợ hoặc lỗi ngoài AbortError
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", defaultFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    []
  );

  return { exportFile };
}
