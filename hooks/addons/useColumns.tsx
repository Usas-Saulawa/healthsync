import { DataTableColumn } from "@/components/ui/Table";
import { PatientListItem } from "@/lib/validations/dashboard";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function useColumns() {
  const patientColumns: DataTableColumn<PatientListItem>[] = [
    {
      name: "Patient Name",
      selector: "name",
      sortable: true,
      width: "1.6fr",
      cell: (row: any) => (
        <div className="flex min-w-0 items-center gap-2.25">
          {" "}
          <div className="flex h-7.75 w-7.75 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFF2A8]">
            {" "}
            <img
              src="/images/profile.jpeg"
              alt={row.name}
              className="h-full w-full object-cover"
            />{" "}
          </div>{" "}
          <span className="truncate text-[11px] font-semibold leading-3.75">
            {" "}
            {row.name}{" "}
          </span>{" "}
        </div>
      ),
    },
    {
      name: "Hospital No.",
      selector: "hospNo",
      sortable: true,
      width: "1.3fr",
    },
    { name: "Age/Sex", selector: "ageSex", width: "1fr" },
    { name: "Ward/bed", selector: "wardBed", sortable: true, width: "1.3fr" },
    {
      name: "Primary Diagnosis",
      selector: "diagnosis",
      width: "1.8fr",
      cellClassName: "font-medium text-[#172033] truncate",
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: PatientListItem) => (
        <div className="flex items-center">
          {" "}
          <span className="inline-flex h-5.75 items-center rounded-full bg-[#FFF0A6] px-2.75 text-[10px] font-medium leading-none text-[#D99A00]">
            {" "}
            {row.status || "Active Admitted"}{" "}
          </span>{" "}
        </div>
      ),
    },
    {
      name: "Insurance",
      selector: "insurance",
      width: "1.1fr",
      align: "right",
    },
  ];
  return {
    patientColumns,
  };
}
