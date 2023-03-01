﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.AppRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("Roles", (string)null);
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("Avatar")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Birthday")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("Sex")
                        .HasColumnType("boolean");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("Users", (string)null);

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("Domain.GraduationProject", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("GraduationProjects");
                });

            modelBuilder.Entity("Domain.GraduationProjectPeriod", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("ContactInstructorTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("GraduationProjectTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<DateTime>("ProtectionTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("RegisterTopicTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("SyllabusReviewTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("SyllabusSubmissionTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("GraduationProjectPeriods");
                });

            modelBuilder.Entity("Domain.GraduationProjectReport", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("ReportStatus")
                        .HasColumnType("integer");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("GraduationProjectReports");
                });

            modelBuilder.Entity("Domain.Instructor", b =>
                {
                    b.Property<string>("StudentId")
                        .HasColumnType("text");

                    b.Property<string>("FacultyId")
                        .HasColumnType("text");

                    b.Property<string>("LecturerId")
                        .HasColumnType("text");

                    b.Property<bool>("IsConfirm")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.HasKey("StudentId", "FacultyId", "LecturerId");

                    b.HasIndex("FacultyId");

                    b.HasIndex("LecturerId");

                    b.ToTable("Instructors");
                });

            modelBuilder.Entity("Domain.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .HasColumnType("text");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Revoked")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("Domain.Syllabus", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Note")
                        .HasColumnType("text");

                    b.Property<int>("SyllabusStatus")
                        .HasColumnType("integer");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Syllabi");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles", (string)null);
                });

            modelBuilder.Entity("Domain.DepartmentSubject", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<string>("FacultyId")
                        .HasColumnType("text");

                    b.HasIndex("FacultyId");

                    b.ToTable("DepartmentSubjects", (string)null);
                });

            modelBuilder.Entity("Domain.Faculty", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.ToTable("Faculties", (string)null);
                });

            modelBuilder.Entity("Domain.Lecturer", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<string>("DepartmentSubjectId")
                        .HasColumnType("text");

                    b.Property<string>("Education")
                        .HasColumnType("text");

                    b.Property<string>("FacultyId")
                        .HasColumnType("text");

                    b.Property<int>("InstructorStatus")
                        .HasColumnType("integer");

                    b.Property<int>("MaxStudentsNumber")
                        .HasColumnType("integer");

                    b.HasIndex("DepartmentSubjectId");

                    b.HasIndex("FacultyId");

                    b.ToTable("Lecturers", (string)null);
                });

            modelBuilder.Entity("Domain.Student", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<string>("DepartmentSubjectId")
                        .HasColumnType("text");

                    b.Property<string>("FacultyId")
                        .HasColumnType("text");

                    b.Property<Guid?>("GraduationProjectId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("GraduationProjectPeriodId")
                        .HasColumnType("uuid");

                    b.Property<string>("GraduationProjectReportId")
                        .HasColumnType("text");

                    b.Property<string>("LecturerId")
                        .HasColumnType("text");

                    b.Property<decimal>("Point")
                        .HasColumnType("numeric");

                    b.Property<string>("StudentId")
                        .HasColumnType("text");

                    b.Property<string>("SyllabusId")
                        .HasColumnType("text");

                    b.HasIndex("DepartmentSubjectId");

                    b.HasIndex("FacultyId");

                    b.HasIndex("GraduationProjectId");

                    b.HasIndex("GraduationProjectPeriodId");

                    b.HasIndex("GraduationProjectReportId");

                    b.HasIndex("LecturerId");

                    b.HasIndex("SyllabusId");

                    b.ToTable("Students", (string)null);
                });

            modelBuilder.Entity("Domain.Instructor", b =>
                {
                    b.HasOne("Domain.Faculty", "Faculty")
                        .WithMany()
                        .HasForeignKey("FacultyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Lecturer", "Lecturer")
                        .WithMany()
                        .HasForeignKey("LecturerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Student", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Faculty");

                    b.Navigation("Lecturer");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("Domain.RefreshToken", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("AppUserId");

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Domain.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.DepartmentSubject", b =>
                {
                    b.HasOne("Domain.Faculty", "Faculty")
                        .WithMany("DepartmentSubjects")
                        .HasForeignKey("FacultyId");

                    b.HasOne("Domain.AppUser", null)
                        .WithOne()
                        .HasForeignKey("Domain.DepartmentSubject", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Faculty");
                });

            modelBuilder.Entity("Domain.Faculty", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithOne()
                        .HasForeignKey("Domain.Faculty", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Lecturer", b =>
                {
                    b.HasOne("Domain.DepartmentSubject", "DepartmentSubject")
                        .WithMany("Lecturers")
                        .HasForeignKey("DepartmentSubjectId");

                    b.HasOne("Domain.Faculty", "Faculty")
                        .WithMany("Lecturers")
                        .HasForeignKey("FacultyId");

                    b.HasOne("Domain.AppUser", null)
                        .WithOne()
                        .HasForeignKey("Domain.Lecturer", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DepartmentSubject");

                    b.Navigation("Faculty");
                });

            modelBuilder.Entity("Domain.Student", b =>
                {
                    b.HasOne("Domain.DepartmentSubject", "DepartmentSubject")
                        .WithMany("Students")
                        .HasForeignKey("DepartmentSubjectId");

                    b.HasOne("Domain.Faculty", "Faculty")
                        .WithMany("Students")
                        .HasForeignKey("FacultyId");

                    b.HasOne("Domain.GraduationProject", "GraduationProject")
                        .WithMany()
                        .HasForeignKey("GraduationProjectId");

                    b.HasOne("Domain.GraduationProjectPeriod", "GraduationProjectPeriod")
                        .WithMany("Students")
                        .HasForeignKey("GraduationProjectPeriodId");

                    b.HasOne("Domain.GraduationProjectReport", "GraduationProjectReport")
                        .WithMany()
                        .HasForeignKey("GraduationProjectReportId");

                    b.HasOne("Domain.AppUser", null)
                        .WithOne()
                        .HasForeignKey("Domain.Student", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Lecturer", "Lecturer")
                        .WithMany("Students")
                        .HasForeignKey("LecturerId");

                    b.HasOne("Domain.Syllabus", "Syllabus")
                        .WithMany()
                        .HasForeignKey("SyllabusId");

                    b.Navigation("DepartmentSubject");

                    b.Navigation("Faculty");

                    b.Navigation("GraduationProject");

                    b.Navigation("GraduationProjectPeriod");

                    b.Navigation("GraduationProjectReport");

                    b.Navigation("Lecturer");

                    b.Navigation("Syllabus");
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Navigation("RefreshTokens");
                });

            modelBuilder.Entity("Domain.GraduationProjectPeriod", b =>
                {
                    b.Navigation("Students");
                });

            modelBuilder.Entity("Domain.DepartmentSubject", b =>
                {
                    b.Navigation("Lecturers");

                    b.Navigation("Students");
                });

            modelBuilder.Entity("Domain.Faculty", b =>
                {
                    b.Navigation("DepartmentSubjects");

                    b.Navigation("Lecturers");

                    b.Navigation("Students");
                });

            modelBuilder.Entity("Domain.Lecturer", b =>
                {
                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
