export const openApiSpec = {
  openapi: "3.0.3",

  info: {
    title: "HealthSync EHR API",
    version: "1.0.0",
    description:
      "Backend API for the HealthSync Electronic Health Record system.",
  },

  servers: [
    {
      url: "/api/v1",
      description: "Current API server",
    },
  ],

  tags: [
    {
      name: "Authentication",
      description: "Authentication and account security endpoints",
    },
    {
      name: "Dashboard",
      description: "Doctor dashboard endpoints",
    },
    {
      name: "Patients",
      description: "Patient management and patient records",
    },
    {
      name: "Departments",
      description: "Hospital department management",
    },
    {
      name: "Users",
      description: "Hospital staff and user management",
    },
    {
      name: "Health",
      description: "System health endpoints",
    },
  ],

  components: {
    securitySchemes: {
      sessionCookie: {
        type: "apiKey",
        in: "cookie",
        name: "healthsync_session",
        description: "Session cookie returned by the login or verify endpoint.",
      },
    },

    
    schemas: {
      LoginInput: {
        type: "object",
        required: ["identifier", "password"],
        properties: {
          identifier: {
            type: "string",
            description: "User email address or Staff ID",
            example: "DOC-20611",
          },
          password: {
            type: "string",
            format: "password",
            example: "TemporaryPassword123@",
          },
        },
      },

      ChangePasswordInput: {
        type: "object",
        required: ["currentPassword", "newPassword", "confirmPassword"],
        properties: {
          currentPassword: { type: "string", format: "password", example: "TemporaryPassword123@" },
          newPassword: { type: "string", format: "password", minLength: 8, example: "SecurePassword1@" },
          confirmPassword: { type: "string", format: "password", minLength: 8, example: "SecurePassword1@" },
        },
      },

      DeviceVerificationRequestInput: {
        type: "object",
        required: ["userId"],
        properties: {
          userId: { type: "string", format: "uuid", example: "14b64474-576a-41c8-9293-8343da2700f5" },
        },
      },

      AccountActivationRequestInput: {
        type: "object",
        required: ["userId"],
        properties: {
          userId: { type: "string", format: "uuid", example: "14b64474-576a-41c8-9293-8343da2700f5" },
        },
      },

      AccountActivationVerifyInput: {
        type: "object",
        required: ["userId", "code"],
        properties: {
          userId: { type: "string", format: "uuid", example: "14b64474-576a-41c8-9293-8343da2700f5" },
          code: { type: "string", pattern: "^[0-9]{6}$", minLength: 6, maxLength: 6, example: "123456" },
        },
      },

      VerifyInput: {
        type: "object",
        required: ["userId", "code"],
        properties: {
          userId: { type: "string", format: "uuid", example: "14b64474-576a-41c8-9293-8343da2700f5" },
          code: { type: "string", pattern: "^[0-9]{6}$", minLength: 6, maxLength: 6, example: "123456" },
        },
      },

      DepartmentCreateInput: {
        type: "object",
        required: ["name", "code"],
        properties: {
          name: { type: "string", minLength: 1, maxLength: 100, example: "Cardiology" },
          code: { type: "string", minLength: 1, maxLength: 30, example: "CARD" },
        },
      },

      DepartmentUpdateInput: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1, maxLength: 100, example: "Cardiology" },
          code: { type: "string", minLength: 1, maxLength: 30, example: "CARD" },
        },
      },

      UserCreateInput: {
        type: "object",
        required: ["firstName", "lastName", "email", "role"],
        properties: {
          firstName: { type: "string", minLength: 1, maxLength: 100, example: "Ada" },
          lastName: { type: "string", minLength: 1, maxLength: 100, example: "Lovelace" },
          email: { type: "string", format: "email", example: "ada@example.com" },
          role: { type: "string", enum: ["ADMIN", "DOCTOR", "NURSE", "LAB_TECHNICIAN", "PHARMACIST"], example: "DOCTOR" },
          departmentId: { type: "string", format: "uuid", example: "14b64474-576a-41c8-9293-8343da2700f5" },
          isActive: { type: "boolean", example: true },
        },
      },

      UserUpdateInput: {
        type: "object",
        properties: {
          firstName: { type: "string", minLength: 1, maxLength: 100, example: "Ada" },
          lastName: { type: "string", minLength: 1, maxLength: 100, example: "Lovelace" },
          email: { type: "string", format: "email", example: "ada@example.com" },
          role: { type: "string", enum: ["ADMIN", "DOCTOR", "NURSE", "LAB_TECHNICIAN", "PHARMACIST"] },
          departmentId: { type: "string", format: "uuid", nullable: true },
          isActive: { type: "boolean", example: true },
        },
      },

      Patient: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },
          hospitalId: {
            type: "string",
            format: "uuid",
          },
          hospitalNumber: {
            type: "string",
            example: "HS-000001",
          },
          firstName: {
            type: "string",
            example: "Ahmad",
          },
          lastName: {
            type: "string",
            example: "Abdulrazaq",
          },
          fullName: {
            type: "string",
            example: "Ahmad Abdulrazaq",
          },
          dateOfBirth: {
            type: "string",
            format: "date-time",
            example: "1997-05-14T00:00:00.000Z",
          },
          gender: {
            type: "string",
            example: "Male",
          },
          phone: {
            type: "string",
            nullable: true,
            example: "+2348000000000",
          },
          address: {
            type: "string",
            nullable: true,
            example: "Kano, Nigeria",
          },
          bloodGroup: {
            type: "string",
            nullable: true,
            example: "O+",
          },
          status: {
            type: "string",
            enum: ["ACTIVE", "INACTIVE"],
            example: "ACTIVE",
          },
          type: {
            type: "string",
            enum: ["INPATIENT", "OUTPATIENT"],
            nullable: true,
            example: "INPATIENT",
          },
          riskLevel: {
            type: "string",
            nullable: true,
            example: "HIGH",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      PatientCreateInput: {
        type: "object",
        required: [
          "hospitalNumber",
          "firstName",
          "lastName",
          "dateOfBirth",
          "gender",
        ],
        properties: {
          hospitalNumber: {
            type: "string",
            example: "HS-000001",
          },
          firstName: {
            type: "string",
            example: "Ahmad",
          },
          lastName: {
            type: "string",
            example: "Abdulrazaq",
          },
          dateOfBirth: {
            type: "string",
            format: "date-time",
            example: "1997-05-14T00:00:00.000Z",
          },
          gender: {
            type: "string",
            example: "Male",
          },
          phone: {
            type: "string",
            example: "+2348000000000",
          },
          address: {
            type: "string",
            example: "Kano, Nigeria",
          },
          bloodGroup: {
            type: "string",
            example: "O+",
          },
        },
      },

      PatientUpdateInput: {
        type: "object",
        properties: {
          hospitalNumber: {
            type: "string",
            example: "HS-000001",
          },
          firstName: {
            type: "string",
            example: "Ahmad",
          },
          lastName: {
            type: "string",
            example: "Abdulrazaq",
          },
          dateOfBirth: {
            type: "string",
            format: "date-time",
            example: "1997-05-14T00:00:00.000Z",
          },
          gender: {
            type: "string",
            example: "Male",
          },
          phone: {
            type: "string",
          },
          address: {
            type: "string",
          },
          bloodGroup: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["ACTIVE", "INACTIVE"],
            example: "ACTIVE",
          },
        },
      },

      PatientListResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            type: "object",
            properties: {
              patients: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Patient",
                },
              },
              pagination: {
                $ref: "#/components/schemas/Pagination",
              },
              filters: {
                $ref: "#/components/schemas/PatientFilters",
              },
            },
          },
        },
      },

      Pagination: {
        type: "object",
        properties: {
          page: {
            type: "integer",
            example: 1,
          },
          limit: {
            type: "integer",
            example: 20,
          },
          total: {
            type: "integer",
            example: 24,
          },
          totalPages: {
            type: "integer",
            example: 2,
          },
        },
      },

      PatientFilters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            nullable: true,
            example: "Ahmad",
          },
          type: {
            type: "string",
            enum: ["INPATIENT", "OUTPATIENT"],
            nullable: true,
          },
          status: {
            type: "string",
            enum: ["ACTIVE", "INACTIVE"],
            nullable: true,
          },
          wardId: {
            type: "string",
            format: "uuid",
            nullable: true,
          },
          attendingDoctorId: {
            type: "string",
            format: "uuid",
            nullable: true,
          },
          dateFrom: {
            type: "string",
            format: "date-time",
            nullable: true,
          },
          dateTo: {
            type: "string",
            format: "date-time",
            nullable: true,
          },
          sortBy: {
            type: "string",
            example: "createdAt",
          },
          sortOrder: {
            type: "string",
            enum: ["asc", "desc"],
            example: "desc",
          },
        },
      },

      PatientDetailResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            type: "object",
            properties: {
              patient: {
                $ref: "#/components/schemas/Patient",
              },

              currentAdmission: {
                nullable: true,
                type: "object",
                additionalProperties: true,
              },

              currentDiagnosis: {
                nullable: true,
                type: "object",
                additionalProperties: true,
              },

              currentTreatments: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },

              latestVitals: {
                nullable: true,
                type: "object",
                additionalProperties: true,
              },

              alerts: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },

              primaryDoctor: {
                nullable: true,
                type: "object",
                additionalProperties: true,
              },

              allergies: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        substance: { type: "string", example: "Penicillin" },
                        reaction: { type: "string", nullable: true, example: "Anaphylaxis" },
                        severity: { type: "string", enum: ["MILD", "MODERATE", "SEVERE", "CRITICAL"] },
                        status: { type: "string", enum: ["ACTIVE", "INACTIVE", "RESOLVED"] },
                        recordedAt: { type: "string", format: "date-time" },
                        notes: { type: "string", nullable: true },
                      },
                    },
                  },
                  message: { type: "string", nullable: true, example: "No known allergies" },
                },
              },

              activeMedications: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        medicationName: { type: "string", example: "Metformin" },
                        dosage: { type: "string", nullable: true, example: "500mg" },
                        frequency: { type: "string", nullable: true, example: "Twice daily" },
                        route: { type: "string", nullable: true, example: "Oral" },
                        startDate: { type: "string", format: "date-time" },
                        endDate: { type: "string", format: "date-time", nullable: true },
                        status: { type: "string", example: "ACTIVE" },
                        reason: { type: "string", nullable: true },
                      },
                    },
                  },
                  message: { type: "string", nullable: true, example: "No active medications" },
                },
              },

              latestLabResults: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    testType: { type: "string", example: "HBA1C" },
                    testName: { type: "string", example: "HbA1c" },
                    value: { type: "string", nullable: true, example: "7.2%" },
                    valueNumeric: { type: "number", nullable: true, example: 7.2 },
                    unit: { type: "string", nullable: true, example: "%" },
                    performedAt: { type: "string", format: "date-time" },
                  },
                },
              },

              timeline: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
          },
        },
      },

      DashboardResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            type: "object",
            properties: {
              summary: {
                type: "object",
                properties: {
                  totalPatients: {
                    type: "integer",
                    example: 320,
                  },
                },
              },

              appointments: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },

              criticalAlerts: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },

              topTreatments: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },

              patients: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },

              followUps: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
          },
        },
      },

      ErrorResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Patient not found",
          },
        },
      },
    },

    responses: {
      Unauthorized: {
        description: "Authentication is required",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },

      Forbidden: {
        description: "The authenticated user is not authorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },

      NotFound: {
        description: "The requested resource was not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },

      ValidationError: {
        description: "The supplied data is invalid",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },

      ServerError: {
        description: "Unexpected server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse",
            },
          },
        },
      },
    },
  },

  DiagnosisHistoryItem: {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "8d5c9c5e-4a8d-4f13-9b3c-2f2e7d4a1234",
    },
    date: {
      type: "string",
      format: "date-time",
      example: "2023-10-12T00:00:00.000Z",
    },
    type: {
      type: "string",
      enum: ["DIAGNOSIS", "TREATMENT"],
      example: "DIAGNOSIS",
    },
    condition: {
      type: "string",
      example: "Type 2 Diabetes Mellitus",
    },
    provider: {
      nullable: true,
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        name: {
          type: "string",
          example: "Dr. Sarah Jenkins",
        },
      },
    },
    facility: {
      type: "string",
      example: "Metro Cardiology Group",
    },
    notes: {
      type: "string",
      nullable: true,
      example:
        "First diagnosed, initiated Metformin 500mg BID.",
    },
  },
},

MedicalHistoryListResponse: {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true,
    },
    data: {
      type: "object",
      properties: {
        history: {
          type: "array",
          items: {
            $ref: "#/components/schemas/DiagnosisHistoryItem",
          },
        },
        pagination: {
          $ref: "#/components/schemas/Pagination",
        },
        filters: {
          type: "object",
          properties: {
            search: {
              type: "string",
              nullable: true,
              example: "diabetes",
            },
            dateFrom: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            dateTo: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            sortOrder: {
              type: "string",
              enum: ["asc", "desc"],
              example: "desc",
            },
          },
        },
      },
    },
  },
},

      DiagnosisDetail: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },
          patientId: {
            type: "string",
            format: "uuid",
          },
          encounterId: {
            type: "string",
            format: "uuid",
            nullable: true,
          },
          name: {
            type: "string",
            example: "Type 2 Diabetes Mellitus",
          },
          code: {
            type: "string",
            nullable: true,
            example: "E11.9",
          },
          status: {
            type: "string",
            enum: ["ACTIVE", "RESOLVED", "INACTIVE"],
            example: "ACTIVE",
          },
          severity: {
            type: "string",
            enum: ["MILD", "MODERATE", "SEVERE", "CRITICAL"],
            nullable: true,
            example: "MODERATE",
          },
          onsetType: {
            type: "string",
            enum: ["ACUTE", "SUBACUTE", "CHRONIC", "GRADUAL", "UNKNOWN"],
            nullable: true,
            example: "GRADUAL",
          },
          bodySystem: {
            type: "string",
            nullable: true,
            example: "Endocrine",
          },
          isPrimary: {
            type: "boolean",
            example: true,
          },
          diagnosedAt: {
            type: "string",
            format: "date-time",
            example: "2023-10-12T00:00:00.000Z",
          },
          resolvedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
          },
        },
      },

      MedicalHistoryDetailResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            type: "object",
            properties: {
              patient: {
                $ref: "#/components/schemas/Patient",
              },
              history: {
                $ref: "#/components/schemas/DiagnosisDetail",
              },
              encounter: {
                nullable: true,
                type: "object",
                additionalProperties: true,
              },
              treatmentHistory: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              encounterHistory: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              latestVitals: {
                nullable: true,
                type: "object",
                additionalProperties: true,
              },
              hba1cTrend: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        testName: { type: "string", example: "HbA1c" },
                        value: { type: "string", nullable: true, example: "7.2%" },
                        valueNumeric: { type: "number", nullable: true, example: 7.2 },
                        unit: { type: "string", nullable: true, example: "%" },
                        performedAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                  message: { type: "string", nullable: true, example: "No HbA1c results available" },
                },
              },
              conditionMedications: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        medicationName: { type: "string", example: "Metformin" },
                        dosage: { type: "string", nullable: true, example: "500mg" },
                        frequency: { type: "string", nullable: true, example: "Twice daily" },
                        route: { type: "string", nullable: true, example: "Oral" },
                        startDate: { type: "string", format: "date-time" },
                        endDate: { type: "string", format: "date-time", nullable: true },
                        reason: { type: "string", nullable: true },
                      },
                    },
                  },
                  message: { type: "string", nullable: true, example: "No active medications for this condition" },
                },
              },
              relatedOrders: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              keyDocuments: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        fileName: { type: "string", example: "Lab Results.pdf" },
                        documentType: { type: "string", enum: ["LAB_REPORT", "IMAGING_REPORT", "DISCHARGE_SUMMARY", "OPERATIVE_REPORT", "MEDICAL_RECORD", "PRESCRIPTION", "CONSULTATION_NOTE", "OTHER"] },
                        description: { type: "string", nullable: true },
                        uploadedAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                  message: { type: "string", nullable: true, example: "No documents available" },
                },
              },
            },
          },
        },
      },

  paths: {
    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login",
        description: "Authenticates a hospital staff user.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
          },
          "401": {
            description: "Invalid credentials",
          },
          "403": {
            description: "Account is not allowed to login",
          },
        },
      },
    },

    "/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout",
        security: [{ sessionCookie: [] }],
        responses: {
          "200": {
            description: "Logout successful",
          },
          "401": {
            description: "Authentication required",
          },
        },
      },
    },

    "/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current user",
        security: [{ sessionCookie: [] }],
        responses: {
          "200": {
            description: "Current authenticated user",
          },
          "401": {
            description: "Authentication required",
          },
        },
      },
    },

    "/auth/change-password": {
      post: {
        tags: ["Authentication"],
        summary: "Change password",
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChangePasswordInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Password changed successfully",
          },
          "400": {
            description: "Invalid password data",
          },
          "401": {
            description: "Authentication required",
          },
        },
      },
    },

    "/auth/activate/request": {
      post: {
        tags: ["Authentication"],
        summary: "Request account activation code",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AccountActivationRequestInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Account activation code requested",
          },
          "404": {
            description: "User not found",
          },
        },
      },
    },

    "/auth/activate/verify": {
      post: {
        tags: ["Authentication"],
        summary: "Verify account activation code",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AccountActivationVerifyInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Account activation successful",
          },
          "401": {
            description: "Invalid or expired activation code",
          },
        },
      },
    },

    "/auth/device/request": {
      post: {
        tags: ["Authentication"],
        summary: "Request device verification",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeviceVerificationRequestInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Device verification requested",
          },
          "401": {
            description: "Authentication required",
          },
        },
      },
    },

    "/auth/verify": {
      post: {
        tags: ["Authentication"],
        summary: "Verify authentication challenge",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VerifyInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Verification successful",
          },
          "400": {
            description: "Invalid verification data",
          },
        },
      },
    },

    /*
     * ============================================================
     * DOCTOR DASHBOARD
     * ============================================================
     */

    "/dashboard": {
      get: {
        tags: ["Dashboard"],
        summary: "Get doctor dashboard",
        description:
          "Returns the doctor dashboard foundation including patient statistics, today's appointments, critical alerts, top treatments, patient previews and follow-ups.",
        security: [{ sessionCookie: [] }],
        parameters: [
          {
            name: "period",
            in: "query",
            required: false,
            description: "Dashboard reporting period.",
            schema: {
              type: "string",
              enum: ["daily", "weekly", "monthly"],
              default: "monthly",
            },
          },
        ],

        responses: {
          "200": {
            description: "Dashboard data retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DashboardResponse",
                },
              },
            },
          },

          "401": {
            description: "Authentication required",
          },
        },
      },
    },

    /*
     * ============================================================
     * PATIENT DIRECTORY
     * ============================================================
     */

    "/patients": {
      get: {
        tags: ["Patients"],
        summary: "List patients",
        description:
          "Returns patients belonging to the authenticated user's hospital. Supports search, inpatient/outpatient filtering, status filtering, ward filtering, attending doctor filtering, date filtering, sorting and server-side pagination. Results are prioritized by doctor assignment: patients assigned to the logged-in doctor appear first, followed by other hospital patients. For inpatient records, dateFrom/dateTo filter by admission date. For outpatient records, dateFrom/dateTo filter by patient creation date.",

        security: [{ sessionCookie: [] }],

        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            description:
              "Search by hospital number, first name or last name.",
            schema: {
              type: "string",
            },
            example: "Ahmad",
          },

          {
            name: "type",
            in: "query",
            required: false,
            description: "Filter patients by inpatient or outpatient type.",
            schema: {
              type: "string",
              enum: ["INPATIENT", "OUTPATIENT"],
            },
          },

          {
            name: "status",
            in: "query",
            required: false,
            description: "Filter patients by patient status.",
            schema: {
              type: "string",
              enum: ["ACTIVE", "INACTIVE"],
            },
          },

          {
            name: "wardId",
            in: "query",
            required: false,
            description: "Filter inpatient patients by ward.",
            schema: {
              type: "string",
              format: "uuid",
            },
          },

          {
            name: "attendingDoctorId",
            in: "query",
            required: false,
            description: "Filter patients by attending doctor.",
            schema: {
              type: "string",
              format: "uuid",
            },
          },

          {
            name: "dateFrom",
            in: "query",
            required: false,
            description:
              "Beginning of the date range. For inpatients this refers to admission date. For outpatients this refers to patient creation date.",
            schema: {
              type: "string",
              format: "date-time",
            },
          },

          {
            name: "dateTo",
            in: "query",
            required: false,
            description:
              "End of the date range. For inpatients this refers to admission date. For outpatients this refers to patient creation date.",
            schema: {
              type: "string",
              format: "date-time",
            },
          },

          {
            name: "sortBy",
            in: "query",
            required: false,
            description:
              "Field used to sort the patient directory.",
            schema: {
              type: "string",
            },
            example: "lastName",
          },

          {
            name: "sortOrder",
            in: "query",
            required: false,
            description: "Sort direction.",
            schema: {
              type: "string",
              enum: ["asc", "desc"],
            },
            example: "asc",
          },

          {
            name: "page",
            in: "query",
            required: false,
            description: "Page number.",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },

          {
            name: "limit",
            in: "query",
            required: false,
            description:
              "Number of patients returned per page. Maximum is 100.",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 20,
            },
          },
        ],

        responses: {
          "200": {
            description: "Patients retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PatientListResponse",
                },
              },
            },
          },

          "401": {
            description: "Authentication required",
          },

          "400": {
            description: "Invalid filter or pagination parameter",
          },
        },
      },

      post: {
        tags: ["Patients"],
        summary: "Create patient",
        description:
          "Creates a new patient within the authenticated user's hospital. Hospital number must be unique within the hospital.",

        security: [{ sessionCookie: [] }],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PatientCreateInput",
              },
            },
          },
        },

        responses: {
          "201": {
            description: "Patient created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Patient created successfully",
                    },
                    data: {
                      type: "object",
                      properties: {
                        patient: {
                          $ref: "#/components/schemas/Patient",
                        },
                      },
                    },
                  },
                },
              },
            },
          },

          "400": {
            description: "Invalid patient data",
          },

          "403": {
            description: "Not authorized to create patients",
          },

          "409": {
            description:
              "A patient with this hospital number already exists",
          },
        },
      },
    },

    /*
     * ============================================================
     * PATIENT DETAIL
     * ============================================================
     */

    "/patients/{id}": {
      get: {
        tags: ["Patients"],
        summary: "Get patient details",

        description:
          "Returns the complete Patient Detail foundation for one patient identified by UUID. Includes patient header information, current admission, current diagnosis, current treatments, latest vitals, alerts, primary doctor, allergies, active medications, latest lab results and clinical timeline.",

        security: [{ sessionCookie: [] }],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description:
              "The UUID of the patient whose record should be retrieved.",
            schema: {
              type: "string",
              format: "uuid",
            },
            example: "14b64474-576a-41c8-9293-8343da2700f5",
          },
        ],

        responses: {
          "200": {
            description: "Patient details retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PatientDetailResponse",
                },
              },
            },
          },

          "401": {
            description: "Authentication required",
          },

          "404": {
            description: "Patient not found",
          },
        },
      },

    },

    "/patients/{id}/medical-history": {
  get: {
    tags: ["Patients"],
    summary: "Get patient medical history",
    description:
      "Returns the patient's longitudinal medical history shown in the Medical History screen, including diagnoses and treatments. Supports search, date filtering, sorting and pagination.",
    security: [{ sessionCookie: [] }],

    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "The UUID of the patient.",
        schema: {
          type: "string",
          format: "uuid",
        },
        example: "14b64474-576a-41c8-9293-8343da2700f5",
      },
      {
        name: "search",
        in: "query",
        required: false,
        description:
          "Searches medical history by diagnosis/treatment name and related code/type.",
        schema: {
          type: "string",
        },
        example: "Diabetes",
      },
      {
        name: "dateFrom",
        in: "query",
        required: false,
        description: "Return history from this date.",
        schema: {
          type: "string",
          format: "date-time",
        },
        example: "2023-01-01T00:00:00.000Z",
      },
      {
        name: "dateTo",
        in: "query",
        required: false,
        description: "Return history up to this date.",
        schema: {
          type: "string",
          format: "date-time",
        },
        example: "2024-12-31T23:59:59.999Z",
      },
      {
        name: "sortOrder",
        in: "query",
        required: false,
        description: "Sort medical history by date.",
        schema: {
          type: "string",
          enum: ["asc", "desc"],
          default: "desc",
        },
      },
      {
        name: "page",
        in: "query",
        required: false,
        description: "Page number.",
        schema: {
          type: "integer",
          minimum: 1,
          default: 1,
        },
      },
      {
        name: "limit",
        in: "query",
        required: false,
        description:
          "Number of medical history records per page. Maximum is 100.",
        schema: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          default: 20,
        },
      },
    ],

    responses: {
      "200": {
        description: "Medical history retrieved successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MedicalHistoryListResponse",
            },
          },
        },
      },
      "400": {
        description: "Invalid medical history filter or pagination parameter",
      },
      "401": {
        description: "Authentication required",
      },
      "404": {
        description: "Patient not found",
      },
    },
  },
},

"/patients/{id}/medical-history/{diagnosisId}": {
  get: {
    tags: ["Patients"],
    summary: "Get medical history diagnosis details",
    description:
      "Returns the detailed information for a specific diagnosis belonging to the selected patient, including diagnosis metadata, related treatments, encounter history, latest vitals, HbA1c trends, medications related to the condition, and key documents.",
    security: [{ sessionCookie: [] }],

    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "The UUID of the patient.",
        schema: {
          type: "string",
          format: "uuid",
        },
        example: "14b64474-576a-41c8-9293-8343da2700f5",
      },
      {
        name: "diagnosisId",
        in: "path",
        required: true,
        description: "The UUID of the diagnosis.",
        schema: {
          type: "string",
          format: "uuid",
        },
        example: "8d5c9c5e-4a8d-4f13-9b3c-2f2e7d4a1234",
      },
    ],

    responses: {
      "200": {
        description: "Diagnosis details retrieved successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MedicalHistoryDetailResponse",
            },
          },
        },
      },
      "401": {
        description: "Authentication required",
      },
      "404": {
        description:
          "Patient or diagnosis not found",
      },
    },
  },
},

    /*
     * ============================================================
     * DEPARTMENTS
     * ============================================================
     */

    "/departments": {
      get: {
        tags: ["Departments"],
        summary: "List departments",
        security: [{ sessionCookie: [] }],

        responses: {
          "200": {
            description: "Departments retrieved successfully",
          },

          "401": {
            description: "Authentication required",
          },
        },
      },

      post: {
        tags: ["Departments"],
        summary: "Create department",
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DepartmentCreateInput" },
            },
          },
        },

        responses: {
          "201": {
            description: "Department created successfully",
          },

          "400": {
            description: "Invalid department data",
          },

          "401": {
            description: "Authentication required",
          },

          "403": {
            description: "Not authorized",
          },
        },
      },
    },

    "/departments/{id}": {
      get: {
        tags: ["Departments"],
        summary: "Get department",
        security: [{ sessionCookie: [] }],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],

        responses: {
          "200": {
            description: "Department retrieved successfully",
          },

          "401": {
            description: "Authentication required",
          },

          "404": {
            description: "Department not found",
          },
        },
      },

      patch: {
        tags: ["Departments"],
        summary: "Update department",
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DepartmentUpdateInput" },
            },
          },
        },

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],

        responses: {
          "200": {
            description: "Department updated successfully",
          },

          "400": {
            description: "Invalid department data",
          },

          "401": {
            description: "Authentication required",
          },

          "404": {
            description: "Department not found",
          },
        },
      },

      delete: {
        tags: ["Departments"],
        summary: "Delete department",
        security: [{ sessionCookie: [] }],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],

        responses: {
          "200": {
            description: "Department deleted successfully",
          },

          "401": {
            description: "Authentication required",
          },

          "404": {
            description: "Department not found",
          },
        },
      },
    },

    /*
     * ============================================================
     * USERS
     * ============================================================
     */

    "/users": {
      get: {
        tags: ["Users"],
        summary: "List users",
        security: [{ sessionCookie: [] }],
        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            description: "Search by name, email, or staff ID.",
            schema: { type: "string" },
          },
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, default: 1 },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
          },
        ],

        responses: {
          "200": {
            description: "Users retrieved successfully",
          },

          "401": {
            description: "Authentication required",
          },
        },
      },

      post: {
        tags: ["Users"],
        summary: "Create user",
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserCreateInput" },
            },
          },
        },

        responses: {
          "201": {
            description: "User created successfully",
          },

          "400": {
            description: "Invalid user data",
          },

          "401": {
            description: "Authentication required",
          },

          "403": {
            description: "Not authorized",
          },
        },
      },
    },

    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get user",
        security: [{ sessionCookie: [] }],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],

        responses: {
          "200": {
            description: "User retrieved successfully",
          },

          "401": {
            description: "Authentication required",
          },

          "404": {
            description: "User not found",
          },
        },
      },

      patch: {
        tags: ["Users"],
        summary: "Update user",
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserUpdateInput" },
            },
          },
        },

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],

        responses: {
          "200": {
            description: "User updated successfully",
          },

          "400": {
            description: "Invalid user data",
          },

          "401": {
            description: "Authentication required",
          },

          "404": {
            description: "User not found",
          },
        },
      },

      delete: {
        tags: ["Users"],
        summary: "Delete user",
        security: [{ sessionCookie: [] }],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],

        responses: {
          "200": {
            description: "User deleted successfully",
          },

          "401": {
            description: "Authentication required",
          },

          "404": {
            description: "User not found",
          },
        },
      },
    },

    /*
     * ============================================================
     * HEALTH
     * ============================================================
     */

    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        servers: [{ url: "/api", description: "Health API server" }],

        responses: {
          "200": {
            description: "API is healthy",
          },
        },
      },
    },
  },
};