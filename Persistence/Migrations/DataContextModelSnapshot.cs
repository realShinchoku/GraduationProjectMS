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

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("Birthday")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

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

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("AppUser");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Domain.DepartmentSubjectLecturer", b =>
                {
                    b.Property<string>("DepartmentSubjectId")
                        .HasColumnType("text");

                    b.Property<string>("LecturerId")
                        .HasColumnType("text");

                    b.HasKey("DepartmentSubjectId", "LecturerId");

                    b.HasIndex("LecturerId")
                        .IsUnique();

                    b.ToTable("DepartmentSubjectLecturers");
                });

            modelBuilder.Entity("Domain.FacultyDepartmentSubject", b =>
                {
                    b.Property<string>("DepartmentSubjectId")
                        .HasColumnType("text");

                    b.Property<string>("FacultyId")
                        .HasColumnType("text");

                    b.HasKey("DepartmentSubjectId", "FacultyId");

                    b.HasIndex("DepartmentSubjectId")
                        .IsUnique();

                    b.HasIndex("FacultyId");

                    b.ToTable("FacultyDepartmentSubjects");
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

            modelBuilder.Entity("Domain.LecturerStudent", b =>
                {
                    b.Property<string>("StudentId")
                        .HasColumnType("text");

                    b.Property<string>("LecturerId")
                        .HasColumnType("text");

                    b.HasKey("StudentId", "LecturerId");

                    b.HasIndex("LecturerId");

                    b.HasIndex("StudentId")
                        .IsUnique();

                    b.ToTable("LecturerStudents");
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

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.DepartmentSubject", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.HasDiscriminator().HasValue("DepartmentSubject");
                });

            modelBuilder.Entity("Domain.Faculty", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.HasDiscriminator().HasValue("Faculty");
                });

            modelBuilder.Entity("Domain.Lecturer", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<int>("InstructorStatus")
                        .HasColumnType("integer");

                    b.Property<int>("MaxStudentsNumber")
                        .HasColumnType("integer");

                    b.HasDiscriminator().HasValue("Lecturer");
                });

            modelBuilder.Entity("Domain.Student", b =>
                {
                    b.HasBaseType("Domain.AppUser");

                    b.Property<Guid?>("GraduationProjectId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("GraduationProjectPeriodId")
                        .HasColumnType("uuid");

                    b.Property<string>("GraduationProjectReportId")
                        .HasColumnType("text");

                    b.Property<decimal>("Point")
                        .HasColumnType("numeric");

                    b.Property<string>("StudentId")
                        .HasColumnType("text");

                    b.Property<string>("SyllabusId")
                        .HasColumnType("text");

                    b.HasIndex("GraduationProjectId");

                    b.HasIndex("GraduationProjectPeriodId");

                    b.HasIndex("GraduationProjectReportId");

                    b.HasIndex("SyllabusId");

                    b.HasDiscriminator().HasValue("Student");
                });

            modelBuilder.Entity("Domain.DepartmentSubjectLecturer", b =>
                {
                    b.HasOne("Domain.DepartmentSubject", "DepartmentSubject")
                        .WithMany("Lecturers")
                        .HasForeignKey("DepartmentSubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Lecturer", "Lecturer")
                        .WithOne("DepartmentSubject")
                        .HasForeignKey("Domain.DepartmentSubjectLecturer", "LecturerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DepartmentSubject");

                    b.Navigation("Lecturer");
                });

            modelBuilder.Entity("Domain.FacultyDepartmentSubject", b =>
                {
                    b.HasOne("Domain.DepartmentSubject", "DepartmentSubject")
                        .WithOne("Faculty")
                        .HasForeignKey("Domain.FacultyDepartmentSubject", "DepartmentSubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Faculty", "Faculty")
                        .WithMany("DepartmentSubjects")
                        .HasForeignKey("FacultyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DepartmentSubject");

                    b.Navigation("Faculty");
                });

            modelBuilder.Entity("Domain.LecturerStudent", b =>
                {
                    b.HasOne("Domain.Lecturer", "Lecturer")
                        .WithMany("Students")
                        .HasForeignKey("LecturerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Student", "Student")
                        .WithOne("Lecturer")
                        .HasForeignKey("Domain.LecturerStudent", "StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Domain.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Student", b =>
                {
                    b.HasOne("Domain.GraduationProject", "GraduationProject")
                        .WithMany()
                        .HasForeignKey("GraduationProjectId");

                    b.HasOne("Domain.GraduationProjectPeriod", "GraduationProjectPeriod")
                        .WithMany("Students")
                        .HasForeignKey("GraduationProjectPeriodId");

                    b.HasOne("Domain.GraduationProjectReport", "GraduationProjectReport")
                        .WithMany()
                        .HasForeignKey("GraduationProjectReportId");

                    b.HasOne("Domain.Syllabus", "Syllabus")
                        .WithMany()
                        .HasForeignKey("SyllabusId");

                    b.Navigation("GraduationProject");

                    b.Navigation("GraduationProjectPeriod");

                    b.Navigation("GraduationProjectReport");

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
                    b.Navigation("Faculty");

                    b.Navigation("Lecturers");
                });

            modelBuilder.Entity("Domain.Faculty", b =>
                {
                    b.Navigation("DepartmentSubjects");
                });

            modelBuilder.Entity("Domain.Lecturer", b =>
                {
                    b.Navigation("DepartmentSubject");

                    b.Navigation("Students");
                });

            modelBuilder.Entity("Domain.Student", b =>
                {
                    b.Navigation("Lecturer");
                });
#pragma warning restore 612, 618
        }
    }
}
