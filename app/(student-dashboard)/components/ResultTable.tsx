// // components/ResultTable.tsx
// export default function ResultTable({ results }: { results?: Result[] }) {
//     if (!Array.isArray(results) || results.length === 0) {
//       return <p className="text-center text-gray-500">No results to display.</p>;
//     }
  
//     return (
//       <div className="overflow-x-auto bg-white shadow-md rounded-xl p-6">
//         <table className="min-w-full table-auto text-sm text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Course Code</th>
//               <th className="px-4 py-2">Course Title</th>
//               <th className="px-4 py-2">Units</th>
//               <th className="px-4 py-2">Score</th>
//               <th className="px-4 py-2">Grade</th>
//               <th className="px-4 py-2">Grade Point</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((res, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{res.code}</td>
//                 <td className="px-4 py-2">{res.title}</td>
//                 <td className="px-4 py-2">{res.unit}</td>
//                 <td className="px-4 py-2">{res.score}</td>
//                 <td className="px-4 py-2">{res.grade}</td>
//                 <td className="px-4 py-2">{res.gradePoint}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
  