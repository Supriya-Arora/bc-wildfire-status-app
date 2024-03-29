import { RefObject } from "react";
import { CSVDownload, CSVLink } from "react-csv";
import Link from "react-csv/components/Link";

type Props = {
  csvData: string;
  csvInstance: RefObject<Link>;
  onDownload: () => void;
};

export const CsvDownload = ({ csvData, csvInstance, onDownload }: Props) => {
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 mt-2 max-h-10"
        onClick={onDownload}
      >
        Download
      </button>
        <CSVLink
          data={csvData}
          filename={"wildfires.csv"}
          ref={
            csvInstance as unknown as RefObject<Link> &
              ((instance: HTMLAnchorElement | null) => void)
          }
        />
    </>
  );
};