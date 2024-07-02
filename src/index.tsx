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

/*
 * Complete the 'bodyTemperature' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING doctorName
 *  2. INTEGER diagnosisId
 * API URL: https://jsonmock.hackerrank.com/api/medical_records?page={page_no}
 */
async function bodyTemperature(
  doctorName: string,
  diagnosisId: number
): Promise<number[]> {
  // Write your code here
}

async function main() {
  const outputPath = process.env["OUTPUT_PATH"] || "output.txt";
  const ws: WriteStream = createWriteStream(outputPath);

  const doctorName: string = "Dr Arnold Bullock";
  const diagnosisId: number = 2;

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
