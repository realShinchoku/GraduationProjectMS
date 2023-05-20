CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "GraduationProjectReports" (
    "Id" text NOT NULL,
    "ReportStatus" integer NOT NULL,
    "Url" text NULL,
    "Name" text NULL,
    "CreateTime" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_GraduationProjectReports" PRIMARY KEY ("Id")
);

CREATE TABLE "Roles" (
    "Id" text NOT NULL,
    "RoleId" integer NOT NULL,
    "Name" character varying(256) NULL,
    "NormalizedName" character varying(256) NULL,
    "ConcurrencyStamp" text NULL,
    CONSTRAINT "PK_Roles" PRIMARY KEY ("Id")
);

CREATE TABLE "Users" (
    "Id" text NOT NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "Birthday" timestamp with time zone NULL,
    "Role" integer NOT NULL,
    "Sex" boolean NOT NULL,
    "DisplayName" text NULL,
    "Avatar" text NULL,
    "UserName" character varying(256) NULL,
    "NormalizedUserName" character varying(256) NULL,
    "Email" character varying(256) NULL,
    "NormalizedEmail" character varying(256) NULL,
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text NULL,
    "SecurityStamp" text NULL,
    "ConcurrencyStamp" text NULL,
    "PhoneNumber" text NULL,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" timestamp with time zone NULL,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer NOT NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);

CREATE TABLE "Faculties" (
    "Id" text NOT NULL,
    CONSTRAINT "PK_Faculties" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Faculties_Users_Id" FOREIGN KEY ("Id") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE TABLE "PopupNotifications" (
    "Id" uuid NOT NULL,
    "Message" text NULL,
    "TargetUserId" text NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "IsRead" boolean NOT NULL,
    CONSTRAINT "PK_PopupNotifications" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PopupNotifications_Users_TargetUserId" FOREIGN KEY ("TargetUserId") REFERENCES "Users" ("Id")
);

CREATE TABLE "UserRoles" (
    "UserId" text NOT NULL,
    "RoleId" text NOT NULL,
    CONSTRAINT "PK_UserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_UserRoles_Roles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "Roles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_UserRoles_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE TABLE "DepartmentSubjects" (
    "Id" text NOT NULL,
    "FacultyId" text NULL,
    CONSTRAINT "PK_DepartmentSubjects" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_DepartmentSubjects_Faculties_FacultyId" FOREIGN KEY ("FacultyId") REFERENCES "Faculties" ("Id"),
    CONSTRAINT "FK_DepartmentSubjects_Users_Id" FOREIGN KEY ("Id") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE TABLE "GraduationProjectPeriods" (
    "Id" uuid NOT NULL,
    "Name" text NULL,
    "Course" integer NOT NULL,
    "Phase" integer NOT NULL,
    "LecturerApproval" boolean NOT NULL,
    "DepartmentSubjectApproval" boolean NOT NULL,
    "StartDate" timestamp with time zone NOT NULL,
    "EndDate" timestamp with time zone NOT NULL,
    "ContactInstructorTime" timestamp with time zone NOT NULL,
    "RegisterTopicTime" timestamp with time zone NOT NULL,
    "SyllabusSubmissionTime" timestamp with time zone NOT NULL,
    "SyllabusReviewTime" timestamp with time zone NOT NULL,
    "GraduationProjectTime" timestamp with time zone NOT NULL,
    "ProtectionTime" timestamp with time zone NOT NULL,
    "FacultyId" text NULL,
    CONSTRAINT "PK_GraduationProjectPeriods" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_GraduationProjectPeriods_Faculties_FacultyId" FOREIGN KEY ("FacultyId") REFERENCES "Faculties" ("Id")
);

CREATE TABLE "Lecturers" (
    "Id" text NOT NULL,
    "DepartmentSubjectId" text NULL,
    "FacultyId" text NULL,
    "InstructorStatus" integer NOT NULL,
    "MaxStudentsNumber" integer NOT NULL,
    "Education" text NULL,
    CONSTRAINT "PK_Lecturers" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Lecturers_DepartmentSubjects_DepartmentSubjectId" FOREIGN KEY ("DepartmentSubjectId") REFERENCES "DepartmentSubjects" ("Id"),
    CONSTRAINT "FK_Lecturers_Faculties_FacultyId" FOREIGN KEY ("FacultyId") REFERENCES "Faculties" ("Id"),
    CONSTRAINT "FK_Lecturers_Users_Id" FOREIGN KEY ("Id") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE TABLE "GraduationProjects" (
    "Id" uuid NOT NULL,
    "Name" text NULL,
    "Type" text NULL,
    "Description" text NULL,
    "LecturerApproval" boolean NOT NULL,
    "DepartmentSubjectApproval" boolean NOT NULL,
    "GraduationProjectPeriodId" uuid NULL,
    CONSTRAINT "PK_GraduationProjects" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_GraduationProjects_GraduationProjectPeriods_GraduationProje~" FOREIGN KEY ("GraduationProjectPeriodId") REFERENCES "GraduationProjectPeriods" ("Id")
);

CREATE TABLE "Syllabi" (
    "Id" text NOT NULL,
    "SyllabusStatus" integer NOT NULL,
    "Note" text NULL,
    "GraduationProjectPeriodId" uuid NULL,
    "Url" text NULL,
    "Name" text NULL,
    "CreateTime" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_Syllabi" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Syllabi_GraduationProjectPeriods_GraduationProjectPeriodId" FOREIGN KEY ("GraduationProjectPeriodId") REFERENCES "GraduationProjectPeriods" ("Id")
);

CREATE TABLE "Students" (
    "Id" text NOT NULL,
    "LecturerId" text NULL,
    "DepartmentSubjectId" text NULL,
    "FacultyId" text NULL,
    "GraduationProjectId" uuid NULL,
    "GraduationProjectPeriodId" uuid NULL,
    "GraduationProjectReportId" text NULL,
    "SyllabusId" text NULL,
    "Point" numeric NOT NULL,
    "StudentId" text NULL,
    "Class" text NULL,
    CONSTRAINT "PK_Students" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Students_DepartmentSubjects_DepartmentSubjectId" FOREIGN KEY ("DepartmentSubjectId") REFERENCES "DepartmentSubjects" ("Id"),
    CONSTRAINT "FK_Students_Faculties_FacultyId" FOREIGN KEY ("FacultyId") REFERENCES "Faculties" ("Id"),
    CONSTRAINT "FK_Students_GraduationProjectPeriods_GraduationProjectPeriodId" FOREIGN KEY ("GraduationProjectPeriodId") REFERENCES "GraduationProjectPeriods" ("Id"),
    CONSTRAINT "FK_Students_GraduationProjectReports_GraduationProjectReportId" FOREIGN KEY ("GraduationProjectReportId") REFERENCES "GraduationProjectReports" ("Id"),
    CONSTRAINT "FK_Students_GraduationProjects_GraduationProjectId" FOREIGN KEY ("GraduationProjectId") REFERENCES "GraduationProjects" ("Id"),
    CONSTRAINT "FK_Students_Lecturers_LecturerId" FOREIGN KEY ("LecturerId") REFERENCES "Lecturers" ("Id"),
    CONSTRAINT "FK_Students_Syllabi_SyllabusId" FOREIGN KEY ("SyllabusId") REFERENCES "Syllabi" ("Id"),
    CONSTRAINT "FK_Students_Users_Id" FOREIGN KEY ("Id") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Instructors" (
    "Id" uuid NOT NULL,
    "GraduationProjectPeriodId" uuid NULL,
    "StudentId" text NULL,
    "LecturerId" text NULL,
    "DepartmentSubjectId" text NULL,
    "IsApproval" boolean NOT NULL,
    "ApprovalStatus" boolean NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "Note" text NULL,
    CONSTRAINT "PK_Instructors" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Instructors_DepartmentSubjects_DepartmentSubjectId" FOREIGN KEY ("DepartmentSubjectId") REFERENCES "DepartmentSubjects" ("Id"),
    CONSTRAINT "FK_Instructors_GraduationProjectPeriods_GraduationProjectPerio~" FOREIGN KEY ("GraduationProjectPeriodId") REFERENCES "GraduationProjectPeriods" ("Id"),
    CONSTRAINT "FK_Instructors_Lecturers_LecturerId" FOREIGN KEY ("LecturerId") REFERENCES "Lecturers" ("Id"),
    CONSTRAINT "FK_Instructors_Students_StudentId" FOREIGN KEY ("StudentId") REFERENCES "Students" ("Id")
);

CREATE TABLE "Notifications" (
    "Id" uuid NOT NULL,
    "Name" text NULL,
    "CreatedDate" timestamp with time zone NOT NULL,
    "StudentId" text NULL,
    "InfoTitle" text NULL,
    "Infos" jsonb NULL,
    "IsRead" boolean NOT NULL,
    CONSTRAINT "PK_Notifications" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Notifications_Students_StudentId" FOREIGN KEY ("StudentId") REFERENCES "Students" ("Id")
);

CREATE INDEX "IX_DepartmentSubjects_FacultyId" ON "DepartmentSubjects" ("FacultyId");

CREATE INDEX "IX_GraduationProjectPeriods_Course" ON "GraduationProjectPeriods" ("Course");

CREATE INDEX "IX_GraduationProjectPeriods_FacultyId" ON "GraduationProjectPeriods" ("FacultyId");

CREATE INDEX "IX_GraduationProjectPeriods_Phase" ON "GraduationProjectPeriods" ("Phase");

CREATE INDEX "IX_GraduationProjects_GraduationProjectPeriodId" ON "GraduationProjects" ("GraduationProjectPeriodId");

CREATE INDEX "IX_Instructors_DepartmentSubjectId" ON "Instructors" ("DepartmentSubjectId");

CREATE INDEX "IX_Instructors_GraduationProjectPeriodId" ON "Instructors" ("GraduationProjectPeriodId");

CREATE INDEX "IX_Instructors_LecturerId" ON "Instructors" ("LecturerId");

CREATE INDEX "IX_Instructors_StudentId" ON "Instructors" ("StudentId");

CREATE INDEX "IX_Lecturers_DepartmentSubjectId" ON "Lecturers" ("DepartmentSubjectId");

CREATE INDEX "IX_Lecturers_FacultyId" ON "Lecturers" ("FacultyId");

CREATE INDEX "IX_Notifications_StudentId" ON "Notifications" ("StudentId");

CREATE INDEX "IX_PopupNotifications_TargetUserId" ON "PopupNotifications" ("TargetUserId");

CREATE UNIQUE INDEX "RoleNameIndex" ON "Roles" ("NormalizedName");

CREATE INDEX "IX_Students_DepartmentSubjectId" ON "Students" ("DepartmentSubjectId");

CREATE INDEX "IX_Students_FacultyId" ON "Students" ("FacultyId");

CREATE INDEX "IX_Students_GraduationProjectId" ON "Students" ("GraduationProjectId");

CREATE INDEX "IX_Students_GraduationProjectPeriodId" ON "Students" ("GraduationProjectPeriodId");

CREATE INDEX "IX_Students_GraduationProjectReportId" ON "Students" ("GraduationProjectReportId");

CREATE INDEX "IX_Students_LecturerId" ON "Students" ("LecturerId");

CREATE INDEX "IX_Students_SyllabusId" ON "Students" ("SyllabusId");

CREATE INDEX "IX_Syllabi_GraduationProjectPeriodId" ON "Syllabi" ("GraduationProjectPeriodId");

CREATE INDEX "IX_UserRoles_RoleId" ON "UserRoles" ("RoleId");

CREATE INDEX "EmailIndex" ON "Users" ("NormalizedEmail");

CREATE UNIQUE INDEX "UserNameIndex" ON "Users" ("NormalizedUserName");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20230407034222_InitialCreate', '7.0.4');

COMMIT;

