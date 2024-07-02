"use strict";

import { WriteStream, createWriteStream } from "fs";
import axios from "axios";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on("end", function (): void {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  return inputLines[currentLine++] || "";
}

async function bodyTemperature(
  doctorName: string,
  diagnosisId: number
): Promise<number[]> {
  let page = 1;
  let temperatures: number[] = [];

  while (true) {
    console.log(`Fetching page ${page}...`); // Debugging line
    const response = await axios.get(
      `https://jsonmock.hackerrank.com/api/medical_records?page=${page}`
    );
    const data = response.data;

    if (!data.data || data.data.length === 0) break;

    // console.log(`Fetched data from page ${page}:`, data.data); // Debugging line

    data.data.forEach((record: any) => {
      if (
        record.doctor.name === doctorName &&
        record.diagnosis.id === diagnosisId
      ) {
        console.log(`Matching record found:`, record); // Debugging line
        temperatures.push(record.vitals.bodyTemperature);
      }
    });

    if (page >= data.total_pages) break;
    page++;
  }

  console.log(`Collected temperatures: ${temperatures}`); // Debugging line

  if (temperatures.length === 0) {
    return [0, 0]; // No matching records
  }

  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);

  return [minTemp, maxTemp];
}

async function main() {
  const outputPath = process.env["OUTPUT_PATH"] || "output.txt";
  const ws: WriteStream = createWriteStream(outputPath);

  const doctorName: string = "Dr Arnold Bullock";
  const diagnosisId: number = 2;

  console.log(`Doctor Name: ${doctorName}`); // Debugging line
  console.log(`Diagnosis ID: ${diagnosisId}`); // Debugging line

  try {
    const result: number[] = await bodyTemperature(doctorName, diagnosisId);
    ws.write(result.join("\n") + "\n");
  } catch (error) {
    console.error("Error fetching data:", error);
    ws.write("Error fetching data\n");
  } finally {
    ws.end();
  }
}

main();
