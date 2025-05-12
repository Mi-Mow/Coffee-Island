// src/context/CafeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";

const CafeContext = createContext();

export const useCafeData = () => useContext(CafeContext);

export const CafeProvider = ({ children }) => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const loadExcel = async () => {
      const response = await fetch("/data/Taipei_Retro_Cafe.xlsx");
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const parsed = raw.slice(1).map((row) => ({
          id: row[0],
          name_zh: row[1],
          name_en: row[2],
          district: row[3],
          price_level: row[4],
          specials: row[5],
          pour_over: row[6],
          dessert: row[7],
          opening_hours: row.slice(8, 15),
          address: row[15],
          lat: row[16],
          lng: row[17],
          map_link: row[18],
          description: row[19],
          tags: row[20]?.split(","),
          rating: row[21],
          district_id: row[22]
        }));

        setCafes(parsed);
      };

      reader.readAsArrayBuffer(blob);
    };

    loadExcel();
  }, []);

  return (
    <CafeContext.Provider value={{ cafes }}>{children}</CafeContext.Provider>
  );
};
