// data/mockDashboardData.ts

export const mockDashboardMetrics = {
  totalPatients: {
    count: 320,
    growth: "+12% from yesterday",
    breakdown: { inPatients: 140, discharged: 100, outPatients: 80 },
  },
  todaysAppointments: {
    count: 320,
    nextAppointmentTime: "15 mins",
    queue: [
      {
        id: 1,
        name: "Ahmad Abdulrazaq",
        time: "09:00 AM",
        type: "Follow-up post-PCI",
        hospNo: "HN-29182",
        status: "Checked In",
      },
      {
        id: 2,
        name: "Usman Shehu",
        time: "12:00 AM",
        type: "Follow-up post-PCI",
        hospNo: "HN-29182",
        status: "In Progress",
      },
    ],
  },
  criticalAlerts: {
    count: 320,
    vitals: {
      patient: "John Doe",
      detail: "BP: 150/100 mmHg - Action Required",
    },
    labs: { patient: "Jane Smith", detail: "Troponin I: 0.65 ng/mL (High)" },
  },
  topTreatments: {
    count: 320,
    stats: [
      { name: "Surgery", value: 200, color: "bg-primary-600" },
      { name: "Consultation", value: 40, color: "bg-primary-200" },
      { name: "Diagnosis", value: 80, color: "bg-gray-200" },
    ],
  },
};

export const mockPatientsList = [
  {
    id: 1,
    name: "Lawal Aminu",
    hospNo: "HN-09281",
    ageSex: "45 / M",
    wardBed: "Ward 30 / Bed 12",
    diagnosis: "Hypertensive Crisis",
    status: "Active Admitted",
    insurance: "NHIS Verified",
  },
  {
    id: 2,
    name: "Ahmad Abdulrazaq",
    hospNo: "HN-09291",
    ageSex: "49 / M",
    wardBed: "Ward 30 / Bed 12",
    diagnosis: "Hypertensive Crisis",
    status: "Active Admitted",
    insurance: "NHIS Verified",
  },
  {
    id: 3,
    name: "Ahmad Abdulrazaq",
    hospNo: "HN-09291",
    ageSex: "49 / M",
    wardBed: "Ward 30 / Bed 12",
    diagnosis: "Hypertensive Crisis",
    status: "Active Admitted",
    insurance: "NHIS Verified",
  },
];

export const mockFollowUps = [
  {
    id: 1,
    name: "Ahmad Abdulrazaq",
    time: "09:00 AM",
    description: "Follow-up post-PCI • HN-29182",
    status: "Checked In",
  },
  {
    id: 2,
    name: "Usman Shehu",
    time: "12:00 AM",
    description: "Follow-up post-PCI • HN-29182",
    status: "In Progress",
  },
];
