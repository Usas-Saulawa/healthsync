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
          <div className="flex h-7.75 w-7.75 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFF2A8]">
            <img
              src="/images/profile.jpeg"
              alt={row.name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="truncate text-[11px] font-semibold leading-3.75">
            {row.name}
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
      cellClassName: "font-medium truncate",
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: PatientListItem) => (
        <div className="flex items-center">
          {" "}
          <span className="inline-flex h-5.75 items-center rounded-full bg-(--warning-card) px-2.75 text-[10px] font-medium leading-none text-(--warning-title)">
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
      align: "left",
    },
  ];

  const outPatientColumns: DataTableColumn<PatientListItem>[] = [
    {
      name: "Patient Name",
      selector: "name",
      sortable: true,
      width: "1.6fr",
      cell: (row: any) => (
        <div className="flex min-w-0 items-center gap-2.25">
          <div className="flex h-7.75 w-7.75 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFF2A8]">
            <img
              src="/images/profile.jpeg"
              alt={row.name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="truncate text-[11px] font-semibold leading-3.75">
            {row.name}
          </span>
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
    {
      name: "Primary Diagnosis",
      selector: "diagnosis",
      width: "1.8fr",
      cellClassName: "font-medium truncate",
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: PatientListItem) => (
        <div className="flex items-center">
          <span className="inline-flex h-5.75 items-center rounded-full bg-(--warning-card) px-2.75 text-[10px] font-medium leading-none text-(--warning-title)">
            {row.status || "Active Admitted"}
          </span>
        </div>
      ),
    },
    {
      name: "Insurance",
      selector: "insurance",
      width: "1.1fr",
      align: "left",
    },
  ];

  const medicationColumns: DataTableColumn<any>[] = [
    {
      name: "Date",
      selector: "date",
      sortable: true,
      width: "1fr",
      cell: (row: any) => (
        <div className="flex min-w-0 items-center gap-2.25">
          <span className="truncate text-[11px] font-semibold leading-3.75">
            {row.date}
          </span>
        </div>
      ),
    },
    {
      name: "Condition / Procedure",
      selector: "condition",
      sortable: true,
      width: "1.3fr",
    },
    { name: "Provider", selector: "provider", width: "1fr" },
    {
      name: "Facility",
      selector: "facility",
      width: "1.1fr",
      cellClassName: "font-medium truncate",
    },
    {
      name: "Notes",
      selector: "notes",
      width: "2fr",
    },
  ];

  const orderColumns: DataTableColumn<any>[] = [
    {
      name: "Order Name",
      selector: "name",
      width: "2fr",
      cell: (row: any) => (
        <span className="truncate text-[11px] font-semibold leading-3.75">
          {row.name}
        </span>
      ),
    },
    {
      name: "Category",
      selector: "category",
    },
    {
      name: "Ordered By",
      selector: "doctor",
      width: "1.6fr",
      cell: (row: any) => (
        <div className="flex flex-col gap-1">
          <span className="truncate text-xs font-semibold leading-3.75">
            {row.doctor}
          </span>
          <span className="truncate text-xs text-(--shade) leading-3.75">
            {row.hospital}
          </span>
        </div>
      ),
    },
    {
      name: "Date",
      selector: "date",
      width: "1fr",
      cell: (row: any) => (
        <div className="flex flex-col gap-1">
          <span className="truncate text-xs font-semibold leading-3.75">
            {row.date}
          </span>
          <span className="truncate text-xs text-(--shade) leading-3.75">
            {row.time}
          </span>
        </div>
      ),
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: any) => (
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${row.statusStyle}`}
          >
            {row.status}
          </span>
        </div>
      ),
    },
  ];

  const medmanagementColumns: DataTableColumn<any>[] = [
    {
      name: "Diagnosis",
      selector: "diagnosis",
      width: "2fr",
      cell: (row: any) => (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold leading-3.75">
            {row.diagnosis}
          </span>
          <span className="text-[11px] font-semibold leading-3.75">
            {row.medicationsList}
          </span>
        </div>
      ),
    },
    {
      name: "Facility",
      selector: "facility",
      width: "1fr",
      cell: (row: any) => (
        <div className="flex flex-col gap-1">
          <span className="truncate text-xs font-semibold leading-3.75">
            {row.doctor}
          </span>
          <span className="truncate text-xs text-(--shade) leading-3.75">
            {row.facility}
          </span>
        </div>
      ),
    },
    {
      name: "Prescriptions",
      selector: "prescriptionsCount",
      width: "0.6fr",
      cellClassName: "font-medium truncate",
    },
    {
      name: "Date",
      selector: "date",
      width: "1fr",
      cell: (row: any) => (
        <div className="flex flex-col gap-1">
          <span className="truncate text-xs font-semibold leading-3.75">
            {row.date}
          </span>
          <span className="truncate text-xs text-(--shade) leading-3.75">
            {row.time}
          </span>
        </div>
      ),
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: any) => {
        let statusBadgeStyles = "";
        if (row.status === "Active") {
          statusBadgeStyles =
            "bg-(--info-card) text-(--info-title) font-semibold px-3 py-1 rounded-full";
        } else if (row.status === "Completed") {
          statusBadgeStyles =
            "bg-(--info-icon-bg) text-(--primary) font-semibold px-3 py-1 rounded-full";
        } else if (row.status === "Discontinued") {
          statusBadgeStyles =
            "bg-(--danger-card) text-(--danger-title) font-semibold px-3 py-1 rounded-full";
        }
        return (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${statusBadgeStyles}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
  ];

  const prescriptionModalColumns: DataTableColumn<any>[] = [
    {
      name: "Medication Name",
      selector: "name",
      width: "1.5fr",
      cell: (row: any) => (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold leading-3.75">
            {row.name}
          </span>
          <span className="text-[11px] font-semibold leading-3.75">
            {row.dosage}
          </span>
        </div>
      ),
    },
    {
      name: "Route",
      selector: "route",
      width: "0.6fr",
    },
    {
      name: "Frequency",
      selector: "frequencyText",
      width: "1fr",
      cell: (row: any) => (
        <div className="flex gap-1 items-center">
          <span className="text-xs font-semibold ">
            {row.frequencyText.split(" ")[0]}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-(--info-card) text-(--info-title)">
            {row.status}
          </span>
        </div>
      ),
    },
    {
      name: "Duration",
      selector: "duration",
    },
  ];

  const encounterColumns: DataTableColumn<any>[] = [
    {
      name: "Date / Time",
      selector: "date",
      sortable: true,
      width: "1fr",
      cell: (row: any) => (
        <div className="flex flex-col min-w-0 gap-1">
          <span className="truncate text-xs font-semibold leading-3">
            {row.date}
          </span>
          <span className="truncate text-xs text-(--shade) font-semibold leading-3">
            {row.time}
          </span>
        </div>
      ),
    },
    {
      name: "Encounter Type",
      selector: "encounterType",
      width: "1fr",
      cell: (row: any) => {
        let typeBadgeStyles = "";
        if (row.encounterType === "Inpatient") {
          typeBadgeStyles =
            "bg-(--info-card) text-(--info-title) font-semibold px-3 py-1 rounded-full";
        } else if (row.encounterType === "Emergency") {
          typeBadgeStyles =
            "bg-(--danger-card) text-(--danger-title) font-semibold px-3 py-1 rounded-full";
        } else if (row.encounterType === "Telehealth") {
          typeBadgeStyles =
            "bg-(--lab-timeline-bg) text-(--lab-timeline-text) font-semibold px-3 py-1 rounded-full";
        }
        return (
          <div className="flex items-center">
            <span className={`${typeBadgeStyles} text-[11px] inline-block`}>
              {row.encounterType}
            </span>
          </div>
        );
      },
    },
    {
      name: "Title / Subject",
      selector: "title",
      width: "1.3fr",
      cellClassName: "font-medium truncate",
    },
    {
      name: "Provider",
      selector: "provider",
      width: "1fr",
      cellClassName: "font-medium truncate",
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: any) => {
        let statusBadgeStyles = "";
        if (row.status === "Signed") {
          statusBadgeStyles =
            "bg-(--lab-timeline-bg) text-(--lab-timeline-text) font-semibold px-3 py-1 rounded-full";
        } else if (row.status === "Draft") {
          statusBadgeStyles =
            "bg-(--warning-card) text-(--warning-title) font-semibold px-3 py-1 rounded-full";
        }
        return (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${statusBadgeStyles}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
  ];

  const orderTabColumns: DataTableColumn<any>[] = [
    {
      name: "Order Name",
      selector: "orderName",
      sortable: true,
    },
    {
      name: "Category",
      selector: "category",
      sortable: true,
    },
    {
      name: "Ordered By",
      selector: "orderedBy",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
    },
    {
      name: "Priority",
      selector: "priority",
      cell: (row: any) => {
        let priorityStyle = "bg-slate-100 ";
        if (row.priority === "STAT")
          priorityStyle = "bg-(--danger-card) text-(--danger-title) font-bold";
        if (row.priority === "Urgent")
          priorityStyle =
            "bg-(--warning-card) text-(--warning-title) font-bold";
        if (row.priority === "Routine")
          priorityStyle = "bg-(--info-card) text-(--info-title) font-semibold";
        return (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${priorityStyle}`}
            >
              {row.priority}
            </span>
          </div>
        );
      },
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: any) => {
        let statusStyle = "text-(--info-title) font-bold";
        if (row.statusType === "completed") {
          statusStyle =
            "bg-(--info-icon-bg) text-(--info-title) px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
        } else if (row.statusType === "completed-progress") {
          statusStyle =
            "bg-(--info-card) text-(--info-title) px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
        } else if (row.statusType === "pending") {
          statusStyle =
            "bg-(--warning-card) text-(warning-title) px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
        } else if (row.statusType === "pending-approval") {
          statusStyle =
            "bg-(--warning-icon-bg) text-(--warning-title) px-3 py-1 rounded-full text-[10px] font-bold inline-block whitespace-nowrap shadow-2xs";
        }
        return (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${statusStyle}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
  ];

  const followUpColumns: DataTableColumn<any>[] = [
    {
      name: "Follow-Up Type",
      selector: "followUpType",
      sortable: true,
    },
    {
      name: "Scheduled Date",
      selector: "scheduledDate",
      sortable: true,
    },
    {
      name: "Provider",
      selector: "provider",
      sortable: true,
    },
    {
      name: "Department",
      selector: "department",
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: any) => {
        const statusStyle = [
          "px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs ",
        ];
        if (row.status === "Completed") {
          statusStyle.push("bg-(--info-icon-bg) text-(--info-title)");
        } else if (row.status === "Attended") {
          statusStyle.push("bg-(--info-card) text-(--info-title)");
        } else if (row.status === "Missed") {
          statusStyle.push("bg-(--warning-card) text-(--warning-title)");
        } else if (row.status === "Scheduled") {
          statusStyle.push("bg-(--info-card) text-(--info-title)");
        } else if (row.status === "Cancelled") {
          statusStyle.push("bg-(--danger-card) text-(--danger-title)");
        } else if (row.status === "Upcoming") {
          statusStyle.push("bg-(--lab-timeline-bg) text-(--lab-timeline-text)");
        }
        return (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${statusStyle.join(" ")}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
    {
      name: "Notes",
      selector: "notes",
    },
  ];
  const admissionColumns: DataTableColumn<any>[] = [
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "Ward / Department",
      selector: "wardOrDepartment",
      sortable: true,
    },
    {
      name: "Provider",
      selector: "provider",
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: any) => {
        const statusStyle = [
          "px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs ",
        ];
        if (row.statusType === "pending") {
          statusStyle.push("bg-(--warning-card) text-(--warning-title)");
        } else if (row.statusType === "declined") {
          statusStyle.push("bg-(--danger-card) text-(--danger-title)");
        } else if (row.statusType === "discharged") {
          statusStyle.push("bg-(--info-card) text-(--info-title)");
        } else if (row.statusType === "completed") {
          statusStyle.push("bg-(--info-icon-bg) text-(--info-title)");
        }
        return (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${statusStyle.join(" ")}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
  ];

  const immunizationColumns: DataTableColumn<any>[] = [
    {
      name: "Vaccine Name",
      selector: "date",
      sortable: true,
      width: "2fr",
      cell: (row: any) => (
        <div className="flex flex-col gap-1">
          <span className="font-bold ">{row.vaccineName}</span>
          <span className="text-[11px] text-(--shade) font-medium">
            Brand: {row.brand}
          </span>
        </div>
      ),
    },
    {
      name: "Dose #",
      selector: "dose",
    },
    {
      name: "Date Administered",
      selector: "dateAdministered",
      sortable: true,
    },
    {
      name: "Administered By",
      selector: "administeredBy",
    },
    {
      name: "LOT Number",
      selector: "lotNumber",
    },
    {
      name: "Site",
      selector: "site",
    },
    {
      name: "Status",
      selector: "status",
      width: "1.1fr",
      cell: (row: any) => {
        const statusStyle = [
          "px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap",
        ];
        if (row.status === "Completed") {
          statusStyle.push("bg-(--info-icon-bg) text-(--info-title)");
        } else {
          statusStyle.push("bg-(--warning-card) text-(--warning-title)");
        }
        return (
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${statusStyle.join(" ")}`}
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
  ];

  return {
    patientColumns,
    outPatientColumns,
    medicationColumns,
    orderColumns,
    medmanagementColumns,
    prescriptionModalColumns,
    encounterColumns,
    orderTabColumns,
    followUpColumns,
    admissionColumns,
    immunizationColumns,
  };
}
